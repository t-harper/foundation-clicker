import type { StateCreator } from 'zustand';
import type { StoreState } from './index.js';

const STORAGE_KEY = 'foundation_tutorial';

export interface TutorialState {
  tutorialStep: number;
  isComplete: boolean;
  isDismissed: boolean;
  acknowledgedSteps: number[];
  firedMilestones: number[];
}

export interface TutorialSlice extends TutorialState {
  // Actions
  initTutorial: (isNewPlayer: boolean) => void;
  advanceTutorial: () => void;
  acknowledgeStep: (stepId: number) => void;
  fireMilestone: (stepId: number) => void;
  skipTutorial: () => void;
}

function loadFromStorage(): TutorialState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TutorialState;
  } catch {
    return null;
  }
}

function saveToStorage(state: TutorialState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Silently ignore storage errors
  }
}

function getPersistedState(slice: TutorialSlice): TutorialState {
  return {
    tutorialStep: slice.tutorialStep,
    isComplete: slice.isComplete,
    isDismissed: slice.isDismissed,
    acknowledgedSteps: slice.acknowledgedSteps,
    firedMilestones: slice.firedMilestones,
  };
}

const DEFAULT_STATE: TutorialState = {
  tutorialStep: 0,
  isComplete: false,
  isDismissed: false,
  acknowledgedSteps: [],
  firedMilestones: [],
};

export const createTutorialSlice: StateCreator<StoreState, [], [], TutorialSlice> = (set, get) => {
  // Load persisted state or use defaults
  const persisted = loadFromStorage();
  const initial = persisted ?? { ...DEFAULT_STATE };

  return {
    ...initial,

    initTutorial: (isNewPlayer: boolean) => {
      const stored = loadFromStorage();
      if (stored) {
        // Resume from stored state
        set(stored);
        return;
      }
      if (!isNewPlayer) {
        // Existing player — skip tutorial entirely
        const completeState: TutorialState = {
          ...DEFAULT_STATE,
          isComplete: true,
          isDismissed: true,
        };
        set(completeState);
        saveToStorage(completeState);
        return;
      }
      // New player — start fresh
      set({ ...DEFAULT_STATE });
      saveToStorage(DEFAULT_STATE);
    },

    advanceTutorial: () => {
      set((state) => {
        const next = state.tutorialStep + 1;
        const newState = { tutorialStep: next };
        const full = { ...getPersistedState({ ...state, ...newState } as TutorialSlice) };
        saveToStorage(full);
        return newState;
      });
    },

    acknowledgeStep: (stepId: number) => {
      set((state) => {
        if (state.acknowledgedSteps.includes(stepId)) return {};
        const acknowledgedSteps = [...state.acknowledgedSteps, stepId];
        const next = state.tutorialStep + 1;
        const updates = { acknowledgedSteps, tutorialStep: next };
        const full = { ...getPersistedState({ ...state, ...updates } as TutorialSlice) };
        saveToStorage(full);
        return updates;
      });
    },

    fireMilestone: (stepId: number) => {
      set((state) => {
        if (state.firedMilestones.includes(stepId)) return {};
        const firedMilestones = [...state.firedMilestones, stepId];
        const isComplete = stepId === 10;
        const updates = { firedMilestones, isComplete };
        const full = { ...getPersistedState({ ...state, ...updates } as TutorialSlice) };
        saveToStorage(full);
        return updates;
      });
    },

    skipTutorial: () => {
      set(() => {
        const updates: TutorialState = {
          ...DEFAULT_STATE,
          isDismissed: true,
          isComplete: true,
        };
        saveToStorage(updates);
        return updates;
      });
    },
  };
};
