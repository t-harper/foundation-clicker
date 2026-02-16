import { getDb } from '../connection.js';

export interface EventHistoryRow {
  id: number;
  user_id: number;
  event_key: string;
  choice_index: number;
  fired_at: number;
}

export interface ActiveEffectRow {
  id: string;
  user_id: number;
  event_key: string;
  choice_index: number;
  effect_type: string;
  resource: string | null;
  multiplier: number;
  started_at: number;
  expires_at: number;
}

export function getEventHistory(userId: number): EventHistoryRow[] {
  const db = getDb();
  return db
    .prepare('SELECT * FROM event_history WHERE user_id = ? ORDER BY fired_at DESC LIMIT 100')
    .all(userId) as EventHistoryRow[];
}

export function getLastEventFiredAt(userId: number, eventKey: string): number | null {
  const db = getDb();
  const row = db
    .prepare('SELECT fired_at FROM event_history WHERE user_id = ? AND event_key = ? ORDER BY fired_at DESC LIMIT 1')
    .get(userId, eventKey) as { fired_at: number } | undefined;
  return row?.fired_at ?? null;
}

export function hasEventFired(userId: number, eventKey: string): boolean {
  const db = getDb();
  const row = db
    .prepare('SELECT 1 FROM event_history WHERE user_id = ? AND event_key = ? LIMIT 1')
    .get(userId, eventKey);
  return row !== undefined;
}

export function insertEventHistory(
  userId: number,
  eventKey: string,
  choiceIndex: number,
  firedAt: number
): void {
  const db = getDb();
  db.prepare(
    'INSERT INTO event_history (user_id, event_key, choice_index, fired_at) VALUES (?, ?, ?, ?)'
  ).run(userId, eventKey, choiceIndex, firedAt);
}

export function getActiveEffects(userId: number): ActiveEffectRow[] {
  const db = getDb();
  const now = Math.floor(Date.now() / 1000);
  // Delete expired effects and return active ones
  db.prepare('DELETE FROM active_effects WHERE user_id = ? AND expires_at <= ?').run(userId, now);
  return db
    .prepare('SELECT * FROM active_effects WHERE user_id = ?')
    .all(userId) as ActiveEffectRow[];
}

export function insertActiveEffect(
  id: string,
  userId: number,
  eventKey: string,
  choiceIndex: number,
  effectType: string,
  resource: string | null,
  multiplier: number,
  startedAt: number,
  expiresAt: number
): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO active_effects (id, user_id, event_key, choice_index, effect_type, resource, multiplier, started_at, expires_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, userId, eventKey, choiceIndex, effectType, resource, multiplier, startedAt, expiresAt);
}

export function clearUserEvents(userId: number): void {
  const db = getDb();
  db.prepare('DELETE FROM event_history WHERE user_id = ?').run(userId);
  db.prepare('DELETE FROM active_effects WHERE user_id = ?').run(userId);
  db.prepare('DELETE FROM pending_event WHERE user_id = ?').run(userId);
}

export function getPendingEvent(userId: number): string | null {
  const db = getDb();
  const row = db
    .prepare('SELECT event_key FROM pending_event WHERE user_id = ?')
    .get(userId) as { event_key: string } | undefined;
  return row?.event_key ?? null;
}

export function setPendingEvent(userId: number, eventKey: string): void {
  const db = getDb();
  db.prepare(
    'INSERT OR REPLACE INTO pending_event (user_id, event_key) VALUES (?, ?)'
  ).run(userId, eventKey);
}

export function clearPendingEvent(userId: number): void {
  const db = getDb();
  db.prepare('DELETE FROM pending_event WHERE user_id = ?').run(userId);
}
