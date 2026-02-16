import { getDb } from '../connection.js';
import { ALL_ACHIEVEMENT_KEYS } from '@foundation/shared';

export interface AchievementRow {
  user_id: number;
  achievement_key: string;
  unlocked_at: number | null;
}

export function getAchievements(userId: number): AchievementRow[] {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM achievements WHERE user_id = ?');
  return stmt.all(userId) as AchievementRow[];
}

export function unlockAchievement(userId: number, key: string): void {
  const db = getDb();
  const now = Math.floor(Date.now() / 1000);
  const stmt = db.prepare(`
    INSERT INTO achievements (user_id, achievement_key, unlocked_at)
    VALUES (?, ?, ?)
    ON CONFLICT(user_id, achievement_key)
    DO UPDATE SET unlocked_at = COALESCE(achievements.unlocked_at, excluded.unlocked_at)
  `);
  stmt.run(userId, key, now);
}

export function initializeAchievements(userId: number): void {
  const db = getDb();
  const stmt = db.prepare(
    'INSERT OR IGNORE INTO achievements (user_id, achievement_key, unlocked_at) VALUES (?, ?, NULL)'
  );
  const insertMany = db.transaction((keys: string[]) => {
    for (const key of keys) {
      stmt.run(userId, key);
    }
  });
  insertMany(ALL_ACHIEVEMENT_KEYS);
}
