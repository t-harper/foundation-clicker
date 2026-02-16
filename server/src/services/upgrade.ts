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

export async function getUserUpgrades(userId: number): Promise<UpgradeState[]> {
  const upgradeRows = await getUpgrades(userId);
  const rowMap = new Map(upgradeRows.map((u) => [u.upgrade_key, u]));
  return ALL_UPGRADE_KEYS.map((key) => {
    const row = rowMap.get(key);
    return {
      upgradeKey: key,
      isPurchased: row ? row.is_purchased === 1 : false,
    };
  });
}

export async function buyUpgrade(
  userId: number,
  upgradeKey: UpgradeKey
): Promise<BuyUpgradeResponse> {
  const def = UPGRADE_DEFINITIONS[upgradeKey];
  if (!def) {
    throw new ValidationError(`Invalid upgrade key: ${upgradeKey}`);
  }

  const state = await buildGameState(userId);
  const projected = projectResources(state);

  if (!isUpgradeAvailable(upgradeKey, state)) {
    throw new ValidationError(
      `Upgrade ${upgradeKey} is not available for purchase`
    );
  }

  if (!canAfford(projected.resources, def.cost)) {
    throw new ValidationError('Not enough resources to purchase this upgrade');
  }

  const newResources = subtractCost(projected.resources, def.cost);

  await updateGameState(userId, {
    credits: newResources.credits,
    knowledge: newResources.knowledge,
    influence: newResources.influence,
    nuclear_tech: newResources.nuclearTech,
    raw_materials: newResources.rawMaterials,
    last_tick_at: projected.lastTickAt,
    lifetime_credits: projected.lifetimeCredits,
  });

  await purchaseUpgrade(userId, upgradeKey);

  return {
    upgrade: { upgradeKey, isPurchased: true },
    resources: newResources,
  };
}
