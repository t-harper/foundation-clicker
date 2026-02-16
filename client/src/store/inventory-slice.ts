import type { StateCreator } from 'zustand';
import type { InventoryItem, ActiveConsumable } from '@foundation/shared';
import type { StoreState } from './index';

export interface InventorySlice {
  // State
  inventory: InventoryItem[];
  activeConsumable: ActiveConsumable | null;

  // Actions
  setInventory: (inventory: InventoryItem[]) => void;
  setActiveConsumable: (consumable: ActiveConsumable | null) => void;
  clearExpiredConsumable: () => void;
}

export const createInventorySlice: StateCreator<StoreState, [], [], InventorySlice> = (set) => ({
  // Initial state
  inventory: [],
  activeConsumable: null,

  // Actions
  setInventory: (inventory) =>
    set({ inventory }),

  setActiveConsumable: (consumable) =>
    set({ activeConsumable: consumable }),

  clearExpiredConsumable: () =>
    set((state) => {
      if (!state.activeConsumable) return state;
      const now = Math.floor(Date.now() / 1000);
      if (now >= state.activeConsumable.expiresAt) {
        return { activeConsumable: null };
      }
      return state;
    }),
});
