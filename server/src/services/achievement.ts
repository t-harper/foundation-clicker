import {
  AchievementState,
  AchievementCondition,
  ACHIEVEMENT_DEFINITIONS,
} from '@foundation/shared';
import {
  getAchievements,
  unlockAchievement,
} from '../db/queries/achievement-queries.js';
import {
  ValidationError,
  NotFoundError,
} from '../middleware/error-handler.js';
import { buildGameState } from './game-state.js';
import type { CheckAchievementsResponse } from '@foundation/shared';

export function getUserAchievements(userId: number): AchievementState[] {
  const rows = getAchievements(userId);
  return rows.map((a) => ({
    achievementKey: a.achievement_key,
    unlockedAt: a.unlocked_at,
  }));
}

function isConditionMet(
  condition: AchievementCondition,
  state: ReturnType<typeof buildGameState>
): boolean {
  switch (condition.type) {
    case 'resourceTotal':
      return state.lifetimeCredits >= condition.amount;
    case 'buildingCount': {
      const building = state.buildings.find(
        (b) => b.buildingKey === condition.building
      );
      return (building?.count ?? 0) >= condition.count;
    }
    case 'totalBuildings': {
      const total = state.buildings.reduce((sum, b) => sum + b.count, 0);
      return total >= condition.count;
    }
    case 'prestigeCount':
      return state.prestige.prestigeCount >= condition.count;
    case 'eraReached':
      return state.currentEra >= condition.era;
    case 'totalClicks':
      return state.totalClicks >= condition.count;
    case 'shipCount':
      return state.ships.length >= condition.count;
    case 'playTime':
      return state.totalPlayTime >= condition.seconds;
    default:
      return false;
  }
}

export function checkAchievements(
  userId: number
): CheckAchievementsResponse {
  const state = buildGameState(userId);
  const newAchievements: AchievementState[] = [];

  for (const achievement of state.achievements) {
    // Skip already unlocked achievements
    if (achievement.unlockedAt !== null) continue;

    const def = ACHIEVEMENT_DEFINITIONS[achievement.achievementKey];
    if (!def) continue;

    if (isConditionMet(def.condition, state)) {
      unlockAchievement(userId, achievement.achievementKey);
      const now = Math.floor(Date.now() / 1000);
      newAchievements.push({
        achievementKey: achievement.achievementKey,
        unlockedAt: now,
      });
    }
  }

  return { newAchievements };
}
