import { registerMigration } from '../migrate.js';

const up = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at INTEGER DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS game_state (
    user_id INTEGER PRIMARY KEY REFERENCES users(id),
    credits REAL DEFAULT 0,
    knowledge REAL DEFAULT 0,
    influence REAL DEFAULT 0,
    nuclear_tech REAL DEFAULT 0,
    raw_materials REAL DEFAULT 0,
    click_value REAL DEFAULT 1,
    current_era INTEGER DEFAULT 0,
    seldon_points REAL DEFAULT 0,
    total_seldon_points REAL DEFAULT 0,
    prestige_count INTEGER DEFAULT 0,
    prestige_multiplier REAL DEFAULT 1,
    last_tick_at INTEGER,
    total_play_time REAL DEFAULT 0,
    total_clicks INTEGER DEFAULT 0,
    lifetime_credits REAL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS buildings (
    user_id INTEGER REFERENCES users(id),
    building_key TEXT NOT NULL,
    count INTEGER DEFAULT 0,
    is_unlocked INTEGER DEFAULT 0,
    PRIMARY KEY(user_id, building_key)
  );

  CREATE TABLE IF NOT EXISTS upgrades (
    user_id INTEGER REFERENCES users(id),
    upgrade_key TEXT NOT NULL,
    is_purchased INTEGER DEFAULT 0,
    PRIMARY KEY(user_id, upgrade_key)
  );

  CREATE TABLE IF NOT EXISTS ships (
    id TEXT PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    ship_type TEXT NOT NULL,
    name TEXT NOT NULL,
    status TEXT DEFAULT 'docked',
    trade_route_id TEXT,
    departed_at INTEGER,
    returns_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS trade_routes (
    user_id INTEGER REFERENCES users(id),
    route_key TEXT NOT NULL,
    is_unlocked INTEGER DEFAULT 0,
    PRIMARY KEY(user_id, route_key)
  );

  CREATE TABLE IF NOT EXISTS achievements (
    user_id INTEGER REFERENCES users(id),
    achievement_key TEXT NOT NULL,
    unlocked_at INTEGER,
    PRIMARY KEY(user_id, achievement_key)
  );

  CREATE TABLE IF NOT EXISTS prestige_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES users(id),
    prestige_number INTEGER,
    credits_at_reset REAL,
    seldon_points_earned REAL,
    era_at_reset INTEGER,
    triggered_at INTEGER
  );
`;

registerMigration('001_initial_schema', up);

export default up;
