import type { StateCreator } from 'zustand';
import type { HeroState } from '@foundation/shared';
import type { StoreState } from './index';

export interface HeroSlice {
  // State
  heroes: HeroState[];

  // Actions
  setHeroes: (heroes: HeroState[]) => void;
  unlockHero: (heroKey: string) => void;
}

export const createHeroSlice: StateCreator<StoreState, [], [], HeroSlice> = (set) => ({
  // Initial state
  heroes: [],

  // Actions
  setHeroes: (heroes) =>
    set({ heroes }),

  unlockHero: (heroKey) =>
    set((state) => ({
      heroes: state.heroes.map((h) =>
        h.heroKey === heroKey && !h.unlockedAt
          ? { ...h, unlockedAt: Math.floor(Date.now() / 1000) }
          : h
      ),
    })),
});
