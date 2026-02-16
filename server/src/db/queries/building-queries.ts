import { getDb } from '../connection.js';
import { ALL_BUILDING_KEYS } from '@foundation/shared';

export interface BuildingRow {
  user_id: number;
  building_key: string;
  count: number;
  is_unlocked: number;
}

export function getBuildings(userId: number): BuildingRow[] {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM buildings WHERE user_id = ?');
  return stmt.all(userId) as BuildingRow[];
}

export function upsertBuilding(
  userId: number,
  key: string,
  count: number,
  isUnlocked: boolean
): void {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO buildings (user_id, building_key, count, is_unlocked)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(user_id, building_key)
    DO UPDATE SET count = excluded.count, is_unlocked = excluded.is_unlocked
  `);
  stmt.run(userId, key, count, isUnlocked ? 1 : 0);
}

export function initializeBuildings(userId: number): void {
  const db = getDb();
  const stmt = db.prepare(
    'INSERT OR IGNORE INTO buildings (user_id, building_key, count, is_unlocked) VALUES (?, ?, 0, 0)'
  );
  const insertMany = db.transaction((keys: string[]) => {
    for (const key of keys) {
      stmt.run(userId, key);
    }
  });
  insertMany(ALL_BUILDING_KEYS);
}
