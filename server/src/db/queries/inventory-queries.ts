import { getDb } from '../connection.js';

export interface InventoryRow {
  user_id: number;
  item_key: string;
  quantity: number;
}

export interface ActiveConsumableRow {
  user_id: number;
  item_key: string;
  started_at: number;
  expires_at: number;
}

export function getUserInventory(userId: number): InventoryRow[] {
  const db = getDb();
  return db.prepare('SELECT * FROM inventory WHERE user_id = ? AND quantity > 0').all(userId) as InventoryRow[];
}

export function addItem(userId: number, itemKey: string, quantity: number): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO inventory (user_id, item_key, quantity)
    VALUES (?, ?, ?)
    ON CONFLICT(user_id, item_key)
    DO UPDATE SET quantity = quantity + excluded.quantity
  `).run(userId, itemKey, quantity);
}

export function removeItem(userId: number, itemKey: string, quantity: number): boolean {
  const db = getDb();
  const result = db.prepare(`
    UPDATE inventory SET quantity = quantity - ?
    WHERE user_id = ? AND item_key = ? AND quantity >= ?
  `).run(quantity, userId, itemKey, quantity);
  return result.changes > 0;
}

export function getItemQuantity(userId: number, itemKey: string): number {
  const db = getDb();
  const row = db.prepare(
    'SELECT quantity FROM inventory WHERE user_id = ? AND item_key = ?'
  ).get(userId, itemKey) as { quantity: number } | undefined;
  return row?.quantity ?? 0;
}

export function getActiveConsumable(userId: number): ActiveConsumableRow | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM active_consumable WHERE user_id = ?').get(userId) as ActiveConsumableRow | undefined;
}

export function setActiveConsumable(
  userId: number,
  itemKey: string,
  startedAt: number,
  expiresAt: number
): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO active_consumable (user_id, item_key, started_at, expires_at)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(user_id)
    DO UPDATE SET item_key = excluded.item_key, started_at = excluded.started_at, expires_at = excluded.expires_at
  `).run(userId, itemKey, startedAt, expiresAt);
}

export function clearActiveConsumable(userId: number): void {
  const db = getDb();
  db.prepare('DELETE FROM active_consumable WHERE user_id = ?').run(userId);
}
