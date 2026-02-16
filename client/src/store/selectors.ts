import type { GameState, GameStats, Resources } from '@foundation/shared';
import { calcProductionRates, calcClickValue, calcClickResourceYields, calcBuildingCreditEfficiencies, calcUpgradeCreditEfficiencies } from '@foundation/shared';
import type { StoreState } from './index.js';

/** Assemble a full GameState object from the store slices. */
export function selectGameState(state: StoreState): GameState {
  return {
    userId: 0, // userId is managed server-side, not stored in client slices
    resources: state.resources,
    clickValue: state.clickValue,
    currentEra: state.currentEra,
    prestige: {
      seldonPoints: state.seldonPoints,
      totalSeldonPoints: state.totalSeldonPoints,
      prestigeCount: state.prestigeCount,
      prestigeMultiplier: state.prestigeMultiplier,
    },
    buildings: state.buildings,
    upgrades: state.upgrades,
    ships: state.ships,
    tradeRoutes: state.tradeRoutes,
    achievements: state.achievements,
    lastTickAt: state.lastTickAt,
    totalPlayTime: state.totalPlayTime,
    totalClicks: state.totalClicks,
    lifetimeCredits: state.lifetimeCredits,
  };
}

/** Calculate per-second production rates for all resources. */
export function selectProductionRates(state: StoreState): Resources {
  const gameState = selectGameState(state);
  return calcProductionRates(gameState);
}

/** Calculate the current click value including all multipliers. */
export function selectClickValue(state: StoreState): number {
  const gameState = selectGameState(state);
  return calcClickValue(gameState);
}

/** Calculate bonus resource yields from clicking. */
export function selectClickResourceYields(state: StoreState): Partial<Resources> {
  const gameState = selectGameState(state);
  const clickValue = calcClickValue(gameState);
  return calcClickResourceYields(gameState, clickValue);
}

/** Sum of all building counts. */
export function selectTotalBuildings(state: StoreState): number {
  return state.buildings.reduce((sum, b) => sum + b.count, 0);
}

function computeBestCreditROI(state: StoreState): { buildingKey: string | null; upgradeKey: string | null } {
  const gameState = selectGameState(state);
  const buildings = calcBuildingCreditEfficiencies(gameState);
  const upgrades = calcUpgradeCreditEfficiencies(gameState);
  const bestBuilding = buildings[0] ?? null;
  const bestUpgrade = upgrades[0] ?? null;
  if (!bestBuilding && !bestUpgrade) return { buildingKey: null, upgradeKey: null };
  if (!bestUpgrade) return { buildingKey: bestBuilding!.buildingKey, upgradeKey: null };
  if (!bestBuilding) return { buildingKey: null, upgradeKey: bestUpgrade!.upgradeKey };
  return bestUpgrade.efficiency > bestBuilding.efficiency
    ? { buildingKey: null, upgradeKey: bestUpgrade.upgradeKey }
    : { buildingKey: bestBuilding.buildingKey, upgradeKey: null };
}

/** Return the building key with the best credit ROI, or null if none qualifies. */
export function selectBestCreditROIBuilding(state: StoreState): string | null {
  return computeBestCreditROI(state).buildingKey;
}

/** Return the upgrade key with the best credit ROI, or null if none qualifies. */
export function selectBestCreditROIUpgrade(state: StoreState): string | null {
  return computeBestCreditROI(state).upgradeKey;
}

/** Build a GameStats summary object. */
export function selectGameStats(state: StoreState): GameStats {
  return {
    totalPlayTime: state.totalPlayTime,
    totalClicks: state.totalClicks,
    lifetimeCredits: state.lifetimeCredits,
    totalBuildings: state.buildings.reduce((sum, b) => sum + b.count, 0),
    totalUpgrades: state.upgrades.filter((u) => u.isPurchased).length,
    totalShips: state.ships.length,
    totalAchievements: state.achievements.filter((a) => a.unlockedAt !== null).length,
    prestigeCount: state.prestigeCount,
  };
}
