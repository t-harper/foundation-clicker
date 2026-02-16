import { Era } from './eras.js';
import { ResourceKey } from './resources.js';

export type ShipType = 'freeTrader' | 'scoutShip' | 'whisperShip' | 'graviticShip';

export type ShipStatus = 'docked' | 'trading' | 'exploring' | 'returning';

export interface ShipDefinition {
  type: ShipType;
  name: string;
  description: string;
  era: Era;
  buildCost: Partial<Record<ResourceKey, number>>;
  buildTime: number; // seconds
  cargoCapacity: number;
  speed: number; // multiplier
}

export interface ShipState {
  id: string;
  shipType: ShipType;
  name: string;
  status: ShipStatus;
  tradeRouteId: string | null;
  departedAt: number | null;
  returnsAt: number | null;
}

export type TradeRouteKey = string;

export interface TradeRouteDefinition {
  key: TradeRouteKey;
  name: string;
  description: string;
  era: Era;
  duration: number; // seconds for round trip
  reward: Partial<Record<ResourceKey, number>>;
  unlockCost: Partial<Record<ResourceKey, number>>;
  requiredShipType: ShipType;
}

export interface TradeRouteState {
  routeKey: TradeRouteKey;
  isUnlocked: boolean;
}
