import { registerMigration } from '../migrate.js';

const up = `
  CREATE TABLE IF NOT EXISTS event_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES users(id),
    event_key TEXT NOT NULL,
    choice_index INTEGER NOT NULL,
    fired_at INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_event_history_user ON event_history(user_id, event_key);

  CREATE TABLE IF NOT EXISTS active_effects (
    id TEXT PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    event_key TEXT NOT NULL,
    choice_index INTEGER NOT NULL,
    effect_type TEXT NOT NULL,
    resource TEXT,
    multiplier REAL NOT NULL,
    started_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_active_effects_user ON active_effects(user_id, expires_at);
`;

registerMigration('002_events', up);

export default up;
