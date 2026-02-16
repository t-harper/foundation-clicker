export { getDb, closeDb } from './connection.js';
export { runMigrations, registerMigration } from './migrate.js';

// Import migrations to register them
import './migrations/001_initial_schema.js';
import './migrations/002_events.js';
import './migrations/003_pending_event.js';

export * from './queries/user-queries.js';
export * from './queries/game-state-queries.js';
export * from './queries/building-queries.js';
export * from './queries/upgrade-queries.js';
export * from './queries/ship-queries.js';
export * from './queries/trade-route-queries.js';
export * from './queries/achievement-queries.js';
export * from './queries/prestige-queries.js';
export * from './queries/event-queries.js';
