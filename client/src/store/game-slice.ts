import type { StateCreator } from 'zustand';
import type {
  Resources,
  ResourceKey,
  Era,
  GameState,
} from '@foundation/shared';

type PartialResources = Partial<Record<ResourceKey, number>>;
import { EMPTY_RESOURCES } from '@foundation/shared';
import type { StoreState } from './index.js';

export interface GameSlice {
  // State
  resources: Resources;
  clickValue: number;
  currentEra: Era;
  lastTickAt: number;
  totalPlayTime: number;
  totalClicks: number;
  lifetimeCredits: number;
  isLoaded: boolean;

  // Actions
  setResources: (resources: Resources) => void;
  updateResource: (key: ResourceKey, amount: number) => void;
  addClick: (earned: number, bonusResources?: PartialResources) => void;
  setGameState: (state: GameState) => void;
  incrementPlayTime: (seconds: number) => void;
  setLastTickAt: (timestamp: number) => void;
}

export const createGameSlice: StateCreator<StoreState, [], [], GameSlice> = (set) => ({
  // Initial state
  resources: { ...EMPTY_RESOURCES },
  clickValue: 1,
  currentEra: 0 as Era,
  lastTickAt: Date.now(),
  totalPlayTime: 0,
  totalClicks: 0,
  lifetimeCredits: 0,
  isLoaded: false,

  // Actions
  setResources: (resources) =>
    set({ resources }),

  updateResource: (key, amount) =>
    set((state) => ({
      resources: {
        ...state.resources,
        [key]: state.resources[key] + amount,
      },
    })),

  addClick: (earned, bonusResources) =>
    set((state) => {
      const newResources = {
        ...state.resources,
        credits: state.resources.credits + earned,
      };
      if (bonusResources) {
        for (const [key, amount] of Object.entries(bonusResources)) {
          if (amount) {
            newResources[key as ResourceKey] += amount;
          }
        }
      }
      return {
        resources: newResources,
        totalClicks: state.totalClicks + 1,
        lifetimeCredits: state.lifetimeCredits + earned,
      };
    }),

  setGameState: (gameState) =>
    set({
      resources: gameState.resources,
      clickValue: gameState.clickValue,
      currentEra: gameState.currentEra,
      lastTickAt: gameState.lastTickAt,
      totalPlayTime: gameState.totalPlayTime,
      totalClicks: gameState.totalClicks,
      lifetimeCredits: gameState.lifetimeCredits,
      buildings: gameState.buildings,
      upgrades: gameState.upgrades,
      ships: gameState.ships,
      tradeRoutes: gameState.tradeRoutes,
      achievements: gameState.achievements,
      activeEffects: gameState.activeEffects,
      seldonPoints: gameState.prestige.seldonPoints,
      totalSeldonPoints: gameState.prestige.totalSeldonPoints,
      prestigeCount: gameState.prestige.prestigeCount,
      prestigeMultiplier: gameState.prestige.prestigeMultiplier,
      isLoaded: true,
    }),

  incrementPlayTime: (seconds) =>
    set((state) => ({
      totalPlayTime: state.totalPlayTime + seconds,
    })),

  setLastTickAt: (timestamp) =>
    set({ lastTickAt: timestamp }),
});
