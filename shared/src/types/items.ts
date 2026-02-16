import { Era } from './eras.js';
import { ResourceKey } from './resources.js';

export type ItemKey = string;

export type ItemCategory = 'artifact' | 'consumable';

export type ArtifactEffect =
  | { type: 'resourceMultiplier'; resource: ResourceKey; multiplier: number }
  | { type: 'globalMultiplier'; multiplier: number }
  | { type: 'clickMultiplier'; multiplier: number };

export type ConsumableEffect =
  | { type: 'productionBuff'; resource: ResourceKey; multiplier: number; durationSeconds: number }
  | { type: 'globalProductionBuff'; multiplier: number; durationSeconds: number }
  | { type: 'clickBuff'; multiplier: number; durationSeconds: number };

export interface ItemDefinition {
  key: ItemKey;
  name: string;
  description: string;
  era: Era;
  category: ItemCategory;
  effect: ArtifactEffect | ConsumableEffect;
}

export interface InventoryItem {
  itemKey: ItemKey;
  quantity: number;
}

export interface ActiveConsumable {
  itemKey: ItemKey;
  startedAt: number;
  expiresAt: number;
  effect: ConsumableEffect;
}
