import { getDb } from '../connection.js';
import { ALL_TRADE_ROUTE_KEYS } from '@foundation/shared';

export interface TradeRouteRow {
  user_id: number;
  route_key: string;
  is_unlocked: number;
}

export function getTradeRoutes(userId: number): TradeRouteRow[] {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM trade_routes WHERE user_id = ?');
  return stmt.all(userId) as TradeRouteRow[];
}

export function unlockTradeRoute(userId: number, key: string): void {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO trade_routes (user_id, route_key, is_unlocked)
    VALUES (?, ?, 1)
    ON CONFLICT(user_id, route_key)
    DO UPDATE SET is_unlocked = 1
  `);
  stmt.run(userId, key);
}

export function initializeTradeRoutes(userId: number): void {
  const db = getDb();
  const stmt = db.prepare(
    'INSERT OR IGNORE INTO trade_routes (user_id, route_key, is_unlocked) VALUES (?, ?, 0)'
  );
  const insertMany = db.transaction((keys: string[]) => {
    for (const key of keys) {
      stmt.run(userId, key);
    }
  });
  insertMany(ALL_TRADE_ROUTE_KEYS);
}
