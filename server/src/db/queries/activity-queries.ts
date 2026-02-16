import { getDb } from '../connection.js';

export interface ActivityRow {
  user_id: number;
  activity_key: string;
  times_completed: number;
}

export interface ActiveActivityRow {
  user_id: number;
  activity_key: string;
  hero_key: string;
  started_at: number;
  completes_at: number;
}

export function getUserActivities(userId: number): ActivityRow[] {
  const db = getDb();
  return db.prepare('SELECT * FROM activities WHERE user_id = ?').all(userId) as ActivityRow[];
}

export function getActiveActivities(userId: number): ActiveActivityRow[] {
  const db = getDb();
  return db.prepare('SELECT * FROM active_activities WHERE user_id = ?').all(userId) as ActiveActivityRow[];
}

export function getActiveActivityByKey(userId: number, activityKey: string): ActiveActivityRow | undefined {
  const db = getDb();
  return db.prepare(
    'SELECT * FROM active_activities WHERE user_id = ? AND activity_key = ?'
  ).get(userId, activityKey) as ActiveActivityRow | undefined;
}

export function getActiveActivityByHero(userId: number, heroKey: string): ActiveActivityRow | undefined {
  const db = getDb();
  return db.prepare(
    'SELECT * FROM active_activities WHERE user_id = ? AND hero_key = ?'
  ).get(userId, heroKey) as ActiveActivityRow | undefined;
}

export function insertActiveActivity(
  userId: number,
  activityKey: string,
  heroKey: string,
  startedAt: number,
  completesAt: number
): void {
  const db = getDb();
  db.prepare(
    'INSERT INTO active_activities (user_id, activity_key, hero_key, started_at, completes_at) VALUES (?, ?, ?, ?, ?)'
  ).run(userId, activityKey, heroKey, startedAt, completesAt);
}

export function removeActiveActivity(userId: number, activityKey: string): void {
  const db = getDb();
  db.prepare('DELETE FROM active_activities WHERE user_id = ? AND activity_key = ?').run(userId, activityKey);
}

export function incrementTimesCompleted(userId: number, activityKey: string): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO activities (user_id, activity_key, times_completed)
    VALUES (?, ?, 1)
    ON CONFLICT(user_id, activity_key)
    DO UPDATE SET times_completed = times_completed + 1
  `).run(userId, activityKey);
}

export function getTimesCompleted(userId: number, activityKey: string): number {
  const db = getDb();
  const row = db.prepare(
    'SELECT times_completed FROM activities WHERE user_id = ? AND activity_key = ?'
  ).get(userId, activityKey) as { times_completed: number } | undefined;
  return row?.times_completed ?? 0;
}
