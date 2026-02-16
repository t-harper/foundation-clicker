import { getDb } from '../connection.js';

export interface HeroRow {
  user_id: number;
  hero_key: string;
  unlocked_at: number;
}

export function getUserHeroes(userId: number): HeroRow[] {
  const db = getDb();
  return db.prepare('SELECT * FROM heroes WHERE user_id = ?').all(userId) as HeroRow[];
}

export function unlockHero(userId: number, heroKey: string, unlockedAt: number): void {
  const db = getDb();
  db.prepare(
    'INSERT OR IGNORE INTO heroes (user_id, hero_key, unlocked_at) VALUES (?, ?, ?)'
  ).run(userId, heroKey, unlockedAt);
}

export function hasHero(userId: number, heroKey: string): boolean {
  const db = getDb();
  const row = db.prepare('SELECT 1 FROM heroes WHERE user_id = ? AND hero_key = ?').get(userId, heroKey);
  return !!row;
}
