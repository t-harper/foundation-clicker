import type { StateCreator } from 'zustand';
import type { ActiveEffect, EventKey, EventHistoryEntry } from '@foundation/shared';
import type { StoreState } from './index';

export interface EventSlice {
  // State
  activeEffects: ActiveEffect[];
  eventHistory: EventHistoryEntry[];
  pendingEvent: EventKey | null;
  showEventModal: boolean;

  // Actions
  setActiveEffects: (effects: ActiveEffect[]) => void;
  addActiveEffects: (effects: ActiveEffect[]) => void;
  removeExpiredEffects: () => void;
  setEventHistory: (history: EventHistoryEntry[]) => void;
  addEventHistoryEntry: (entry: EventHistoryEntry) => void;
  showEvent: (eventKey: EventKey) => void;
  hideEventModal: () => void;
}

export const createEventSlice: StateCreator<StoreState, [], [], EventSlice> = (set) => ({
  // Initial state
  activeEffects: [],
  eventHistory: [],
  pendingEvent: null,
  showEventModal: false,

  // Actions
  setActiveEffects: (effects) =>
    set({ activeEffects: effects }),

  addActiveEffects: (effects) =>
    set((state) => ({
      activeEffects: [...state.activeEffects, ...effects],
    })),

  setEventHistory: (history) =>
    set({ eventHistory: history }),

  addEventHistoryEntry: (entry) =>
    set((state) => ({
      eventHistory: [...state.eventHistory, entry],
    })),

  removeExpiredEffects: () =>
    set((state) => {
      const now = Math.floor(Date.now() / 1000);
      const active = state.activeEffects.filter((e) => e.expiresAt > now);
      if (active.length === state.activeEffects.length) return state;
      return { activeEffects: active };
    }),

  showEvent: (eventKey) =>
    set({ pendingEvent: eventKey, showEventModal: true }),

  hideEventModal: () =>
    set({ pendingEvent: null, showEventModal: false }),
});
