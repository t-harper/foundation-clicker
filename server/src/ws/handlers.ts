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
import { handleEventChoice, getUserActiveEffects, getUserEventHistory, checkForEvent } from '../services/event.js';
import { checkAchievements } from '../services/achievement.js';
import { getUserBuildings } from '../services/building.js';
import { getUserUpgrades } from '../services/upgrade.js';
import { getUserShips } from '../services/ship.js';

export interface HandlerResult {
  response: ServerMessage | null;
  /** If a full-state reload is needed (prestige/reset), return it here */
  fullState?: GameState;
  /** If achievements should be checked after this mutation */
  checkAchievements?: boolean;
}

export async function handleClientMessage(userId: number, msg: ClientMessage): Promise<HandlerResult> {
  switch (msg.type) {
    case 'saveState': {
      await saveGameState(userId, {
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
      const result = await handleClick(userId, msg.clicks);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
        checkAchievements: true,
      };
    }

    case 'buyBuilding': {
      const result = await buyBuilding(userId, msg.buildingKey, msg.amount);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
        checkAchievements: true,
      };
    }

    case 'sellBuilding': {
      const result = await sellBuilding(userId, msg.buildingKey, msg.amount);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
      };
    }

    case 'buyUpgrade': {
      const result = await buyUpgrade(userId, msg.upgradeKey);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
        checkAchievements: true,
      };
    }

    case 'buildShip': {
      const result = await buildShip(userId, msg.shipType, msg.name);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
        checkAchievements: true,
      };
    }

    case 'sendShip': {
      const result = await sendShip(userId, msg.shipId, msg.tradeRouteKey);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
      };
    }

    case 'recallShip': {
      const result = await recallShip(userId, msg.shipId);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
      };
    }

    case 'unlockTradeRoute': {
      const result = await unlockTradeRoute(userId, msg.routeKey);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
      };
    }

    case 'triggerPrestige': {
      const result = await triggerPrestige(userId);
      const fullState = await buildGameState(userId);
      return {
        response: { type: 'result', requestId: msg.requestId, data: { ...result, gameState: fullState } },
      };
    }

    case 'chooseEvent': {
      const result = await handleEventChoice(userId, msg.eventKey, msg.choiceIndex);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
        checkAchievements: true,
      };
    }

    case 'resetGame': {
      await resetGame(userId);
      const fullState = await buildGameState(userId);
      return {
        response: { type: 'result', requestId: msg.requestId, data: { gameState: fullState } },
      };
    }

    case 'getStats': {
      const result = await getGameStats(userId);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
      };
    }

    case 'getPrestigePreview': {
      const result = await previewPrestige(userId);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
      };
    }

    case 'getPrestigeHistory': {
      const result = await getPrestigeHistoryForUser(userId);
      return {
        response: { type: 'result', requestId: msg.requestId, data: result },
      };
    }

    case 'getActiveEffects': {
      const result = await getUserActiveEffects(userId);
      return {
        response: { type: 'result', requestId: msg.requestId, data: { activeEffects: result } },
      };
    }

    case 'getEventHistory': {
      const result = await getUserEventHistory(userId);
      return {
        response: { type: 'result', requestId: msg.requestId, data: { history: result } },
      };
    }

    case 'requestSync': {
      const [buildings, upgrades, ships] = await Promise.all([
        getUserBuildings(userId),
        getUserUpgrades(userId),
        getUserShips(userId),
      ]);
      return {
        response: { type: 'result', requestId: msg.requestId, data: { type: 'sync', buildings, upgrades, ships } },
      };
    }

    case 'checkEvents': {
      const result = await checkForEvent(userId);
      if (result.event) {
        return {
          response: { type: 'result', requestId: msg.requestId, data: { type: 'eventTriggered', eventKey: result.event.eventKey } },
        };
      }
      return {
        response: { type: 'result', requestId: msg.requestId, data: null },
      };
    }

    case 'checkEffects': {
      const effects = await getUserActiveEffects(userId);
      return {
        response: { type: 'result', requestId: msg.requestId, data: { type: 'effectsUpdate', activeEffects: effects } },
      };
    }

    case 'ping': {
      return {
        response: { type: 'pong' } as any,
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
