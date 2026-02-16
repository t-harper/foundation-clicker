import type { StateCreator } from 'zustand';
import type { StoreState } from './index.js';

export interface PrestigeSlice {
  // State
  seldonPoints: number;
  totalSeldonPoints: number;
  prestigeCount: number;
  prestigeMultiplier: number;

  // Actions
  setPrestige: (prestige: {
    seldonPoints: number;
    totalSeldonPoints: number;
    prestigeCount: number;
    prestigeMultiplier: number;
  }) => void;
  applyPrestige: (data: {
    seldonPoints: number;
    totalSeldonPoints: number;
    prestigeCount: number;
    prestigeMultiplier: number;
  }) => void;
}

export const createPrestigeSlice: StateCreator<StoreState, [], [], PrestigeSlice> = (set) => ({
  // Initial state
  seldonPoints: 0,
  totalSeldonPoints: 0,
  prestigeCount: 0,
  prestigeMultiplier: 1,

  // Actions
  setPrestige: (prestige) =>
    set({
      seldonPoints: prestige.seldonPoints,
      totalSeldonPoints: prestige.totalSeldonPoints,
      prestigeCount: prestige.prestigeCount,
      prestigeMultiplier: prestige.prestigeMultiplier,
    }),

  applyPrestige: (data) =>
    set({
      seldonPoints: data.seldonPoints,
      totalSeldonPoints: data.totalSeldonPoints,
      prestigeCount: data.prestigeCount,
      prestigeMultiplier: data.prestigeMultiplier,
    }),
});
