import { create } from 'zustand';

import { type GameSlice, createGameSlice } from './game-slice.js';
import { type BuildingSlice, createBuildingSlice } from './building-slice.js';
import { type UpgradeSlice, createUpgradeSlice } from './upgrade-slice.js';
import { type ShipSlice, createShipSlice } from './ship-slice.js';
import { type AchievementSlice, createAchievementSlice } from './achievement-slice.js';
import { type PrestigeSlice, createPrestigeSlice } from './prestige-slice.js';
import { type UISlice, createUISlice } from './ui-slice.js';
import { type EventSlice, createEventSlice } from './event-slice.js';

export type StoreState =
  & GameSlice
  & BuildingSlice
  & UpgradeSlice
  & ShipSlice
  & AchievementSlice
  & PrestigeSlice
  & UISlice
  & EventSlice;

export const useGameStore = create<StoreState>()((...a) => ({
  ...createGameSlice(...a),
  ...createBuildingSlice(...a),
  ...createUpgradeSlice(...a),
  ...createShipSlice(...a),
  ...createAchievementSlice(...a),
  ...createPrestigeSlice(...a),
  ...createUISlice(...a),
  ...createEventSlice(...a),
}));

// Re-export selectors for convenience
export {
  selectGameState,
  selectProductionRates,
  selectClickValue,
  selectClickResourceYields,
  selectTotalBuildings,
  selectGameStats,
  selectBestCreditROIBuilding,
  selectBestCreditROIUpgrade,
} from './selectors.js';

// Re-export slice types
export type { GameSlice } from './game-slice.js';
export type { BuildingSlice } from './building-slice.js';
export type { UpgradeSlice } from './upgrade-slice.js';
export type { ShipSlice } from './ship-slice.js';
export type { AchievementSlice } from './achievement-slice.js';
export type { PrestigeSlice } from './prestige-slice.js';
export type { UISlice, ActiveTab, BuyAmount, Notification } from './ui-slice.js';
export type { EventSlice } from './event-slice.js';
