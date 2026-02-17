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
import type { CheckAchievementsResponse, GameState } from '@foundation/shared';

export async function getUserAchievements(userId: number): Promise<AchievementState[]> {
  const rows = await getAchievements(userId);
  return rows.map((a) => ({
    achievementKey: a.achievement_key,
    unlockedAt: a.unlocked_at,
  }));
}

function isConditionMet(
  condition: AchievementCondition,
  state: GameState
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
    case 'heroUnlocked':
      return state.heroes.some(h => h.heroKey === condition.hero && h.unlockedAt !== null);
    case 'totalHeroes':
      return state.heroes.filter(h => h.unlockedAt !== null).length >= condition.count;
    case 'totalActivityCompletions':
      return state.activities.reduce((sum, a) => sum + a.timesCompleted, 0) >= condition.count;
    case 'upgradesPurchased':
      return state.upgrades.filter(u => u.isPurchased).length >= condition.count;
    case 'tradeRoutesUnlocked':
      return state.tradeRoutes.filter(t => t.isUnlocked).length >= condition.count;
    case 'seldonPoints':
      return state.prestige.totalSeldonPoints >= condition.amount;
    case 'eventCompleted':
      return state.eventHistory.some(e => e.eventKey === condition.eventKey);
    default:
      return false;
  }
}

export async function checkAchievements(
  userId: number
): Promise<CheckAchievementsResponse> {
  const state = await buildGameState(userId);
  const newAchievements: AchievementState[] = [];

  // Build a set of already-unlocked achievement keys for fast lookup.
  // With the sparse DB model, state.achievements only contains unlocked items,
  // so we must iterate ALL definitions and skip the ones already earned.
  const unlockedKeys = new Set(
    state.achievements
      .filter((a) => a.unlockedAt !== null)
      .map((a) => a.achievementKey)
  );

  for (const [key, def] of Object.entries(ACHIEVEMENT_DEFINITIONS)) {
    if (unlockedKeys.has(key)) continue;

    if (isConditionMet(def.condition, state)) {
      await unlockAchievement(userId, key);
      const now = Math.floor(Date.now() / 1000);
      newAchievements.push({
        achievementKey: key,
        unlockedAt: now,
      });
    }
  }

  return { newAchievements };
}
