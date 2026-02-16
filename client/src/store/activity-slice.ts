import type { StateCreator } from 'zustand';
import type { ActivityState, ActiveActivity } from '@foundation/shared';
import type { StoreState } from './index';

export interface ActivitySlice {
  // State
  activities: ActivityState[];
  activeActivities: ActiveActivity[];

  // Actions
  setActivities: (activities: ActivityState[]) => void;
  setActiveActivities: (activeActivities: ActiveActivity[]) => void;
  addActiveActivity: (activity: ActiveActivity) => void;
  removeActiveActivity: (activityKey: string) => void;
  updateActivityCompletion: (activityKey: string, timesCompleted: number) => void;
}

export const createActivitySlice: StateCreator<StoreState, [], [], ActivitySlice> = (set) => ({
  // Initial state
  activities: [],
  activeActivities: [],

  // Actions
  setActivities: (activities) =>
    set({ activities }),

  setActiveActivities: (activeActivities) =>
    set({ activeActivities }),

  addActiveActivity: (activity) =>
    set((state) => ({
      activeActivities: [...state.activeActivities, activity],
    })),

  removeActiveActivity: (activityKey) =>
    set((state) => ({
      activeActivities: state.activeActivities.filter((a) => a.activityKey !== activityKey),
    })),

  updateActivityCompletion: (activityKey, timesCompleted) =>
    set((state) => {
      const existing = state.activities.find((a) => a.activityKey === activityKey);
      if (existing) {
        return {
          activities: state.activities.map((a) =>
            a.activityKey === activityKey ? { ...a, timesCompleted } : a
          ),
        };
      }
      return {
        activities: [...state.activities, { activityKey, timesCompleted }],
      };
    }),
});
