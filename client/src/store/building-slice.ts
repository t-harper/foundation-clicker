import type { StateCreator } from 'zustand';
import type { BuildingKey, BuildingState } from '@foundation/shared';
import type { StoreState } from './index.js';

export interface BuildingSlice {
  // State
  buildings: BuildingState[];

  // Actions
  setBuildings: (buildings: BuildingState[]) => void;
  updateBuilding: (key: BuildingKey, count: number) => void;
  unlockBuilding: (key: BuildingKey) => void;
}

export const createBuildingSlice: StateCreator<StoreState, [], [], BuildingSlice> = (set) => ({
  // Initial state
  buildings: [],

  // Actions
  setBuildings: (buildings) =>
    set({ buildings }),

  updateBuilding: (key, count) =>
    set((state) => ({
      buildings: state.buildings.map((b) =>
        b.buildingKey === key ? { ...b, count } : b
      ),
    })),

  unlockBuilding: (key) =>
    set((state) => ({
      buildings: state.buildings.map((b) =>
        b.buildingKey === key ? { ...b, isUnlocked: true } : b
      ),
    })),
});
