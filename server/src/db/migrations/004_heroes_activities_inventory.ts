import { registerMigration } from '../migrate.js';

const up = `
  CREATE TABLE IF NOT EXISTS heroes (
    user_id INTEGER NOT NULL REFERENCES users(id),
    hero_key TEXT NOT NULL,
    unlocked_at INTEGER NOT NULL,
    PRIMARY KEY (user_id, hero_key)
  );

  CREATE TABLE IF NOT EXISTS activities (
    user_id INTEGER NOT NULL REFERENCES users(id),
    activity_key TEXT NOT NULL,
    times_completed INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id, activity_key)
  );

  CREATE TABLE IF NOT EXISTS active_activities (
    user_id INTEGER NOT NULL REFERENCES users(id),
    activity_key TEXT NOT NULL,
    hero_key TEXT NOT NULL,
    started_at INTEGER NOT NULL,
    completes_at INTEGER NOT NULL,
    PRIMARY KEY (user_id, activity_key)
  );

  CREATE TABLE IF NOT EXISTS inventory (
    user_id INTEGER NOT NULL REFERENCES users(id),
    item_key TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id, item_key)
  );

  CREATE TABLE IF NOT EXISTS active_consumable (
    user_id INTEGER PRIMARY KEY REFERENCES users(id),
    item_key TEXT NOT NULL,
    started_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL
  );
`;

registerMigration('004_heroes_activities_inventory', up);

export default up;
