import {
  GameState,
  GameStats,
  Resources,
  ResourceKey,
  EMPTY_RESOURCES,
  Era,
  ALL_BUILDING_KEYS,
  ALL_UPGRADE_KEYS,
  ITEM_DEFINITIONS,
} from '@foundation/shared';
import type { ConsumableEffect } from '@foundation/shared';
import {
  calcProductionRates,
  calcClickValue,
  calcClickResourceYields,
  calcCurrentEra,
  isBuildingUnlocked,
} from '@foundation/shared';
import { calculateOfflineEarnings } from '@foundation/shared';
import {
  getGameState,
  updateGameState,
  createGameState,
  GameStateRow,
} from '../db/queries/game-state-queries.js';
import { getBuildings, upsertBuilding } from '../db/queries/building-queries.js';
import { getUpgrades } from '../db/queries/upgrade-queries.js';
import { getShips, updateShipStatus } from '../db/queries/ship-queries.js';
import { getTradeRoutes } from '../db/queries/trade-route-queries.js';
import { getAchievements } from '../db/queries/achievement-queries.js';
import { getActiveEffects, getPendingEvent } from '../db/queries/event-queries.js';
import { getUserHeroes, hasHero, unlockHero } from '../db/queries/hero-queries.js';
import { getUserActivities, getActiveActivities } from '../db/queries/activity-queries.js';
import { getUserInventory, getActiveConsumable, clearActiveConsumable } from '../db/queries/inventory-queries.js';
import { deleteItemsByPrefix, userPK } from '../db/dynamo-utils.js';
import {
  ValidationError,
  NotFoundError,
} from '../middleware/error-handler.js';
import type {
  LoadGameResponse,
  SaveGameRequest,
  ClickResponse,
} from '@foundation/shared';

/** Convert DB rows into a full GameState object */
async function buildGameState(userId: number): Promise<GameState> {
  const row = await getGameState(userId);
  if (!row) {
    throw new NotFoundError('Game state not found for user');
  }

  const [
    buildingRows,
    upgradeRows,
    shipRows,
    tradeRouteRows,
    achievementRows,
    activeEffectRows,
    heroRows,
    activityRows,
    activeActivityRows,
    inventoryRows,
    activeConsumableRow,
  ] = await Promise.all([
    getBuildings(userId),
    getUpgrades(userId),
    getShips(userId),
    getTradeRoutes(userId),
    getAchievements(userId),
    getActiveEffects(userId),
    getUserHeroes(userId),
    getUserActivities(userId),
    getActiveActivities(userId),
    getUserInventory(userId),
    getActiveConsumable(userId),
  ]);

  const buildingRowMap = new Map(buildingRows.map((b) => [b.building_key, b]));
  const upgradeRowMap = new Map(upgradeRows.map((u) => [u.upgrade_key, u]));

  const resources: Resources = {
    credits: row.credits,
    knowledge: row.knowledge,
    influence: row.influence,
    nuclearTech: row.nuclear_tech,
    rawMaterials: row.raw_materials,
  };

  let activeConsumable = null;
  if (activeConsumableRow) {
    const now = Math.floor(Date.now() / 1000);
    if (now >= activeConsumableRow.expires_at) {
      await clearActiveConsumable(userId);
    } else {
      const itemDef = ITEM_DEFINITIONS[activeConsumableRow.item_key];
      if (itemDef && itemDef.category === 'consumable') {
        activeConsumable = {
          itemKey: activeConsumableRow.item_key,
          startedAt: activeConsumableRow.started_at,
          expiresAt: activeConsumableRow.expires_at,
          effect: itemDef.effect as ConsumableEffect,
        };
      }
    }
  }

  const state: GameState = {
    userId: row.user_id,
    resources,
    clickValue: row.click_value,
    currentEra: row.current_era as Era,
    prestige: {
      seldonPoints: row.seldon_points,
      totalSeldonPoints: row.total_seldon_points,
      prestigeCount: row.prestige_count,
      prestigeMultiplier: row.prestige_multiplier,
    },
    buildings: ALL_BUILDING_KEYS.map((key) => {
      const row = buildingRowMap.get(key);
      return {
        buildingKey: key,
        count: row?.count ?? 0,
        isUnlocked: row ? row.is_unlocked === 1 : false,
      };
    }),
    upgrades: ALL_UPGRADE_KEYS.map((key) => {
      const row = upgradeRowMap.get(key);
      return {
        upgradeKey: key,
        isPurchased: row ? row.is_purchased === 1 : false,
      };
    }),
    ships: shipRows.map((s) => ({
      id: s.id,
      shipType: s.ship_type as any,
      name: s.name,
      status: s.status as any,
      tradeRouteId: s.trade_route_id,
      departedAt: s.departed_at,
      returnsAt: s.returns_at,
    })),
    tradeRoutes: tradeRouteRows.map((t) => ({
      routeKey: t.route_key,
      isUnlocked: t.is_unlocked === 1,
    })),
    achievements: achievementRows.map((a) => ({
      achievementKey: a.achievement_key,
      unlockedAt: a.unlocked_at,
    })),
    activeEffects: activeEffectRows.map((e) => ({
      id: e.id,
      eventKey: e.event_key,
      choiceIndex: e.choice_index,
      effectType: e.effect_type as any,
      resource: e.resource as any,
      multiplier: e.multiplier,
      startedAt: e.started_at,
      expiresAt: e.expires_at,
    })),
    heroes: heroRows.map((h) => ({
      heroKey: h.hero_key,
      unlockedAt: h.unlocked_at,
    })),
    activities: activityRows.map((a) => ({
      activityKey: a.activity_key,
      timesCompleted: a.times_completed,
    })),
    activeActivities: activeActivityRows.map((a) => ({
      activityKey: a.activity_key,
      heroKey: a.hero_key,
      startedAt: a.started_at,
      completesAt: a.completes_at,
    })),
    inventory: inventoryRows.map((i) => ({
      itemKey: i.item_key,
      quantity: i.quantity,
    })),
    activeConsumable,
    lastTickAt: row.last_tick_at ?? Math.floor(Date.now() / 1000),
    totalPlayTime: row.total_play_time,
    totalClicks: row.total_clicks,
    lifetimeCredits: row.lifetime_credits,
  };

  // Dynamically compute unlock states
  for (const b of state.buildings) {
    if (!b.isUnlocked && isBuildingUnlocked(b.buildingKey, state)) {
      b.isUnlocked = true;
    }
  }

  return state;
}

