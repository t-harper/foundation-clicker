/** Cost scaling multiplier per unit owned */
export const COST_MULTIPLIER = 1.15;

/** Calculate cost for a single building given base cost and count owned */
export function calcBuildingCost(baseCost: number, owned: number): number {
  return Math.floor(baseCost * Math.pow(COST_MULTIPLIER, owned));
}

/** Calculate bulk cost for buying `amount` buildings starting from `owned` */
export function calcBulkCost(baseCost: number, owned: number, amount: number): number {
  return Math.floor(
    baseCost * (Math.pow(COST_MULTIPLIER, owned) * (Math.pow(COST_MULTIPLIER, amount) - 1)) / (COST_MULTIPLIER - 1)
  );
}

/** Calculate max affordable buildings given base cost, owned count, and budget */
export function calcMaxAffordable(baseCost: number, owned: number, budget: number): number {
  const currentCost = baseCost * Math.pow(COST_MULTIPLIER, owned);
  const n = Math.log(1 + (budget * (COST_MULTIPLIER - 1)) / currentCost) / Math.log(COST_MULTIPLIER);
  return Math.max(0, Math.floor(n));
}

/** Minimum lifetime credits required to earn Seldon Points, per era */
export const ERA_SELDON_THRESHOLDS = [1e9, 1e12, 1e15, 1e18] as const;

/** Calculate Seldon Points earned from total lifetime credits (threshold scales by era) */
export function calcSeldonPoints(totalLifetimeCredits: number, currentEra: number = 0): number {
  const threshold = ERA_SELDON_THRESHOLDS[currentEra] ?? ERA_SELDON_THRESHOLDS[ERA_SELDON_THRESHOLDS.length - 1];
  if (totalLifetimeCredits < threshold) return 0;
  return Math.floor(150 * Math.sqrt(totalLifetimeCredits / threshold));
}

/** Calculate prestige multiplier from total Seldon Points */
export function calcPrestigeMultiplier(totalSeldonPoints: number): number {
  return 1 + totalSeldonPoints * 0.001;
}

/** Calculate offline earnings */
export function calcOfflineEarnings(
  productionRatePerSecond: number,
  elapsedSeconds: number,
  offlineMultiplier: number = 0.5,
  maxSeconds: number = 86400 // 24 hours
): number {
  const capped = Math.min(elapsedSeconds, maxSeconds);
  return productionRatePerSecond * capped * offlineMultiplier;
}

/** Base click value */
export const BASE_CLICK_VALUE = 1;

/** Offline earnings multiplier (50% of normal production) */
export const OFFLINE_MULTIPLIER = 0.5;

/** Max offline time in seconds (24 hours) */
export const MAX_OFFLINE_SECONDS = 86400;

/** Auto-save interval in milliseconds (legacy REST, kept for reference) */
export const AUTO_SAVE_INTERVAL = 30000;

/** WebSocket save interval in milliseconds */
export const WS_SAVE_INTERVAL = 2000;

/** WebSocket sync interval in milliseconds (server push of buildings/upgrades/ships) */
export const WS_SYNC_INTERVAL = 5000;

/** WebSocket achievement check interval in milliseconds */
export const WS_ACHIEVEMENT_CHECK_INTERVAL = 5000;

/** WebSocket event check interval in milliseconds */
export const WS_EVENT_CHECK_INTERVAL = 10000;
