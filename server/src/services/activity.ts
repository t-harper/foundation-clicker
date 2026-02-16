import {
  ACTIVITY_DEFINITIONS,
  HERO_DEFINITIONS,
  ITEM_DEFINITIONS,
  Resources,
  ResourceKey,
} from '@foundation/shared';
import { canAfford, subtractCost } from '@foundation/shared';
import {
  getActiveActivities,
  getActiveActivityByKey,
  getActiveActivityByHero,
  insertActiveActivity,
  removeActiveActivity,
  incrementTimesCompleted,
  getTimesCompleted,
  getUserActivities,
} from '../db/queries/activity-queries.js';
import { hasHero } from '../db/queries/hero-queries.js';
import { addItem } from '../db/queries/inventory-queries.js';
import { updateGameState } from '../db/queries/game-state-queries.js';
import { buildGameState, projectResources } from './game-state.js';
import {
  ValidationError,
  NotFoundError,
} from '../middleware/error-handler.js';
import type {
  StartActivityResponse,
  CollectActivityResponse,
  GetActivitiesResponse,
} from '@foundation/shared';
import { getUserInventory } from '../db/queries/inventory-queries.js';

export function getActivities(userId: number): GetActivitiesResponse {
  const activityRows = getUserActivities(userId);
  const activeRows = getActiveActivities(userId);

  return {
    activities: activityRows.map((r) => ({
      activityKey: r.activity_key,
      timesCompleted: r.times_completed,
    })),
    activeActivities: activeRows.map((r) => ({
      activityKey: r.activity_key,
      heroKey: r.hero_key,
      startedAt: r.started_at,
      completesAt: r.completes_at,
    })),
  };
}

export function startActivity(
  userId: number,
  activityKey: string,
  heroKey: string
): StartActivityResponse {
  const activityDef = ACTIVITY_DEFINITIONS[activityKey];
  if (!activityDef) {
    throw new NotFoundError(`Activity not found: ${activityKey}`);
  }

  const heroDef = HERO_DEFINITIONS[heroKey];
  if (!heroDef) {
    throw new NotFoundError(`Hero not found: ${heroKey}`);
  }

  // Validate hero is unlocked
  if (!hasHero(userId, heroKey)) {
    throw new ValidationError(`Hero ${heroKey} is not unlocked`);
  }

  // Validate hero is idle (not assigned to another activity)
  const existingAssignment = getActiveActivityByHero(userId, heroKey);
  if (existingAssignment) {
    throw new ValidationError(`Hero ${heroKey} is already assigned to an activity`);
  }

  // Validate activity is not already running
  const existingActivity = getActiveActivityByKey(userId, activityKey);
  if (existingActivity) {
    throw new ValidationError(`Activity ${activityKey} is already in progress`);
  }

  // Check era
  const state = buildGameState(userId);
  if (state.currentEra < activityDef.era) {
    throw new ValidationError(`Activity ${activityKey} requires a later era`);
  }

  // Check maxCompletions
  if (activityDef.maxCompletions !== null) {
    const completed = getTimesCompleted(userId, activityKey);
    if (completed >= activityDef.maxCompletions) {
      throw new ValidationError(`Activity ${activityKey} has reached its maximum completions`);
    }
  }

  // Project resources and check affordability
  const projected = projectResources(state);
  const cost = activityDef.cost as Partial<Record<ResourceKey, number>>;

  if (!canAfford(projected.resources, cost)) {
    throw new ValidationError('Not enough resources to start this activity');
  }

  // Deduct cost
  const newResources = subtractCost(projected.resources, cost);

  updateGameState(userId, {
    credits: newResources.credits,
    knowledge: newResources.knowledge,
    influence: newResources.influence,
    nuclear_tech: newResources.nuclearTech,
    raw_materials: newResources.rawMaterials,
    last_tick_at: projected.lastTickAt,
    lifetime_credits: projected.lifetimeCredits,
  });

  // Calculate duration with hero specialization bonus
  let duration = activityDef.durationSeconds;
  if (heroDef.specialization === activityDef.type) {
    duration = Math.floor(duration * heroDef.durationBonus);
  }

  const now = Math.floor(Date.now() / 1000);
  const completesAt = now + duration;

  insertActiveActivity(userId, activityKey, heroKey, now, completesAt);

  return {
    activeActivity: {
      activityKey,
      heroKey,
      startedAt: now,
      completesAt,
    },
    resources: newResources,
  };
}

export function collectActivity(
  userId: number,
  activityKey: string
): CollectActivityResponse {
  const activeActivity = getActiveActivityByKey(userId, activityKey);
  if (!activeActivity) {
    throw new NotFoundError(`No active activity found: ${activityKey}`);
  }

  const now = Math.floor(Date.now() / 1000);
  if (now < activeActivity.completes_at) {
    throw new ValidationError('Activity is not yet complete');
  }

  const activityDef = ACTIVITY_DEFINITIONS[activityKey];
  if (!activityDef) {
    throw new NotFoundError(`Activity definition not found: ${activityKey}`);
  }

  // Grant rewards
  const rewards = activityDef.rewards;
  for (const reward of rewards) {
    addItem(userId, reward.itemKey, reward.quantity);
  }

  // Increment completion count and free hero
  incrementTimesCompleted(userId, activityKey);
  removeActiveActivity(userId, activityKey);

  // Get updated state
  const completed = getTimesCompleted(userId, activityKey);
  const inventory = getUserInventory(userId);

  return {
    rewards: rewards.map((r) => ({ itemKey: r.itemKey, quantity: r.quantity })),
    activity: {
      activityKey,
      timesCompleted: completed,
    },
    inventory: inventory.map((i) => ({
      itemKey: i.item_key,
      quantity: i.quantity,
    })),
  };
}
