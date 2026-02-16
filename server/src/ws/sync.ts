import { WebSocketServer, WebSocket } from 'ws';
import type { Server } from 'http';
import jwt from 'jsonwebtoken';
import { getUserBuildings } from '../services/building.js';
import { getUserUpgrades } from '../services/upgrade.js';

const JWT_SECRET = process.env.JWT_SECRET || 'foundation-dev-secret-key';

interface AuthenticatedSocket extends WebSocket {
  userId?: number;
  syncInterval?: ReturnType<typeof setInterval>;
}

export function setupWebSocketSync(server: Server): void {
  const wss = new WebSocketServer({ server, path: '/ws' });

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

    // Send sync data every 500ms
    ws.syncInterval = setInterval(() => {
      if (ws.readyState !== WebSocket.OPEN) return;

      try {
        const buildings = getUserBuildings(userId);
        const upgrades = getUserUpgrades(userId);
        ws.send(JSON.stringify({ type: 'sync', buildings, upgrades }));
      } catch (err) {
        console.error('WebSocket sync error:', err);
      }
    }, 500);

    ws.on('close', () => {
      if (ws.syncInterval) clearInterval(ws.syncInterval);
    });

    ws.on('error', () => {
      if (ws.syncInterval) clearInterval(ws.syncInterval);
      ws.close();
    });
  });
}
