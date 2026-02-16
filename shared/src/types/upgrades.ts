import { Era } from './eras.js';
import { ResourceKey, BuildingKey } from './index.js';

export type UpgradeKey = string;

export type UpgradeEffect =
  | { type: 'clickMultiplier'; multiplier: number }
  | { type: 'clickPerBuilding'; building: BuildingKey; creditsPerBuilding: number }
  | { type: 'clickBuildingScale'; building: BuildingKey; multiplierPerBuilding: number }
  | { type: 'clickTotalBuildingScale'; multiplierPerBuilding: number }
  | { type: 'clickResourceYield'; resource: ResourceKey; fraction: number }
  | { type: 'buildingMultiplier'; building: BuildingKey; multiplier: number }
  | { type: 'resourceMultiplier'; resource: ResourceKey; multiplier: number }
  | { type: 'globalMultiplier'; multiplier: number }
  | { type: 'unlockFeature'; feature: string };

export interface UpgradeDefinition {
  key: UpgradeKey;
  name: string;
  description: string;
  era: Era;
  cost: Partial<Record<ResourceKey, number>>;
  effects: UpgradeEffect[];
  prerequisites?: UpgradeKey[];
  requiredBuilding?: { key: BuildingKey; count: number };
}

export interface UpgradeState {
  upgradeKey: UpgradeKey;
  isPurchased: boolean;
}
