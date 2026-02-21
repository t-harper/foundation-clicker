import { GameState, Resources, ResourceKey, ResourceRate, BuildingState, EMPTY_RESOURCES } from '../types/index.js';
import { BUILDING_DEFINITIONS } from '../constants/buildings.js';
import { UPGRADE_DEFINITIONS } from '../constants/upgrades.js';
import { ACHIEVEMENT_DEFINITIONS } from '../constants/achievements.js';
import { ITEM_DEFINITIONS } from '../constants/items.js';
import { Era } from '../types/eras.js';
import { ERA_UNLOCK_THRESHOLDS } from '../constants/eras.js';
import { calcBuildingCost, calcBulkCost, calcMaxAffordable, BASE_CLICK_VALUE, CLICK_PRODUCTION_PERCENT } from '../constants/formulas.js';

interface MultiplierSet {
  buildingMultipliers: Partial<Record<string, number>>;
  resourceMultipliers: Partial<Record<ResourceKey, number>>;
  globalMultiplier: number;
  achievementMultiplier: number;
  artifactClickMultiplier: number;
}

function collectMultipliers(state: GameState): MultiplierSet {
  const buildingMultipliers: Partial<Record<string, number>> = {};
  const resourceMultipliers: Partial<Record<ResourceKey, number>> = {};
  let globalMultiplier = 1;

  for (const us of state.upgrades) {
    if (!us.isPurchased) continue;
    const def = UPGRADE_DEFINITIONS[us.upgradeKey];
    if (!def) continue;
    for (const effect of def.effects) {
      switch (effect.type) {
        case 'buildingMultiplier':
          buildingMultipliers[effect.building] = (buildingMultipliers[effect.building] ?? 1) * effect.multiplier;
          break;
        case 'resourceMultiplier':
          resourceMultipliers[effect.resource] = (resourceMultipliers[effect.resource] ?? 1) * effect.multiplier;
          break;
        case 'globalMultiplier':
          globalMultiplier *= effect.multiplier;
          break;
      }
    }
  }

  let achievementMultiplier = 1;
  for (const ach of state.achievements) {
    if (!ach.unlockedAt) continue;
    const def = ACHIEVEMENT_DEFINITIONS[ach.achievementKey];
    if (!def?.reward) continue;
    if (def.reward.type === 'globalMultiplier') {
      achievementMultiplier *= def.reward.value;
    } else if (def.reward.type === 'resourceMultiplier' && def.reward.resource) {
      resourceMultipliers[def.reward.resource] = (resourceMultipliers[def.reward.resource] ?? 1) * def.reward.value;
    }
  }

  // Active event effects (timed buffs/debuffs)
  const now = Math.floor(Date.now() / 1000);
  if (state.activeEffects) {
    for (const effect of state.activeEffects) {
      if (now >= effect.expiresAt) continue;
      switch (effect.effectType) {
        case 'productionBuff':
        case 'productionDebuff':
          if (effect.resource) {
            resourceMultipliers[effect.resource] = (resourceMultipliers[effect.resource] ?? 1) * effect.multiplier;
          }
          break;
        case 'globalProductionBuff':
        case 'globalProductionDebuff':
          globalMultiplier *= effect.multiplier;
          break;
      }
    }
  }

  // Inventory artifact bonuses (permanent, stacking by quantity)
  let artifactClickMultiplier = 1;
  if (state.inventory) {
    for (const item of state.inventory) {
      if (item.quantity <= 0) continue;
      const def = ITEM_DEFINITIONS[item.itemKey];
      if (!def || def.category !== 'artifact') continue;
      const effect = def.effect;
      for (let i = 0; i < item.quantity; i++) {
        switch (effect.type) {
          case 'resourceMultiplier':
            resourceMultipliers[effect.resource] = (resourceMultipliers[effect.resource] ?? 1) * effect.multiplier;
            break;
          case 'globalMultiplier':
            globalMultiplier *= effect.multiplier;
            break;
          case 'clickMultiplier':
            artifactClickMultiplier *= effect.multiplier;
            break;
        }
      }
    }
  }

  // Active consumable effect (timed boost)
  if (state.activeConsumable) {
    if (now < state.activeConsumable.expiresAt) {
      const effect = state.activeConsumable.effect;
      switch (effect.type) {
        case 'productionBuff':
          resourceMultipliers[effect.resource] = (resourceMultipliers[effect.resource] ?? 1) * effect.multiplier;
          break;
        case 'globalProductionBuff':
          globalMultiplier *= effect.multiplier;
          break;
      }
    }
  }

  return { buildingMultipliers, resourceMultipliers, globalMultiplier, achievementMultiplier, artifactClickMultiplier };
}