/** Save resources back to the DB from a Resources object */
async function saveResources(userId: number, resources: Resources): Promise<void> {
  await updateGameState(userId, {
    credits: resources.credits,
    knowledge: resources.knowledge,
    influence: resources.influence,
    nuclear_tech: resources.nuclearTech,
    raw_materials: resources.rawMaterials,
  });
}

export async function loadGameState(userId: number): Promise<LoadGameResponse> {
  // Auto-grant starter hero for existing players who don't have it
  if (!(await hasHero(userId, 'hariSeldon'))) {
    await unlockHero(userId, 'hariSeldon', Math.floor(Date.now() / 1000));
  }

  const state = await buildGameState(userId);
  const pendingEventKey = await getPendingEvent(userId);

  const now = Math.floor(Date.now() / 1000);
  const elapsedSeconds = Math.max(0, now - state.lastTickAt);

  let offlineEarnings: Resources | null = null;
  let offlineSeconds = 0;

  if (elapsedSeconds > 5) {
    const result = calculateOfflineEarnings(state, elapsedSeconds);
    offlineEarnings = result.earnings;
    offlineSeconds = result.cappedSeconds;

    // Apply offline earnings to resources
    const newResources = { ...state.resources };
    for (const key of Object.keys(offlineEarnings) as ResourceKey[]) {
      newResources[key] += offlineEarnings[key];
    }

    // Update lifetime credits
    const creditsEarned = offlineEarnings.credits;
    const newLifetimeCredits = state.lifetimeCredits + creditsEarned;

    // Save updated state
    await saveResources(userId, newResources);
    await updateGameState(userId, {
      last_tick_at: now,
      lifetime_credits: newLifetimeCredits,
    });

    // Update ships that returned during offline
    for (const ship of state.ships) {
      if (ship.status === 'trading' && ship.returnsAt && ship.returnsAt <= now * 1000) {
        await updateShipStatus(userId, ship.id, 'docked', null, null, null);
      }
    }

    // Reload state with applied earnings
    const updatedState = await buildGameState(userId);
    return {
      gameState: updatedState,
      offlineEarnings,
      offlineSeconds,
      pendingEventKey,
    };
  }

  // Update last tick even if no offline earnings
  await updateGameState(userId, { last_tick_at: now });

  return {
    gameState: state,
    offlineEarnings: null,
    offlineSeconds: 0,
    pendingEventKey,
  };
}

export async function saveGameState(userId: number, data: SaveGameRequest): Promise<void> {
  const row = await getGameState(userId);
  if (!row) {
    throw new NotFoundError('Game state not found for user');
  }

  if (data.resources == null) {
    throw new ValidationError('Resources are required');
  }

  // Stale-save guard
  if (row.last_tick_at != null && data.lastTickAt < row.last_tick_at) {
    await updateGameState(userId, {
      total_play_time: data.totalPlayTime,
      total_clicks: data.totalClicks,
    });
    return;
  }

  await saveResources(userId, data.resources);
  await updateGameState(userId, {
    last_tick_at: data.lastTickAt,
    total_play_time: data.totalPlayTime,
    total_clicks: data.totalClicks,
    lifetime_credits: data.lifetimeCredits,
  });
}

