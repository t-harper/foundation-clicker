import { Era, type BuildingKey } from '@foundation/shared';

export const MAP_SIZE = 1400;
export const MAP_CENTER = 700;

export const RING_RADII: Record<Era, number> = {
  [Era.ReligiousDominance]: 175,
  [Era.TradingExpansion]: 305,
  [Era.PsychologicalInfluence]: 435,
  [Era.GalacticReunification]: 565,
};

/** Buildings per era, ordered by unlock-chain depth (root first, capstone last). */
export const ERA_BUILDING_ORDER: Record<Era, BuildingKey[]> = {
  [Era.ReligiousDominance]: [
    'survivalShelter',
    'waterReclamator',
    'hydroponicsFarm',
    'miningOutpost',
    'solarArray',
    'researchStation',
    'steelFoundry',
    'nuclearReactor',
    'encyclopediaArchive',
    'fabricationShop',
    'missionaryChapel',
    'holoTemple',
    'atomicForge',
    'cathedralOfScience',
  ],
  [Era.TradingExpansion]: [
    'tradingPost',
    'manufacturingPlant',
    'cargoWarehouse',
    'foundationBank',
    'orbitalShipyard',
    'commodityExchange',
    'refineryComplex',
    'merchantGuildHall',
    'navigatorsAcademy',
    'tradeEmbassy',
    'weaponsFactory',
    'freighterDocks',
    'mallowTradingHouse',
    'galacticBourse',
  ],
  [Era.PsychologicalInfluence]: [
    'psychohistoryLab',
    'emotionalAdjustmentCenter',
    'mentalicsAcademy',
    'auraManufactory',
    'primeRadiantVault',
    'propagandaNetwork',
    'dreamProbeLab',
    'imperialArchive',
    'shieldGenerator',
    'conversionChamber',
    'speakersSanctum',
    'mindShieldArray',
    'whisperShipHangar',
    'secondFoundationRetreat',
  ],
  [Era.GalacticReunification]: [
    'graviticPlant',
    'gaianBiosphere',
    'graviticFoundry',
    'consciousnessAmplifier',
    'terraformingEngine',
    'galaxiaBeacon',
    'stellarHarvester',
    'robotArchives',
    'wormholeNexus',
    'galacticSenate',
    'singularityForge',
    'galaxiaCore',
    'foundationHeadquarters',
    'eternityEngine',
  ],
};

export interface MapSlot {
  buildingKey: BuildingKey;
  era: Era;
  x: number;
  y: number;
}

const BUILDINGS_PER_RING = 14;
const ANGLE_STEP = (2 * Math.PI) / BUILDINGS_PER_RING;
const START_ANGLE = -Math.PI / 2; // top

function computeSlots(): MapSlot[] {
  const slots: MapSlot[] = [];
  for (const eraValue of [Era.ReligiousDominance, Era.TradingExpansion, Era.PsychologicalInfluence, Era.GalacticReunification]) {
    const radius = RING_RADII[eraValue];
    const keys = ERA_BUILDING_ORDER[eraValue];
    for (let i = 0; i < keys.length; i++) {
      const angle = START_ANGLE + i * ANGLE_STEP;
      slots.push({
        buildingKey: keys[i],
        era: eraValue,
        x: MAP_CENTER + radius * Math.cos(angle),
        y: MAP_CENTER + radius * Math.sin(angle),
      });
    }
  }
  return slots;
}

export const MAP_SLOTS: MapSlot[] = computeSlots();

export const SLOT_BY_KEY: Record<string, MapSlot> = Object.fromEntries(
  MAP_SLOTS.map((slot) => [slot.buildingKey, slot])
);
