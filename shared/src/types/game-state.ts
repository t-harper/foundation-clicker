import { Era } from './eras.js';
import { Resources } from './resources.js';
import { BuildingState } from './buildings.js';
import { UpgradeState } from './upgrades.js';
import { ShipState, TradeRouteState } from './ships.js';
import { AchievementState } from './achievements.js';
import { PrestigeState } from './prestige.js';

export interface GameState {
  userId: number;
  resources: Resources;
  clickValue: number;
  currentEra: Era;
  prestige: PrestigeState;
  buildings: BuildingState[];
  upgrades: UpgradeState[];
  ships: ShipState[];
  tradeRoutes: TradeRouteState[];
  achievements: AchievementState[];
  lastTickAt: number;
  totalPlayTime: number;
  totalClicks: number;
  lifetimeCredits: number;
}

export interface GameStats {
  totalPlayTime: number;
  totalClicks: number;
  lifetimeCredits: number;
  totalBuildings: number;
  totalUpgrades: number;
  totalShips: number;
  totalAchievements: number;
  prestigeCount: number;
}
