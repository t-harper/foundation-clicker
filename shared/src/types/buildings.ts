import { Era } from './eras.js';
import { ResourceKey, ResourceRate } from './resources.js';

export type BuildingKey =
  // Era 0: Religious Dominance (14)
  | 'survivalShelter'
  | 'waterReclamator'
  | 'hydroponicsFarm'
  | 'miningOutpost'
  | 'solarArray'
  | 'researchStation'
  | 'steelFoundry'
  | 'nuclearReactor'
  | 'encyclopediaArchive'
  | 'fabricationShop'
  | 'missionaryChapel'
  | 'holoTemple'
  | 'atomicForge'
  | 'cathedralOfScience'
  // Era 1: Trading Expansion (14)
  | 'tradingPost'
  | 'manufacturingPlant'
  | 'cargoWarehouse'
  | 'foundationBank'
  | 'orbitalShipyard'
  | 'commodityExchange'
  | 'refineryComplex'
  | 'merchantGuildHall'
  | 'navigatorsAcademy'
  | 'tradeEmbassy'
  | 'weaponsFactory'
  | 'freighterDocks'
  | 'mallowTradingHouse'
  | 'galacticBourse'
  // Era 2: Psychological Influence (14)
  | 'psychohistoryLab'
  | 'emotionalAdjustmentCenter'
  | 'mentalicsAcademy'
  | 'auraManufactory'
  | 'primeRadiantVault'
  | 'propagandaNetwork'
  | 'dreamProbeLab'
  | 'imperialArchive'
  | 'shieldGenerator'
  | 'conversionChamber'
  | 'speakersSanctum'
  | 'mindShieldArray'
  | 'whisperShipHangar'
  | 'secondFoundationRetreat'
  // Era 3: Galactic Reunification (14)
  | 'graviticPlant'
  | 'gaianBiosphere'
  | 'graviticFoundry'
  | 'consciousnessAmplifier'
  | 'terraformingEngine'
  | 'galaxiaBeacon'
  | 'stellarHarvester'
  | 'robotArchives'
  | 'wormholeNexus'
  | 'galacticSenate'
  | 'singularityForge'
  | 'galaxiaCore'
  | 'foundationHeadquarters'
  | 'eternityEngine';

export interface BuildingDefinition {
  key: BuildingKey;
  name: string;
  description: string;
  era: Era;
  baseCost: Partial<Record<ResourceKey, number>>;
  production: ResourceRate[];
  costMultiplier: number;
  unlockRequirement?: {
    building?: { key: BuildingKey; count: number };
    era?: Era;
  };
}

export interface BuildingState {
  buildingKey: BuildingKey;
  count: number;
  isUnlocked: boolean;
}
