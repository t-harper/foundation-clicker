import { WebSocketServer, WebSocket } from 'ws';
import type { Server } from 'http';
import jwt from 'jsonwebtoken';
import type { ClientMessage, ServerMessage } from '@foundation/shared';
import {
  WS_SYNC_INTERVAL,
  WS_ACHIEVEMENT_CHECK_INTERVAL,
  WS_EVENT_CHECK_INTERVAL,
} from '@foundation/shared';
import { handleClientMessage } from './handlers.js';
import { getUserBuildings } from '../services/building.js';
import { getUserUpgrades } from '../services/upgrade.js';
import { getUserShips } from '../services/ship.js';
import { checkAchievements } from '../services/achievement.js';
import { checkForEvent, getUserActiveEffects } from '../services/event.js';
import { ACHIEVEMENT_DEFINITIONS } from '@foundation/shared';

const JWT_SECRET = process.env.JWT_SECRET || 'foundation-dev-secret-key';

const PING_INTERVAL = 30000;
const PONG_TIMEOUT = 10000;
const EFFECTS_CHECK_INTERVAL = 5000;
const FULL_SYNC_EVERY = 12; // Force full sync every 12 ticks (12 × 5s = 60s)

let wssInstance: WebSocketServer | null = null;

/** Get the local-dev WebSocketServer instance (null if not yet created). */
export function getWss(): WebSocketServer | null {
  return wssInstance;
}

export interface AuthenticatedSocket extends WebSocket {
  userId?: number;
  isAlive?: boolean;
  timers?: {
    sync: ReturnType<typeof setInterval>;
    achievement: ReturnType<typeof setInterval>;
    event: ReturnType<typeof setInterval>;
    effects: ReturnType<typeof setInterval>;
    ping: ReturnType<typeof setInterval>;
  };
  lastEffectIds?: string;
  lastSync?: {
    buildings: string;
    upgrades: string;
    ships: string;
  };
  syncTickCount?: number;
}

function sendMessage(ws: WebSocket, msg: ServerMessage): void {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(msg));
  }
}

function clearTimers(ws: AuthenticatedSocket): void {
  if (ws.timers) {
    clearInterval(ws.timers.sync);
    clearInterval(ws.timers.achievement);
    clearInterval(ws.timers.event);
    clearInterval(ws.timers.effects);
    clearInterval(ws.timers.ping);
  }
}