/** Calculate total production rates per second for all resources */
export function calcProductionRates(state: GameState): Resources {
  const rates: Resources = { ...EMPTY_RESOURCES };

  const { buildingMultipliers, resourceMultipliers, globalMultiplier, achievementMultiplier } = collectMultipliers(state);

  // Sum building production
  for (const bs of state.buildings) {
    if (bs.count === 0) continue;
    const def = BUILDING_DEFINITIONS[bs.buildingKey];
    if (!def) continue;
    const bMult = buildingMultipliers[bs.buildingKey] ?? 1;
    for (const prod of def.production) {
      rates[prod.resource] += bs.count * prod.amount * bMult;
    }
  }

  // Apply resource multipliers, achievement multiplier, prestige multiplier, global upgrade multiplier
  const totalGlobal = globalMultiplier * achievementMultiplier * state.prestige.prestigeMultiplier;
  for (const key of Object.keys(rates) as ResourceKey[]) {
    const rMult = resourceMultipliers[key] ?? 1;
    rates[key] *= rMult * totalGlobal;
  }

  return rates;
}

/** Calculate effective per-unit production rates for a single building, including all multipliers */
export function calcBuildingUnitRates(buildingKey: string, state: GameState): ResourceRate[] {
  const def = BUILDING_DEFINITIONS[buildingKey as keyof typeof BUILDING_DEFINITIONS];
  if (!def) return [];

  const { buildingMultipliers, resourceMultipliers, globalMultiplier, achievementMultiplier } = collectMultipliers(state);
  const totalGlobal = globalMultiplier * achievementMultiplier * state.prestige.prestigeMultiplier;
  const bMult = buildingMultipliers[buildingKey] ?? 1;

  return def.production.map(prod => ({
    resource: prod.resource,
    amount: prod.amount * bMult * (resourceMultipliers[prod.resource] ?? 1) * totalGlobal,
  }));
}

export interface BuildingEfficiency {
  buildingKey: string;
  marginalCreditsPerSec: number;
  creditCost: number;
  efficiency: number; // marginalCreditsPerSec / creditCost
}

/** Calculate credit efficiency (credits/sec per credit spent) for each unlocked building */
export function calcBuildingCreditEfficiencies(state: GameState): BuildingEfficiency[] {
  const { buildingMultipliers, resourceMultipliers, globalMultiplier, achievementMultiplier } = collectMultipliers(state);
  const totalGlobal = globalMultiplier * achievementMultiplier * state.prestige.prestigeMultiplier;

  const results: BuildingEfficiency[] = [];

  for (const bs of state.buildings) {
    if (!bs.isUnlocked) continue;
    const def = BUILDING_DEFINITIONS[bs.buildingKey];
    if (!def) continue;

    // Skip buildings with no credit cost
    const baseCreditCost = def.baseCost.credits;
    if (baseCreditCost === undefined) continue;

    // Skip buildings that don't produce credits
    const creditProd = def.production.find(p => p.resource === 'credits');
    if (!creditProd) continue;

    const bMult = buildingMultipliers[bs.buildingKey] ?? 1;
    const rMult = resourceMultipliers['credits'] ?? 1;
    const marginalCreditsPerSec = creditProd.amount * bMult * rMult * totalGlobal;
    const creditCost = calcBuildingCost(baseCreditCost, bs.count);
    const efficiency = marginalCreditsPerSec / creditCost;

    results.push({ buildingKey: bs.buildingKey, marginalCreditsPerSec, creditCost, efficiency });
  }

  results.sort((a, b) => b.efficiency - a.efficiency);
  return results;
}

export interface UpgradeEfficiency {
  upgradeKey: string;
  marginalCreditsPerSec: number;
  creditCost: number;
  efficiency: number; // marginalCreditsPerSec / creditCost
}

/** Calculate credit efficiency for each available unpurchased upgrade that affects production */
export function calcUpgradeCreditEfficiencies(state: GameState): UpgradeEfficiency[] {
  const currentCreditRate = calcProductionRates(state).credits;
  const results: UpgradeEfficiency[] = [];

  for (const us of state.upgrades) {
    if (us.isPurchased) continue;
    if (!isUpgradeAvailable(us.upgradeKey, state)) continue;

    const def = UPGRADE_DEFINITIONS[us.upgradeKey];
    if (!def) continue;

    // Must have a credit cost
    const creditCost = def.cost.credits;
    if (!creditCost) continue;

    // Only consider upgrades that affect production rates
    const affectsProduction = def.effects.some(
      e => e.type === 'buildingMultiplier' || e.type === 'resourceMultiplier' || e.type === 'globalMultiplier'
    );
    if (!affectsProduction) continue;

    // Simulate purchasing this upgrade
    const simulatedState: GameState = {
      ...state,
      upgrades: state.upgrades.map(u =>
        u.upgradeKey === us.upgradeKey ? { ...u, isPurchased: true } : u
      ),
    };

    const simulatedCreditRate = calcProductionRates(simulatedState).credits;
    const marginalCreditsPerSec = simulatedCreditRate - currentCreditRate;
    if (marginalCreditsPerSec <= 0) continue;

    const efficiency = marginalCreditsPerSec / creditCost;
    results.push({ upgradeKey: us.upgradeKey, marginalCreditsPerSec, creditCost, efficiency });
  }

  results.sort((a, b) => b.efficiency - a.efficiency);
  return results;
}

