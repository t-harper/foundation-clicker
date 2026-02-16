import { getDb } from '../connection.js';

export interface ShipRow {
  id: string;
  user_id: number;
  ship_type: string;
  name: string;
  status: string;
  trade_route_id: string | null;
  departed_at: number | null;
  returns_at: number | null;
}

export function getShips(userId: number): ShipRow[] {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM ships WHERE user_id = ?');
  return stmt.all(userId) as ShipRow[];
}

export function createShip(
  userId: number,
  shipData: {
    id: string;
    shipType: string;
    name: string;
  }
): ShipRow {
  const db = getDb();
  const stmt = db.prepare(
    'INSERT INTO ships (id, user_id, ship_type, name) VALUES (?, ?, ?, ?)'
  );
  stmt.run(shipData.id, userId, shipData.shipType, shipData.name);
  return db.prepare('SELECT * FROM ships WHERE id = ?').get(shipData.id) as ShipRow;
}

export function updateShipStatus(
  shipId: string,
  status: string,
  tradeRouteId: string | null,
  departedAt: number | null,
  returnsAt: number | null
): void {
  const db = getDb();
  const stmt = db.prepare(`
    UPDATE ships
    SET status = ?, trade_route_id = ?, departed_at = ?, returns_at = ?
    WHERE id = ?
  `);
  stmt.run(status, tradeRouteId, departedAt, returnsAt, shipId);
}

export function deleteShip(shipId: string): void {
  const db = getDb();
  const stmt = db.prepare('DELETE FROM ships WHERE id = ?');
  stmt.run(shipId);
}
