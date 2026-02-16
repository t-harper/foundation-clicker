import type { StateCreator } from 'zustand';
import type { UpgradeKey, UpgradeState } from '@foundation/shared';
import type { StoreState } from './index.js';

export interface UpgradeSlice {
  // State
  upgrades: UpgradeState[];

  // Actions
  setUpgrades: (upgrades: UpgradeState[]) => void;
  purchaseUpgrade: (key: UpgradeKey) => void;
}

export const createUpgradeSlice: StateCreator<StoreState, [], [], UpgradeSlice> = (set) => ({
  // Initial state
  upgrades: [],

  // Actions
  setUpgrades: (upgrades) =>
    set({ upgrades }),

  purchaseUpgrade: (key) =>
    set((state) => ({
      upgrades: state.upgrades.map((u) =>
        u.upgradeKey === key ? { ...u, isPurchased: true } : u
      ),
    })),
});
