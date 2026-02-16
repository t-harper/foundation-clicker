export { getDocClient, TABLE_NAME } from './connection.js';
export { ensureTable } from './init-table.js';
export { queryItems, deleteItemsByPrefix, batchDeleteItems, userPK } from './dynamo-utils.js';

export * from './queries/user-queries.js';
export * from './queries/game-state-queries.js';
export * from './queries/building-queries.js';
export * from './queries/upgrade-queries.js';
export * from './queries/ship-queries.js';
export * from './queries/trade-route-queries.js';
export * from './queries/achievement-queries.js';
export * from './queries/prestige-queries.js';
export * from './queries/event-queries.js';
export * from './queries/hero-queries.js';
export * from './queries/activity-queries.js';
export * from './queries/inventory-queries.js';
