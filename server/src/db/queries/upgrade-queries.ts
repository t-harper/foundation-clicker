import { getDb } from '../connection.js';
import { ALL_UPGRADE_KEYS } from '@foundation/shared';

export interface UpgradeRow {
  user_id: number;
  upgrade_key: string;
  is_purchased: number;
}

export function getUpgrades(userId: number): UpgradeRow[] {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM upgrades WHERE user_id = ?');
  return stmt.all(userId) as UpgradeRow[];
}

export function purchaseUpgrade(userId: number, key: string): void {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO upgrades (user_id, upgrade_key, is_purchased)
    VALUES (?, ?, 1)
    ON CONFLICT(user_id, upgrade_key)
    DO UPDATE SET is_purchased = 1
  `);
  stmt.run(userId, key);
}

export function initializeUpgrades(userId: number): void {
  const db = getDb();
  const stmt = db.prepare(
    'INSERT OR IGNORE INTO upgrades (user_id, upgrade_key, is_purchased) VALUES (?, ?, 0)'
  );
  const insertMany = db.transaction((keys: string[]) => {
    for (const key of keys) {
      stmt.run(userId, key);
    }
  });
  insertMany(ALL_UPGRADE_KEYS);
}
