import {
  UpgradeState,
  UpgradeKey,
  Resources,
  ResourceKey,
  UPGRADE_DEFINITIONS,
  ALL_UPGRADE_KEYS,
} from '@foundation/shared';
import {
  isUpgradeAvailable,
  canAfford,
  subtractCost,
} from '@foundation/shared';
import {
  getUpgrades,
  purchaseUpgrade,
} from '../db/queries/upgrade-queries.js';
import { updateGameState } from '../db/queries/game-state-queries.js';
import {
  ValidationError,
  NotFoundError,
} from '../middleware/error-handler.js';
import { buildGameState, projectResources } from './game-state.js';
import type { BuyUpgradeResponse } from '@foundation/shared';

export function getUserUpgrades(userId: number): UpgradeState[] {
  const upgradeRows = getUpgrades(userId);
  const rowMap = new Map(upgradeRows.map((u) => [u.upgrade_key, u]));
  return ALL_UPGRADE_KEYS.map((key) => {
    const row = rowMap.get(key);
    return {
      upgradeKey: key,
      isPurchased: row ? row.is_purchased === 1 : false,
    };
  });
}

export function buyUpgrade(
  userId: number,
  upgradeKey: UpgradeKey
): BuyUpgradeResponse {
  const def = UPGRADE_DEFINITIONS[upgradeKey];
  if (!def) {
    throw new ValidationError(`Invalid upgrade key: ${upgradeKey}`);
  }

  const state = buildGameState(userId);
  const projected = projectResources(state);

  // Check if upgrade is available (prerequisites, era, not already purchased)
  if (!isUpgradeAvailable(upgradeKey, state)) {
    throw new ValidationError(
      `Upgrade ${upgradeKey} is not available for purchase`
    );
  }

  // Check affordability against projected resources
  if (!canAfford(projected.resources, def.cost)) {
    throw new ValidationError('Not enough resources to purchase this upgrade');
  }

  // Subtract cost from projected resources
  const newResources = subtractCost(projected.resources, def.cost);

  // Update resources in DB with projected values
  updateGameState(userId, {
    credits: newResources.credits,
    knowledge: newResources.knowledge,
    influence: newResources.influence,
    nuclear_tech: newResources.nuclearTech,
    raw_materials: newResources.rawMaterials,
    last_tick_at: projected.lastTickAt,
    lifetime_credits: projected.lifetimeCredits,
  });

  // Mark upgrade as purchased
  purchaseUpgrade(userId, upgradeKey);

  return {
    upgrade: { upgradeKey, isPurchased: true },
    resources: newResources,
  };
}
