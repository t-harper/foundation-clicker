import type { StateCreator } from 'zustand';
import type { Resources, Era } from '@foundation/shared';
import type { StoreState } from './index.js';

export interface StatsSnapshot {
  timestamp: number;
  productionRates: Resources;
  resourceTotals: Resources;
  era: Era;
}

export interface StatsSlice {
  statsHistory: StatsSnapshot[];
  addStatsSnapshot: (snapshot: StatsSnapshot) => void;
  loadStatsHistory: () => void;
  clearStatsHistory: () => void;
}

const STORAGE_KEY = 'foundation_stats_history';
const MAX_SNAPSHOTS = 2880;
const MAX_AGE_SECONDS = 86400;

export const createStatsSlice: StateCreator<StoreState, [], [], StatsSlice> = (set) => ({
  statsHistory: [],

  addStatsSnapshot: (snapshot) =>
    set((state) => {
      const cutoff = Math.floor(Date.now() / 1000) - MAX_AGE_SECONDS;
      const filtered = state.statsHistory
        .filter((s) => s.timestamp > cutoff)
        .slice(-(MAX_SNAPSHOTS - 1));
      const newHistory = [...filtered, snapshot];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      } catch {
        const trimmed = newHistory.slice(-Math.floor(MAX_SNAPSHOTS / 2));
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed)); } catch { /* give up */ }
      }
      return { statsHistory: newHistory };
    }),

  loadStatsHistory: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StatsSnapshot[];
        const cutoff = Math.floor(Date.now() / 1000) - MAX_AGE_SECONDS;
        set({ statsHistory: parsed.filter((s) => s.timestamp > cutoff) });
      }
    } catch {
      set({ statsHistory: [] });
    }
  },

  clearStatsHistory: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ statsHistory: [] });
  },
});
