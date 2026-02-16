import {
  GameState,
  GameStats,
  Resources,
  ResourceKey,
  EMPTY_RESOURCES,
  Era,
  ALL_BUILDING_KEYS,
  ALL_UPGRADE_KEYS,
} from '@foundation/shared';
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
import { getBuildings, upsertBuilding, initializeBuildings } from '../db/queries/building-queries.js';
import { getUpgrades, initializeUpgrades } from '../db/queries/upgrade-queries.js';
import { getShips, updateShipStatus } from '../db/queries/ship-queries.js';
import { getTradeRoutes, initializeTradeRoutes } from '../db/queries/trade-route-queries.js';
import { getAchievements, initializeAchievements } from '../db/queries/achievement-queries.js';
import { getActiveEffects, getPendingEvent } from '../db/queries/event-queries.js';
import { getDb } from '../db/connection.js';
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
function buildGameState(userId: number): GameState {
  const row = getGameState(userId);
  if (!row) {
    throw new NotFoundError('Game state not found for user');
  }

  const buildingRows = getBuildings(userId);
  const buildingRowMap = new Map(buildingRows.map((b) => [b.building_key, b]));
  const upgradeRows = getUpgrades(userId);
  const upgradeRowMap = new Map(upgradeRows.map((u) => [u.upgrade_key, u]));
  const shipRows = getShips(userId);
  const tradeRouteRows = getTradeRoutes(userId);
  const achievementRows = getAchievements(userId);
  const activeEffectRows = getActiveEffects(userId);

  const resources: Resources = {
    credits: row.credits,
    knowledge: row.knowledge,
    influence: row.influence,
    nuclearTech: row.nuclear_tech,
    rawMaterials: row.raw_materials,
  };

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
    lastTickAt: row.last_tick_at ?? Math.floor(Date.now() / 1000),
    totalPlayTime: row.total_play_time,
    totalClicks: row.total_clicks,
    lifetimeCredits: row.lifetime_credits,
  };

  // Dynamically compute unlock states so buildings with no requirement
  // (e.g. terminusSettlement, nuclearPlant) are available immediately,
  // even before the DB is_unlocked flag gets set by a purchase.
  for (const b of state.buildings) {
    if (!b.isUnlocked && isBuildingUnlocked(b.buildingKey, state)) {
      b.isUnlocked = true;
    }
  }

  return state;
}

/** Save resources back to the DB from a Resources object */
function saveResources(userId: number, resources: Resources): void {
  updateGameState(userId, {
    credits: resources.credits,
    knowledge: resources.knowledge,
    influence: resources.influence,
    nuclear_tech: resources.nuclearTech,
    raw_materials: resources.rawMaterials,
  });
}

export function loadGameState(userId: number): LoadGameResponse {
  const state = buildGameState(userId);
  const pendingEventKey = getPendingEvent(userId);

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
    saveResources(userId, newResources);
    updateGameState(userId, {
      last_tick_at: now,
      lifetime_credits: newLifetimeCredits,
    });

    // Update ships that returned during offline
    for (const ship of state.ships) {
      if (ship.status === 'trading' && ship.returnsAt && ship.returnsAt <= now * 1000) {
        updateShipStatus(ship.id, 'docked', null, null, null);
      }
    }

    // Reload state with applied earnings
    const updatedState = buildGameState(userId);
    return {
      gameState: updatedState,
      offlineEarnings,
      offlineSeconds,
      pendingEventKey,
    };
  }

  // Update last tick even if no offline earnings
  updateGameState(userId, { last_tick_at: now });

  return {
    gameState: state,
    offlineEarnings: null,
    offlineSeconds: 0,
    pendingEventKey,
  };
}

export function saveGameState(userId: number, data: SaveGameRequest): void {
  const row = getGameState(userId);
  if (!row) {
    throw new NotFoundError('Game state not found for user');
  }

  if (data.resources == null) {
    throw new ValidationError('Resources are required');
  }

  // Stale-save guard: if a mutation has updated resources more recently
  // than this save's tick timestamp, only save counters (not resources)
  if (row.last_tick_at != null && data.lastTickAt < row.last_tick_at) {
    updateGameState(userId, {
      total_play_time: data.totalPlayTime,
      total_clicks: data.totalClicks,
    });
    return;
  }

  saveResources(userId, data.resources);
  updateGameState(userId, {
    last_tick_at: data.lastTickAt,
    total_play_time: data.totalPlayTime,
    total_clicks: data.totalClicks,
    lifetime_credits: data.lifetimeCredits,
  });
}

export function handleClick(userId: number, clicks: number): ClickResponse {
  if (!Number.isInteger(clicks) || clicks < 1 || clicks > 100) {
    throw new ValidationError('Click count must be an integer between 1 and 100');
  }

  const state = buildGameState(userId);
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

  saveResources(userId, newResources);
  updateGameState(userId, {
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

export function resetGame(userId: number): void {
  const row = getGameState(userId);
  if (!row) {
    throw new NotFoundError('Game state not found for user');
  }

  const db = getDb();
  db.transaction(() => {
    // Delete all user data except the game_state row
    db.prepare('DELETE FROM buildings WHERE user_id = ?').run(userId);
    db.prepare('DELETE FROM upgrades WHERE user_id = ?').run(userId);
    db.prepare('DELETE FROM ships WHERE user_id = ?').run(userId);
    db.prepare('DELETE FROM trade_routes WHERE user_id = ?').run(userId);
    db.prepare('DELETE FROM achievements WHERE user_id = ?').run(userId);
    db.prepare('DELETE FROM prestige_history WHERE user_id = ?').run(userId);
    db.prepare('DELETE FROM event_history WHERE user_id = ?').run(userId);
    db.prepare('DELETE FROM active_effects WHERE user_id = ?').run(userId);
    db.prepare('DELETE FROM pending_event WHERE user_id = ?').run(userId);

    // Reset game_state to initial values
    const now = Math.floor(Date.now() / 1000);
    db.prepare(`
      UPDATE game_state SET
        credits = 0,
        knowledge = 0,
        influence = 0,
        nuclear_tech = 0,
        raw_materials = 0,
        click_value = 1,
        current_era = 0,
        seldon_points = 0,
        total_seldon_points = 0,
        prestige_count = 0,
        prestige_multiplier = 1,
        last_tick_at = ?,
        total_play_time = 0,
        total_clicks = 0,
        lifetime_credits = 0
      WHERE user_id = ?
    `).run(now, userId);

    // Re-initialize all data
    initializeBuildings(userId);
    initializeUpgrades(userId);
    initializeTradeRoutes(userId);
    initializeAchievements(userId);
  })();
}

export function getGameStats(userId: number): GameStats {
  const state = buildGameState(userId);

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
 * This closes the staleness gap between auto-saves and mutations.
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
