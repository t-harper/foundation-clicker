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

export function getUserBuildings(userId: number): BuildingState[] {
  const state = buildGameState(userId);

  // Update unlock states based on current game state
  return state.buildings.map((b) => ({
    ...b,
    isUnlocked: isBuildingUnlocked(b.buildingKey, state),
  }));
}

export function buyBuilding(
  userId: number,
  buildingKey: BuildingKey,
  amount: number
): BuyBuildingResponse {
  if (!buildingKey || !BUILDING_DEFINITIONS[buildingKey]) {
    throw new ValidationError(`Invalid building key: ${buildingKey}`);
  }

  if (!Number.isInteger(amount) || amount < 1) {
    throw new ValidationError('Amount must be a positive integer');
  }

  const state = buildGameState(userId);
  const projected = projectResources(state);

  // Check if building is unlocked
  if (!isBuildingUnlocked(buildingKey, state)) {
    throw new ValidationError(`Building ${buildingKey} is not unlocked yet`);
  }

  // Find current building state
  const buildingState = state.buildings.find((b) => b.buildingKey === buildingKey);
  const currentCount = buildingState?.count ?? 0;

  // Calculate cost
  const cost = calcBuildingPurchaseCost(buildingKey, currentCount, amount);

  // Check affordability against projected resources
  if (!canAfford(projected.resources, cost)) {
    throw new ValidationError('Not enough resources to purchase this building');
  }

  // Subtract cost from projected resources
  const newResources = subtractCost(projected.resources, cost);

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

  // Update building count
  const newCount = currentCount + amount;
  upsertBuilding(userId, buildingKey, newCount, true);

  // After buying, check if any other buildings should now be unlocked
  const updatedState = buildGameState(userId);
  for (const b of updatedState.buildings) {
    const shouldBeUnlocked = isBuildingUnlocked(b.buildingKey, updatedState);
    if (shouldBeUnlocked && !b.isUnlocked) {
      upsertBuilding(userId, b.buildingKey, b.count, true);
    }
  }

  return {
    building: { buildingKey, count: newCount },
    resources: newResources,
  };
}

export function sellBuilding(
  userId: number,
  buildingKey: BuildingKey,
  amount: number
): BuyBuildingResponse {
  if (!buildingKey || !BUILDING_DEFINITIONS[buildingKey]) {
    throw new ValidationError(`Invalid building key: ${buildingKey}`);
  }

  if (!Number.isInteger(amount) || amount < 1) {
    throw new ValidationError('Amount must be a positive integer');
  }

  const state = buildGameState(userId);
  const projected = projectResources(state);

  // Find current building state
  const buildingState = state.buildings.find((b) => b.buildingKey === buildingKey);
  const currentCount = buildingState?.count ?? 0;

  if (currentCount < amount) {
    throw new ValidationError(
      `Cannot sell ${amount} ${buildingKey} - you only own ${currentCount}`
    );
  }

  // Calculate refund at 50%
  const fullCost = calcBuildingPurchaseCost(buildingKey, currentCount - amount, amount);
  const refund: Partial<Record<ResourceKey, number>> = {};
  for (const [resource, value] of Object.entries(fullCost)) {
    if (value !== undefined) {
      refund[resource as ResourceKey] = Math.floor(value * 0.5);
    }
  }

  // Add refund to projected resources
  const newResources = { ...projected.resources };
  for (const [resource, value] of Object.entries(refund)) {
    if (value !== undefined) {
      newResources[resource as ResourceKey] += value;
    }
  }

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

  // Update building count
  const newCount = currentCount - amount;
  upsertBuilding(userId, buildingKey, newCount, true);

  return {
    building: { buildingKey, count: newCount },
    resources: newResources,
  };
}