export function setupWebSocketSync(server: Server): void {
  const wss = new WebSocketServer({ server, path: '/ws' });
  wssInstance = wss;

  wss.on('connection', (ws: AuthenticatedSocket, req) => {
    // Extract token from query param
    const url = new URL(req.url ?? '', `http://${req.headers.host}`);
    const token = url.searchParams.get('token');

    if (!token) {
      ws.close(4001, 'Missing token');
      return;
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; username: string };
      ws.userId = decoded.userId;
    } catch {
      ws.close(4001, 'Invalid token');
      return;
    }

    const userId = ws.userId!;
    ws.isAlive = true;
    ws.lastEffectIds = '';

    // Handle incoming messages
    ws.on('message', async (raw) => {
      let msg: ClientMessage;
      try {
        msg = JSON.parse(raw.toString());
      } catch {
        sendMessage(ws, { type: 'error', requestId: '', message: 'Invalid JSON' });
        return;
      }

      try {
        const result = await handleClientMessage(userId, msg);

        // Send response if one exists
        if (result.response) {
          sendMessage(ws, result.response);
        }

        // Check achievements after mutations that warrant it
        if (result.checkAchievements) {
          try {
            const achResult = await checkAchievements(userId);
            if (achResult.newAchievements.length > 0) {
              sendMessage(ws, {
                type: 'achievementUnlocked',
                achievements: achResult.newAchievements,
              });
            }
          } catch (err) {
            console.error('Post-mutation achievement check failed:', err);
          }
        }
      } catch (err) {
        const requestId = 'requestId' in msg ? (msg as any).requestId : '';
        const message = err instanceof Error ? err.message : 'Internal server error';
        sendMessage(ws, { type: 'error', requestId, message });
      }
    });

    // Periodic sync: push only changed categories (delta sync)
    const syncTimer = setInterval(() => {
      if (ws.readyState !== WebSocket.OPEN) return;
      (async () => {
        try {
          ws.syncTickCount = (ws.syncTickCount ?? 0) + 1;
          const forceFullSync = ws.syncTickCount % FULL_SYNC_EVERY === 0;

          const buildings = await getUserBuildings(userId);
          const upgrades = await getUserUpgrades(userId);
          const ships = await getUserShips(userId);

          const buildingsJson = JSON.stringify(buildings);
          const upgradesJson = JSON.stringify(upgrades);
          const shipsJson = JSON.stringify(ships);

          if (forceFullSync || !ws.lastSync) {
            // First tick or periodic full sync
            sendMessage(ws, { type: 'sync', buildings, upgrades, ships });
          } else {
            const msg: ServerMessage & { type: 'sync' } = { type: 'sync' };
            let hasChanges = false;

            if (buildingsJson !== ws.lastSync.buildings) {
              msg.buildings = buildings;
              hasChanges = true;
            }
            if (upgradesJson !== ws.lastSync.upgrades) {
              msg.upgrades = upgrades;
              hasChanges = true;
            }
            if (shipsJson !== ws.lastSync.ships) {
              msg.ships = ships;
              hasChanges = true;
            }

            if (hasChanges) {
              sendMessage(ws, msg);
            }
          }

          ws.lastSync = {
            buildings: buildingsJson,
            upgrades: upgradesJson,
            ships: shipsJson,
          };
        } catch (err) {
          console.error('WebSocket sync error:', err);
        }
      })();
    }, WS_SYNC_INTERVAL);

    // Periodic achievement check
    const achievementTimer = setInterval(() => {
      if (ws.readyState !== WebSocket.OPEN) return;
      (async () => {
        try {
          const result = await checkAchievements(userId);
          if (result.newAchievements.length > 0) {
            sendMessage(ws, {
              type: 'achievementUnlocked',
              achievements: result.newAchievements,
            });
          }
        } catch (err) {
          console.error('WebSocket achievement check error:', err);
        }
      })();
    }, WS_ACHIEVEMENT_CHECK_INTERVAL);

    // Periodic event check
    const eventTimer = setInterval(() => {
      if (ws.readyState !== WebSocket.OPEN) return;
      (async () => {
        try {
          const result = await checkForEvent(userId);
          if (result.event) {
            sendMessage(ws, {
              type: 'eventTriggered',
              eventKey: result.event.eventKey,
            });
          }
        } catch (err) {
          console.error('WebSocket event check error:', err);
        }
      })();
    }, WS_EVENT_CHECK_INTERVAL);

    // Periodic effects cleanup + push
    const effectsTimer = setInterval(() => {
      if (ws.readyState !== WebSocket.OPEN) return;
      (async () => {
        try {
          const effects = await getUserActiveEffects(userId);
          // Only push if the set of effects has changed
          const effectIds = effects.map((e) => e.id).sort().join(',');
          if (effectIds !== ws.lastEffectIds) {
            ws.lastEffectIds = effectIds;
            sendMessage(ws, { type: 'effectsUpdate', activeEffects: effects });
          }
        } catch (err) {
          console.error('WebSocket effects check error:', err);
        }
      })();
    }, EFFECTS_CHECK_INTERVAL);

    // Ping/pong for keepalive
    const pingTimer = setInterval(() => {
      if (!ws.isAlive) {
        clearTimers(ws);
        ws.terminate();
        return;
      }
      ws.isAlive = false;
      ws.ping();
    }, PING_INTERVAL);

    ws.on('pong', () => {
      ws.isAlive = true;
    });

    ws.timers = {
      sync: syncTimer,
      achievement: achievementTimer,
      event: eventTimer,
      effects: effectsTimer,
      ping: pingTimer,
    };

    ws.on('close', () => {
      clearTimers(ws);
    });

    ws.on('error', () => {
      clearTimers(ws);
      ws.close();
    });
  });
}
