import { ResourceKey } from './resources.js';
import { BuildingKey } from './buildings.js';
import { Era } from './eras.js';

export type AchievementKey = string;

export type AchievementCondition =
  | { type: 'resourceTotal'; resource: ResourceKey; amount: number }
  | { type: 'buildingCount'; building: BuildingKey; count: number }
  | { type: 'totalBuildings'; count: number }
  | { type: 'prestigeCount'; count: number }
  | { type: 'eraReached'; era: Era }
  | { type: 'totalClicks'; count: number }
  | { type: 'shipCount'; count: number }
  | { type: 'playTime'; seconds: number };

export interface AchievementDefinition {
  key: AchievementKey;
  name: string;
  description: string;
  condition: AchievementCondition;
  reward?: {
    type: 'globalMultiplier' | 'clickMultiplier' | 'resourceMultiplier';
    value: number;
    resource?: ResourceKey;
  };
  icon: string;
}

export interface AchievementState {
  achievementKey: AchievementKey;
  unlockedAt: number | null;
}
