import { WebSocket } from 'ws';
import type { ServerMessage } from '@foundation/shared';
import { buildGameState } from '../services/game-state.js';
import { getWss, type AuthenticatedSocket } from './sync.js';

/**
 * Build the user's full game state and push it to all their active WebSocket connections.
 * Works in both local dev (direct WSS access) and Lambda (API Gateway Management API).
 * Best-effort — errors are logged but never thrown.
 */
export async function pushFullSyncToUser(userId: number): Promise<void> {
  try {
    const state = await buildGameState(userId);
    const msg: ServerMessage = { type: 'fullState', gameState: state };

    if (process.env.WS_API_ENDPOINT) {
      // Lambda path: post via API Gateway Management API
      const { getUserConnections } = await import('../db/queries/ws-connection-queries.js');
      const { postToConnection } = await import('./api-gw-utils.js');
      const connectionIds = await getUserConnections(userId);
      await Promise.allSettled(
        connectionIds.map((connId) => postToConnection(connId, msg))
      );
    } else {
      // Local dev path: iterate WSS clients
      const wss = getWss();
      if (!wss) return;
      for (const client of wss.clients) {
        const sock = client as AuthenticatedSocket;
        if (sock.userId === userId && sock.readyState === WebSocket.OPEN) {
          sock.send(JSON.stringify(msg));
        }
      }
    }
  } catch (err) {
    console.error(`Failed to push full sync to user ${userId}:`, err);
  }
}