/** Calculate click value including all multipliers */
export function calcClickValue(state: GameState): number {
  let clickMult = 1;
  let perBuildingBase = 0;
  let buildingScaleMult = 1;
  let totalBuildingScaleMult = 1;

  const buildingCounts = new Map<string, number>();
  let totalBuildings = 0;
  for (const bs of state.buildings) {
    buildingCounts.set(bs.buildingKey, bs.count);
    totalBuildings += bs.count;
  }

  // Base click = 1% of base credit production (before multipliers), minimum BASE_CLICK_VALUE
  let baseCreditRate = 0;
  for (const bs of state.buildings) {
    if (bs.count === 0) continue;
    const bDef = BUILDING_DEFINITIONS[bs.buildingKey];
    if (!bDef) continue;
    for (const prod of bDef.production) {
      if (prod.resource === 'credits') {
        baseCreditRate += bs.count * prod.amount;
      }
    }
  }
  const baseClick = Math.max(BASE_CLICK_VALUE, baseCreditRate * CLICK_PRODUCTION_PERCENT);

  for (const us of state.upgrades) {
    if (!us.isPurchased) continue;
    const def = UPGRADE_DEFINITIONS[us.upgradeKey];
    if (!def) continue;
    for (const effect of def.effects) {
      switch (effect.type) {
        case 'clickMultiplier':
          clickMult *= effect.multiplier;
          break;
        case 'clickPerBuilding':
          perBuildingBase += effect.creditsPerBuilding * (buildingCounts.get(effect.building) ?? 0);
          break;
        case 'clickBuildingScale':
          buildingScaleMult *= 1 + effect.multiplierPerBuilding * (buildingCounts.get(effect.building) ?? 0);
          break;
        case 'clickTotalBuildingScale':
          totalBuildingScaleMult *= 1 + effect.multiplierPerBuilding * totalBuildings;
          break;
      }
    }
  }

  // Achievement click bonuses
  for (const ach of state.achievements) {
    if (!ach.unlockedAt) continue;
    const def = ACHIEVEMENT_DEFINITIONS[ach.achievementKey];
    if (!def?.reward) continue;
    if (def.reward.type === 'clickMultiplier') {
      clickMult *= def.reward.value;
    }
  }

  // Active event click buffs/debuffs
  const now = Math.floor(Date.now() / 1000);
  if (state.activeEffects) {
    for (const effect of state.activeEffects) {
      if (now >= effect.expiresAt) continue;
      if (effect.effectType === 'clickBuff' || effect.effectType === 'clickDebuff') {
        clickMult *= effect.multiplier;
      }
    }
  }

  // Artifact click multipliers (permanent, from inventory)
  if (state.inventory) {
    for (const item of state.inventory) {
      if (item.quantity <= 0) continue;
      const def = ITEM_DEFINITIONS[item.itemKey];
      if (!def || def.category !== 'artifact') continue;
      if (def.effect.type === 'clickMultiplier') {
        for (let i = 0; i < item.quantity; i++) {
          clickMult *= def.effect.multiplier;
        }
      }
    }
  }

  // Active consumable click buff
  if (state.activeConsumable && now < state.activeConsumable.expiresAt) {
    if (state.activeConsumable.effect.type === 'clickBuff') {
      clickMult *= state.activeConsumable.effect.multiplier;
    }
  }

  return (baseClick + perBuildingBase) * clickMult * buildingScaleMult * totalBuildingScaleMult * state.prestige.prestigeMultiplier;
}

/** Calculate bonus resource yields from clicking (fraction of credit click value) */
export function calcClickResourceYields(state: GameState, creditClickValue: number): Partial<Resources> {
  const yields: Partial<Record<ResourceKey, number>> = {};

  for (const us of state.upgrades) {
    if (!us.isPurchased) continue;
    const def = UPGRADE_DEFINITIONS[us.upgradeKey];
    if (!def) continue;
    for (const effect of def.effects) {
      if (effect.type === 'clickResourceYield') {
        yields[effect.resource] = (yields[effect.resource] ?? 0) + creditClickValue * effect.fraction;
      }
    }
  }

  return yields;
}

