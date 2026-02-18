import { GameState, GameStats } from './game-state.js';
import { BuildingKey } from './buildings.js';
import { UpgradeKey } from './upgrades.js';
import { ShipType } from './ships.js';
import { TradeRouteKey } from './ships.js';
import { PrestigePreview, PrestigeHistoryEntry } from './prestige.js';
import { AchievementState } from './achievements.js';
import { Resources, ResourceKey } from './resources.js';
import { EventKey, EventDefinition, ActiveEffect, EventHistoryEntry } from './events.js';

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
  nickname: string | null;
}

// Game State
export interface LoadGameResponse {
  gameState: GameState;
  offlineEarnings: Resources | null;
  offlineSeconds: number;
  pendingEventKey: string | null;
  nickname: string;
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

// Era Replay
export interface ReplayEraResponse {
  newEra: number;
}

// Achievements
export interface CheckAchievementsResponse {
  newAchievements: AchievementState[];
}

// Events
export interface CheckEventsResponse {
  event: { eventKey: EventKey } | null;
}

export interface ChooseEventRequest {
  eventKey: EventKey;
  choiceIndex: number;
}

export interface ChooseEventResponse {
  resources: Resources;
  newEffects: ActiveEffect[];
}

export interface GetActiveEffectsResponse {
  activeEffects: ActiveEffect[];
}

export interface GetEventHistoryResponse {
  history: EventHistoryEntry[];
}

export interface GetEventHistoryPageResponse {
  history: EventHistoryEntry[];
  cursor: string | null;
  hasMore: boolean;
}

// Heroes
export interface GetHeroesResponse {
  heroes: import('./heroes.js').HeroState[];
}

// Activities
export interface GetActivitiesResponse {
  activities: import('./activities.js').ActivityState[];
  activeActivities: import('./activities.js').ActiveActivity[];
}

export interface StartActivityRequest {
  activityKey: string;
  heroKey: string;
}

export interface StartActivityResponse {
  activeActivity: import('./activities.js').ActiveActivity;
  resources: Resources;
}

export interface CollectActivityRequest {
  activityKey: string;
}

export interface CollectActivityResponse {
  rewards: { itemKey: string; quantity: number }[];
  activity: import('./activities.js').ActivityState;
  inventory: import('./items.js').InventoryItem[];
}

// Inventory
export interface GetInventoryResponse {
  inventory: import('./items.js').InventoryItem[];
  activeConsumable: import('./items.js').ActiveConsumable | null;
}

export interface UseConsumableRequest {
  itemKey: string;
}

export interface UseConsumableResponse {
  activeConsumable: import('./items.js').ActiveConsumable;
  inventory: import('./items.js').InventoryItem[];
}

// Admin
export interface AdminUserSummary {
  id: number;
  username: string;
  nickname: string;
  isAdmin: boolean;
  createdAt: number;
  currentEra: number;
  prestigeCount: number;
}

// Nickname
export interface SetNicknameRequest {
  nickname: string;
}

export interface SetNicknameResponse {
  nickname: string;
}

// Leaderboard
export type LeaderboardCategory = 'lifetimeCredits' | 'totalSeldonPoints' | 'prestigeCount' | 'currentEra' | 'totalAchievements';

export interface LeaderboardEntry {
  rank: number;
  nickname: string;
  value: number;
  currentEra: number;
}

export interface GetLeaderboardResponse {
  category: LeaderboardCategory;
  entries: LeaderboardEntry[];
  updatedAt: number;
}

// Admin Dashboard
export interface AdminDashboardResponse {
  overview: {
    totalPlayers: number;
    active24h: number;
    active7d: number;
    newPlayers7d: number;
  };
  eraDistribution: {
    playersPerEra: [number, number, number, number];
    avgPrestigeCount: number;
    maxPrestigeCount: number;
    avgTotalSeldonPoints: number;
    maxTotalSeldonPoints: number;
  };
  engagement: {
    avgPlayTimeSeconds: number;
    medianPlayTimeSeconds: number;
    avgTotalClicks: number;
    avgLifetimeCredits: number;
    maxLifetimeCredits: number;
  };
  contentAdoption: {
    avgBuildingsOwned: number;
    avgUpgradesPurchased: number;
    avgAchievementsUnlocked: number;
    avgHeroesUnlocked: number;
  };
  economy: {
    totalLifetimeCredits: number;
    totalSeldonPoints: number;
    totalClicks: number;
  };
  shipsAndTrade: {
    totalShipsBuilt: number;
    totalTradeRoutesUnlocked: number;
  };
  topPlayers: {
    byLifetimeCredits: { nickname: string; value: number }[];
    bySeldonPoints: { nickname: string; value: number }[];
  };
  computedAt: number;
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
