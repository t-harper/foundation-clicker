import { GameState, GameStats } from './game-state.js';
import { BuildingKey } from './buildings.js';
import { UpgradeKey } from './upgrades.js';
import { ShipType } from './ships.js';
import { TradeRouteKey } from './ships.js';
import { PrestigePreview, PrestigeHistoryEntry } from './prestige.js';
import { AchievementState } from './achievements.js';
import { Resources, ResourceKey } from './resources.js';

// Auth
export interface RegisterRequest {
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: number;
  username: string;
}

// Game State
export interface LoadGameResponse {
  gameState: GameState;
  offlineEarnings: Resources | null;
  offlineSeconds: number;
}

export interface SaveGameRequest {
  resources: Resources;
  lastTickAt: number;
  totalPlayTime: number;
  totalClicks: number;
  lifetimeCredits: number;
}

// Click
export interface ClickRequest {
  clicks: number;
}

export interface ClickResponse {
  earned: number;
  newCredits: number;
  totalClicks: number;
  bonusResources?: Partial<Record<ResourceKey, number>>;
}

// Buildings
export interface BuyBuildingRequest {
  buildingKey: BuildingKey;
  amount: number;
}

export interface BuyBuildingResponse {
  building: { buildingKey: BuildingKey; count: number };
  resources: Resources;
}

export interface SellBuildingRequest {
  buildingKey: BuildingKey;
  amount: number;
}

// Upgrades
export interface BuyUpgradeRequest {
  upgradeKey: UpgradeKey;
}

export interface BuyUpgradeResponse {
  upgrade: { upgradeKey: UpgradeKey; isPurchased: boolean };
  resources: Resources;
}

// Ships
export interface BuildShipRequest {
  shipType: ShipType;
  name: string;
}

export interface SendShipRequest {
  shipId: string;
  tradeRouteKey: TradeRouteKey;
}

export interface UnlockTradeRouteRequest {
  routeKey: TradeRouteKey;
}

// Prestige
export interface PrestigeResponse {
  seldonPointsEarned: number;
  newPrestige: {
    seldonPoints: number;
    totalSeldonPoints: number;
    prestigeCount: number;
    prestigeMultiplier: number;
  };
  newEra: number;
}

// Achievements
export interface CheckAchievementsResponse {
  newAchievements: AchievementState[];
}

// Generic
export interface ApiError {
  error: string;
  message: string;
}

export interface ApiSuccess<T = void> {
  success: true;
  data: T;
}
