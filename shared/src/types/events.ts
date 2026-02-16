import { Era } from './eras.js';
import { ResourceKey } from './resources.js';
import { BuildingKey } from './buildings.js';

export type EventKey = string;

// When an event becomes eligible (ALL conditions must be met)
export type EventCondition =
  | { type: 'buildingCount'; building: BuildingKey; count: number }
  | { type: 'totalBuildings'; count: number }
  | { type: 'resourceTotal'; resource: ResourceKey; amount: number }
  | { type: 'eraReached'; era: Era }
  | { type: 'prestigeCount'; count: number }
  | { type: 'totalClicks'; count: number }
  | { type: 'shipCount'; count: number }
  | { type: 'playTime'; seconds: number }
  | { type: 'upgradeOwned'; upgrade: string }
  | { type: 'lifetimeCredits'; amount: number };

// What happens when a choice is picked
export type EventEffect =
  | { type: 'resourceGrant'; resource: ResourceKey; amount: number }
  | { type: 'resourceLoss'; resource: ResourceKey; amount: number }
  | { type: 'resourcePercentGrant'; resource: ResourceKey; percent: number }
  | { type: 'resourcePercentLoss'; resource: ResourceKey; percent: number }
  | { type: 'productionBuff'; resource: ResourceKey; multiplier: number; durationSeconds: number }
  | { type: 'productionDebuff'; resource: ResourceKey; multiplier: number; durationSeconds: number }
  | { type: 'globalProductionBuff'; multiplier: number; durationSeconds: number }
  | { type: 'globalProductionDebuff'; multiplier: number; durationSeconds: number }
  | { type: 'clickBuff'; multiplier: number; durationSeconds: number }
  | { type: 'clickDebuff'; multiplier: number; durationSeconds: number };

export interface EventChoice {
  label: string;
  description: string;
  effects: EventEffect[];
}

export interface EventDefinition {
  key: EventKey;
  name: string;
  description: string;
  era: Era;
  conditions: EventCondition[];
  choices: EventChoice[];
  repeatable: boolean;
  cooldownSeconds: number;
  weight: number;
}

export interface ActiveEffect {
  id: string;
  eventKey: EventKey;
  choiceIndex: number;
  effectType: 'productionBuff' | 'productionDebuff' | 'globalProductionBuff' | 'globalProductionDebuff' | 'clickBuff' | 'clickDebuff';
  resource?: ResourceKey;
  multiplier: number;
  startedAt: number;
  expiresAt: number;
}

export interface EventHistoryEntry {
  eventKey: EventKey;
  choiceIndex: number;
  firedAt: number;
}
