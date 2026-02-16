import type { ClientMessage, ServerMessage, GameState } from '@foundation/shared';
import { buyBuilding, sellBuilding } from '../services/building.js';
import { buyUpgrade } from '../services/upgrade.js';
import { buildShip, sendShip, recallShip } from '../services/ship.js';
import { unlockTradeRoute } from '../services/trade.js';
import {
  handleClick,
  saveGameState,
  resetGame,
  getGameStats,
  buildGameState,
} from '../services/game-state.js';
import {
  previewPrestige,
  triggerPrestige,
  getPrestigeHistoryForUser,
} from '../services/prestige.js';
import { handleEventChoice, getUserActiveEffects, getUserEventHistory } from '../services/event.js';
import { checkAchievements } from '../services/achievement.js';

export interface HandlerResult {
  response: ServerMessage | null;
  /** If a full-state reload is needed (prestige/reset), return it here */
  fullState?: GameState;
  /** If achievements should be checked after this mutation */
  checkAchievements?: boolean;
}

export function handleClientMessage(userId: number, msg: ClientMessage): HandlerResult {
  switch (msg.type) {
    case 'saveState': {
      saveGameState(userId, {
        resources: msg.resources,
        lastTickAt: msg.lastTickAt,
        totalPlayTime: msg.totalPlayTime,
        totalClicks: msg.totalClicks,
        lifetimeCredits: msg.lifetimeCredits,
      });
      // Fire-and-forget, no response
      return { response: null };
    }

    case 'click': {
      const result = handleClick(userId, msg.clicks);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
        checkAchievements: true,
      };
    }

    case 'buyBuilding': {
      const result = buyBuilding(userId, msg.buildingKey, msg.amount);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
        checkAchievements: true,
      };
    }

    case 'sellBuilding': {
      const result = sellBuilding(userId, msg.buildingKey, msg.amount);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
      };
    }

    case 'buyUpgrade': {
      const result = buyUpgrade(userId, msg.upgradeKey);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
        checkAchievements: true,
      };
    }

    case 'buildShip': {
      const result = buildShip(userId, msg.shipType, msg.name);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
        checkAchievements: true,
      };
    }

    case 'sendShip': {
      const result = sendShip(userId, msg.shipId, msg.tradeRouteKey);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
      };
    }

    case 'recallShip': {
      const result = recallShip(userId, msg.shipId);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
      };
    }

    case 'unlockTradeRoute': {
      const result = unlockTradeRoute(userId, msg.routeKey);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
      };
    }

    case 'triggerPrestige': {
      const result = triggerPrestige(userId);
      const fullState = buildGameState(userId);
      return {
        response: { type: 'result', requestId: msg.requestId, data: { ...result, gameState: fullState } },
      };
    }

    case 'chooseEvent': {
      const result = handleEventChoice(userId, msg.eventKey, msg.choiceIndex);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
        checkAchievements: true,
      };
    }

    case 'resetGame': {
      resetGame(userId);
      const fullState = buildGameState(userId);
      return {
        response: { type: 'result', requestId: msg.requestId, data: { gameState: fullState } },
      };
    }

    case 'getStats': {
      const result = getGameStats(userId);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
      };
    }

    case 'getPrestigePreview': {
      const result = previewPrestige(userId);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
      };
    }

    case 'getPrestigeHistory': {
      const result = getPrestigeHistoryForUser(userId);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
      };
    }

    case 'getActiveEffects': {
      const result = getUserActiveEffects(userId);
      return {
        response: { type: 'result', requestId: msg.requestId, data: { activeEffects: result } },
      };
    }

    case 'getEventHistory': {
      const result = getUserEventHistory(userId);
      return {
        response: { type: 'result', requestId: msg.requestId, data: { history: result } },
      };
    }

    default:
      return {
        response: {
          type: 'error',
          requestId: (msg as any).requestId ?? '',
          message: `Unknown message type: ${(msg as any).type}`,
        },
      };
  }
}