export async function handleClick(userId: number, clicks: number): Promise<ClickResponse> {
  if (!Number.isInteger(clicks) || clicks < 1 || clicks > 100) {
    throw new ValidationError('Click count must be an integer between 1 and 100');
  }

  const state = await buildGameState(userId);
  const projected = projectResources(state);
  const clickValue = calcClickValue(state);
  const earned = clickValue * clicks;

  const bonusResources = calcClickResourceYields(state, clickValue);

  const newResources = { ...projected.resources, credits: projected.resources.credits + earned };
  for (const [resource, amount] of Object.entries(bonusResources)) {
    if (amount) {
      newResources[resource as ResourceKey] += amount * clicks;
    }
  }

  const newTotalClicks = state.totalClicks + clicks;
  const newLifetimeCredits = projected.lifetimeCredits + earned;

  await saveResources(userId, newResources);
  await updateGameState(userId, {
    last_tick_at: projected.lastTickAt,
    total_clicks: newTotalClicks,
    lifetime_credits: newLifetimeCredits,
  });

  const hasBonusResources = Object.keys(bonusResources).length > 0;

  return {
    earned,
    newCredits: newResources.credits,
    totalClicks: newTotalClicks,
    ...(hasBonusResources ? { bonusResources } : {}),
  };
}

export async function resetGame(userId: number): Promise<void> {
  const row = await getGameState(userId);
  if (!row) {
    throw new NotFoundError('Game state not found for user');
  }

  const pk = userPK(userId);

  // Delete all non-profile, non-gamestate items in parallel
  await Promise.all([
    deleteItemsByPrefix(pk, 'BUILDING#'),
    deleteItemsByPrefix(pk, 'UPGRADE#'),
    deleteItemsByPrefix(pk, 'SHIP#'),
    deleteItemsByPrefix(pk, 'TRADEROUTE#'),
    deleteItemsByPrefix(pk, 'ACHIEVEMENT#'),
    deleteItemsByPrefix(pk, 'PRESTIGE#'),
    deleteItemsByPrefix(pk, 'EVENT#'),
    deleteItemsByPrefix(pk, 'EFFECT#'),
    deleteItemsByPrefix(pk, 'HERO#'),
    deleteItemsByPrefix(pk, 'ACTIVITY#'),
    deleteItemsByPrefix(pk, 'ACTIVE_ACTIVITY#'),
    deleteItemsByPrefix(pk, 'INVENTORY#'),
  ]);

  // Also delete singleton items
  const { DeleteCommand } = await import('@aws-sdk/lib-dynamodb');
  const { getDocClient, TABLE_NAME } = await import('../db/connection.js');
  const client = getDocClient();
  await Promise.all([
    client.send(new DeleteCommand({ TableName: TABLE_NAME, Key: { PK: pk, SK: 'PENDING_EVENT' } })),
    client.send(new DeleteCommand({ TableName: TABLE_NAME, Key: { PK: pk, SK: 'ACTIVE_CONSUMABLE' } })),
  ]);

  // Reset game_state to initial values
  const now = Math.floor(Date.now() / 1000);
  await updateGameState(userId, {
    credits: 0,
    knowledge: 0,
    influence: 0,
    nuclear_tech: 0,
    raw_materials: 0,
    click_value: 1,
    current_era: 0,
    seldon_points: 0,
    total_seldon_points: 0,
    prestige_count: 0,
    prestige_multiplier: 1,
    last_tick_at: now,
    total_play_time: 0,
    total_clicks: 0,
    lifetime_credits: 0,
  });
}

export async function getGameStats(userId: number): Promise<GameStats> {
  const state = await buildGameState(userId);

  const totalBuildings = state.buildings.reduce((sum, b) => sum + b.count, 0);
  const totalUpgrades = state.upgrades.filter((u) => u.isPurchased).length;
  const totalShips = state.ships.length;
  const totalAchievements = state.achievements.filter((a) => a.unlockedAt !== null).length;

  return {
    totalPlayTime: state.totalPlayTime,
    totalClicks: state.totalClicks,
    lifetimeCredits: state.lifetimeCredits,
    totalBuildings,
    totalUpgrades,
    totalShips,
    totalAchievements,
    prestigeCount: state.prestige.prestigeCount,
  };
}

/**
 * Project DB resources forward to "now" using production rates.
 */
export function projectResources(state: GameState): {
  resources: Resources;
  lastTickAt: number;
  lifetimeCredits: number;
} {
  const now = Math.floor(Date.now() / 1000);
  const elapsed = Math.max(0, now - state.lastTickAt);

  if (elapsed <= 0) {
    return {
      resources: { ...state.resources },
      lastTickAt: state.lastTickAt,
      lifetimeCredits: state.lifetimeCredits,
    };
  }

  const rates = calcProductionRates(state);
  const resources: Resources = {
    credits: state.resources.credits + rates.credits * elapsed,
    knowledge: state.resources.knowledge + rates.knowledge * elapsed,
    influence: state.resources.influence + rates.influence * elapsed,
    nuclearTech: state.resources.nuclearTech + rates.nuclearTech * elapsed,
    rawMaterials: state.resources.rawMaterials + rates.rawMaterials * elapsed,
  };

  return {
    resources,
    lastTickAt: now,
    lifetimeCredits: state.lifetimeCredits + rates.credits * elapsed,
  };
}

export { buildGameState };
