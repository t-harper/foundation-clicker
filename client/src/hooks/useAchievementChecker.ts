import { useCallback, useEffect, useRef } from 'react';
import { ACHIEVEMENT_DEFINITIONS } from '@foundation/shared';
import { checkAchievements } from '../api/achievements.js';
import { useGameStore, selectGameStats } from '../store/index.js';

const CHECK_INTERVAL = 5000; // 5 seconds

/**
 * Periodically checks for newly earned achievements via the API.
 * When new achievements are found, updates the store and shows notifications.
 */
export function useAchievementChecker(): { checkNow: () => Promise<void> } {
  const isLoaded = useGameStore((s) => s.isLoaded);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const checkNow = useCallback(async () => {
    const state = useGameStore.getState();
    if (!state.isLoaded) return;

    try {
      const response = await checkAchievements();

      if (response.newAchievements.length > 0) {
        // Update each newly unlocked achievement in the store
        for (const achievement of response.newAchievements) {
          state.unlockAchievement(achievement.achievementKey);

          // Show notification for each new achievement
          const def = ACHIEVEMENT_DEFINITIONS[achievement.achievementKey];
          const name = def?.name ?? achievement.achievementKey;
          useGameStore.getState().addNotification({
            message: `Achievement unlocked: ${name}`,
            type: 'success',
          });
        }
      }
    } catch (err) {
      console.error('Achievement check failed:', err);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    intervalRef.current = setInterval(() => {
      void checkNow();
    }, CHECK_INTERVAL);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isLoaded, checkNow]);

  return { checkNow };
}
