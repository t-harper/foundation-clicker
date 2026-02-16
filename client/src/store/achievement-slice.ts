import type { StateCreator } from 'zustand';
import type { AchievementKey, AchievementState } from '@foundation/shared';
import type { StoreState } from './index.js';

export interface AchievementSlice {
  // State
  achievements: AchievementState[];

  // Actions
  setAchievements: (achievements: AchievementState[]) => void;
  unlockAchievement: (key: AchievementKey) => void;
}

export const createAchievementSlice: StateCreator<StoreState, [], [], AchievementSlice> = (set) => ({
  // Initial state
  achievements: [],

  // Actions
  setAchievements: (achievements) =>
    set({ achievements }),

  unlockAchievement: (key) =>
    set((state) => ({
      achievements: state.achievements.map((a) =>
        a.achievementKey === key
          ? { ...a, unlockedAt: Date.now() }
          : a
      ),
    })),
});
