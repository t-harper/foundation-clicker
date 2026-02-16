import {
  BuildingState,
  BuildingKey,
  Resources,
  ResourceKey,
  BUILDING_DEFINITIONS,
} from '@foundation/shared';
import {
  calcBuildingPurchaseCost,
  canAfford,
  subtractCost,
  isBuildingUnlocked,
} from '@foundation/shared';
import {
  getBuildings,
  upsertBuilding,
} from '../db/queries/building-queries.js';
import { getGameState, updateGameState } from '../db/queries/game-state-queries.js';
import {
  ValidationError,
  NotFoundError,
} from '../middleware/error-handler.js';
import { buildGameState, projectResources } from './game-state.js';
import type { BuyBuildingResponse } from '@foundation/shared';

export async function getUserBuildings(userId: number): Promise<BuildingState[]> {
  const state = await buildGameState(userId);

  return state.buildings.map((b) => ({
    ...b,
    isUnlocked: isBuildingUnlocked(b.buildingKey, state),
  }));
}

export async function buyBuilding(
  userId: number,
  buildingKey: BuildingKey,
  amount: number
): Promise<BuyBuildingResponse> {
  if (!buildingKey || !BUILDING_DEFINITIONS[buildingKey]) {
    throw new ValidationError(`Invalid building key: ${buildingKey}`);
  }

  if (!Number.isInteger(amount) || amount < 1) {
    throw new ValidationError('Amount must be a positive integer');
  }

  const state = await buildGameState(userId);
  const projected = projectResources(state);

  if (!isBuildingUnlocked(buildingKey, state)) {
    throw new ValidationError(`Building ${buildingKey} is not unlocked yet`);
  }

  const buildingState = state.buildings.find((b) => b.buildingKey === buildingKey);
  const currentCount = buildingState?.count ?? 0;

  const cost = calcBuildingPurchaseCost(buildingKey, currentCount, amount);

  if (!canAfford(projected.resources, cost)) {
    throw new ValidationError('Not enough resources to purchase this building');
  }

  const newResources = subtractCost(projected.resources, cost);

  await updateGameState(userId, {
    credits: newResources.credits,
    knowledge: newResources.knowledge,
    influence: newResources.influence,
    nuclear_tech: newResources.nuclearTech,
    raw_materials: newResources.rawMaterials,
    last_tick_at: projected.lastTickAt,
    lifetime_credits: projected.lifetimeCredits,
  });

  const newCount = currentCount + amount;
  await upsertBuilding(userId, buildingKey, newCount, true);

  // After buying, check if any other buildings should now be unlocked
  const updatedState = await buildGameState(userId);
  for (const b of updatedState.buildings) {
    const shouldBeUnlocked = isBuildingUnlocked(b.buildingKey, updatedState);
    if (shouldBeUnlocked && !b.isUnlocked) {
      await upsertBuilding(userId, b.buildingKey, b.count, true);
    }
  }

  return {
    building: { buildingKey, count: newCount },
    resources: newResources,
  };
}

export async function sellBuilding(
  userId: number,
  buildingKey: BuildingKey,
  amount: number
): Promise<BuyBuildingResponse> {
  if (!buildingKey || !BUILDING_DEFINITIONS[buildingKey]) {
    throw new ValidationError(`Invalid building key: ${buildingKey}`);
  }

  if (!Number.isInteger(amount) || amount < 1) {
    throw new ValidationError('Amount must be a positive integer');
  }

  const state = await buildGameState(userId);
  const projected = projectResources(state);

  const buildingState = state.buildings.find((b) => b.buildingKey === buildingKey);
  const currentCount = buildingState?.count ?? 0;

  if (currentCount < amount) {
    throw new ValidationError(
      `Cannot sell ${amount} ${buildingKey} - you only own ${currentCount}`
    );
  }

  const fullCost = calcBuildingPurchaseCost(buildingKey, currentCount - amount, amount);
  const refund: Partial<Record<ResourceKey, number>> = {};
  for (const [resource, value] of Object.entries(fullCost)) {
    if (value !== undefined) {
      refund[resource as ResourceKey] = Math.floor(value * 0.5);
    }
  }

  const newResources = { ...projected.resources };
  for (const [resource, value] of Object.entries(refund)) {
    if (value !== undefined) {
      newResources[resource as ResourceKey] += value;
    }
  }

  await updateGameState(userId, {
    credits: newResources.credits,
    knowledge: newResources.knowledge,
    influence: newResources.influence,
    nuclear_tech: newResources.nuclearTech,
    raw_materials: newResources.rawMaterials,
    last_tick_at: projected.lastTickAt,
    lifetime_credits: projected.lifetimeCredits,
  });

  const newCount = currentCount - amount;
  await upsertBuilding(userId, buildingKey, newCount, true);

  return {
    building: { buildingKey, count: newCount },
    resources: newResources,
  };
}
