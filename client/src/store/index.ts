import { create } from 'zustand';

import { type GameSlice, createGameSlice } from './game-slice.js';
import { type BuildingSlice, createBuildingSlice } from './building-slice.js';
import { type UpgradeSlice, createUpgradeSlice } from './upgrade-slice.js';
import { type ShipSlice, createShipSlice } from './ship-slice.js';
import { type AchievementSlice, createAchievementSlice } from './achievement-slice.js';
import { type PrestigeSlice, createPrestigeSlice } from './prestige-slice.js';
import { type UISlice, createUISlice } from './ui-slice.js';
import { type EventSlice, createEventSlice } from './event-slice.js';
import { type TutorialSlice, createTutorialSlice } from './tutorial-slice.js';
import { type HeroSlice, createHeroSlice } from './hero-slice.js';
import { type ActivitySlice, createActivitySlice } from './activity-slice.js';
import { type InventorySlice, createInventorySlice } from './inventory-slice.js';
import { type StatsSlice, createStatsSlice } from './stats-slice.js';

export type StoreState =
  & GameSlice
  & BuildingSlice
  & UpgradeSlice
  & ShipSlice
  & AchievementSlice
  & PrestigeSlice
  & UISlice
  & EventSlice
  & TutorialSlice
  & HeroSlice
  & ActivitySlice
  & InventorySlice
  & StatsSlice;

export const useGameStore = create<StoreState>()((...a) => ({
  ...createGameSlice(...a),
  ...createBuildingSlice(...a),
  ...createUpgradeSlice(...a),
  ...createShipSlice(...a),
  ...createAchievementSlice(...a),
  ...createPrestigeSlice(...a),
  ...createUISlice(...a),
  ...createEventSlice(...a),
  ...createTutorialSlice(...a),
  ...createHeroSlice(...a),
  ...createActivitySlice(...a),
  ...createInventorySlice(...a),
  ...createStatsSlice(...a),
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
  selectBestCreditROITarget,
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
export type { TutorialSlice } from './tutorial-slice.js';
export type { HeroSlice } from './hero-slice.js';
export type { ActivitySlice } from './activity-slice.js';
export type { InventorySlice } from './inventory-slice.js';
export type { StatsSlice, StatsSnapshot } from './stats-slice.js';