/** Calculate cost to buy `amount` of a building */
export function calcBuildingPurchaseCost(
  buildingKey: string,
  owned: number,
  amount: number
): Partial<Record<ResourceKey, number>> {
  const def = BUILDING_DEFINITIONS[buildingKey as keyof typeof BUILDING_DEFINITIONS];
  if (!def) return {};

  const result: Partial<Record<ResourceKey, number>> = {};
  for (const [resource, baseCost] of Object.entries(def.baseCost)) {
    if (baseCost === undefined) continue;
    result[resource as ResourceKey] = amount === 1
      ? calcBuildingCost(baseCost, owned)
      : calcBulkCost(baseCost, owned, amount);
  }
  return result;
}

/** Check if player can afford a cost */
export function canAfford(resources: Resources, cost: Partial<Record<ResourceKey, number>>): boolean {
  for (const [resource, amount] of Object.entries(cost)) {
    if (amount === undefined) continue;
    if (resources[resource as ResourceKey] < amount) return false;
  }
  return true;
}

/** Subtract cost from resources (returns new resources object) */
export function subtractCost(resources: Resources, cost: Partial<Record<ResourceKey, number>>): Resources {
  const result = { ...resources };
  for (const [resource, amount] of Object.entries(cost)) {
    if (amount === undefined) continue;
    result[resource as ResourceKey] -= amount;
  }
  return result;
}

/** Calculate max affordable buildings for a specific building */
export function calcMaxAffordableBuilding(
  buildingKey: string,
  owned: number,
  resources: Resources
): number {
  const def = BUILDING_DEFINITIONS[buildingKey as keyof typeof BUILDING_DEFINITIONS];
  if (!def) return 0;

  let maxAffordable = Infinity;
  for (const [resource, baseCost] of Object.entries(def.baseCost)) {
    if (baseCost === undefined) continue;
    const budget = resources[resource as ResourceKey];
    const affordable = calcMaxAffordable(baseCost, owned, budget);
    maxAffordable = Math.min(maxAffordable, affordable);
  }
  return maxAffordable === Infinity ? 0 : maxAffordable;
}

/** Determine current era based on prestige state.
 *  When currentEra is provided, advancement is capped to +1 era per prestige. */
export function calcCurrentEra(prestigeCount: number, totalSeldonPoints: number, currentEra?: Era): Era {
  let maxEra = Era.ReligiousDominance;
  if (totalSeldonPoints >= 10000) maxEra = Era.GalacticReunification;
  else if (totalSeldonPoints >= 100) maxEra = Era.PsychologicalInfluence;
  else if (prestigeCount >= 1) maxEra = Era.TradingExpansion;

  if (currentEra !== undefined && maxEra > currentEra + 1) {
    return (currentEra + 1) as Era;
  }
  return maxEra;
}

/** Check if a building is unlocked based on game state */
export function isBuildingUnlocked(buildingKey: string, state: GameState): boolean {
  const def = BUILDING_DEFINITIONS[buildingKey as keyof typeof BUILDING_DEFINITIONS];
  if (!def) return false;

  if (!def.unlockRequirement) return true;

  if (def.unlockRequirement.era !== undefined && state.currentEra < def.unlockRequirement.era) {
    return false;
  }

  if (def.unlockRequirement.building) {
    const req = def.unlockRequirement.building;
    const bs = state.buildings.find(b => b.buildingKey === req.key);
    if (!bs || bs.count < req.count) return false;
  }

  return true;
}

/** Check if an upgrade is available for purchase */
export function isUpgradeAvailable(upgradeKey: string, state: GameState): boolean {
  const def = UPGRADE_DEFINITIONS[upgradeKey];
  if (!def) return false;

  // Already purchased?
  const us = state.upgrades.find(u => u.upgradeKey === upgradeKey);
  if (us?.isPurchased) return false;

  // Era check
  if (state.currentEra < def.era) return false;

  // Prerequisites
  if (def.prerequisites) {
    for (const prereq of def.prerequisites) {
      const pus = state.upgrades.find(u => u.upgradeKey === prereq);
      if (!pus?.isPurchased) return false;
    }
  }

  // Required building
  if (def.requiredBuilding) {
    const bs = state.buildings.find(b => b.buildingKey === def.requiredBuilding!.key);
    if (!bs || bs.count < def.requiredBuilding.count) return false;
  }

  return true;
}
