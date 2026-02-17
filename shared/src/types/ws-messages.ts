import { Resources } from './resources.js';
import { BuildingKey, BuildingState } from './buildings.js';
import { UpgradeKey, UpgradeState } from './upgrades.js';
import { ShipType, ShipState, TradeRouteKey } from './ships.js';
import { AchievementState } from './achievements.js';
import { ActiveEffect, EventKey } from './events.js';
import { GameState } from './game-state.js';

// Client → Server messages
export type ClientMessage =
  // Fire-and-forget (no requestId, no response)
  | { type: 'saveState'; resources: Resources; lastTickAt: number; totalPlayTime: number; totalClicks: number; lifetimeCredits: number }
  // Request/response (include requestId, server echoes it back)
  | { type: 'click'; requestId: string; clicks: number }
  | { type: 'buyBuilding'; requestId: string; buildingKey: BuildingKey; amount: number }
  | { type: 'sellBuilding'; requestId: string; buildingKey: BuildingKey; amount: number }
  | { type: 'buyUpgrade'; requestId: string; upgradeKey: UpgradeKey }
  | { type: 'buildShip'; requestId: string; shipType: ShipType; name: string }
  | { type: 'sendShip'; requestId: string; shipId: string; tradeRouteKey: TradeRouteKey }
  | { type: 'recallShip'; requestId: string; shipId: string }
  | { type: 'unlockTradeRoute'; requestId: string; routeKey: TradeRouteKey }
  | { type: 'triggerPrestige'; requestId: string }
  | { type: 'chooseEvent'; requestId: string; eventKey: EventKey; choiceIndex: number }
  | { type: 'resetGame'; requestId: string }
  | { type: 'getStats'; requestId: string }
  | { type: 'getPrestigePreview'; requestId: string }
  | { type: 'getPrestigeHistory'; requestId: string }
  | { type: 'getActiveEffects'; requestId: string }
  | { type: 'getEventHistory'; requestId: string }
  // Client-initiated polling (for serverless compatibility)
  | { type: 'requestSync'; requestId: string }
  | { type: 'checkEvents'; requestId: string }
  | { type: 'checkEffects'; requestId: string }
  | { type: 'ping' };

// Server → Client messages
export type ServerMessage =
  // Response to a client request (matched by requestId)
  | { type: 'result'; requestId: string; data: unknown }
  | { type: 'error'; requestId: string; message: string }
  // Server-initiated pushes (no requestId)
  | { type: 'sync'; buildings?: BuildingState[]; upgrades?: UpgradeState[]; ships?: ShipState[] }
  | { type: 'achievementUnlocked'; achievements: AchievementState[] }
  | { type: 'eventTriggered'; eventKey: string }
  | { type: 'effectsUpdate'; activeEffects: ActiveEffect[] }
  | { type: 'fullState'; gameState: GameState }
  | { type: 'pong' };
