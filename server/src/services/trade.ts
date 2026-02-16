import {
  TradeRouteState,
  TradeRouteKey,
  Resources,
  ResourceKey,
  TRADE_ROUTE_DEFINITIONS,
} from '@foundation/shared';
import { canAfford, subtractCost } from '@foundation/shared';
import {
  getTradeRoutes,
  unlockTradeRoute as dbUnlockTradeRoute,
} from '../db/queries/trade-route-queries.js';
import { updateGameState } from '../db/queries/game-state-queries.js';
import {
  ValidationError,
  NotFoundError,
} from '../middleware/error-handler.js';
import { buildGameState, projectResources } from './game-state.js';

export async function getUserTradeRoutes(userId: number): Promise<TradeRouteState[]> {
  const rows = await getTradeRoutes(userId);
  return rows.map((r) => ({
    routeKey: r.route_key,
    isUnlocked: r.is_unlocked === 1,
  }));
}

export async function unlockTradeRoute(
  userId: number,
  routeKey: TradeRouteKey
): Promise<TradeRouteState> {
  const def = TRADE_ROUTE_DEFINITIONS[routeKey];
  if (!def) {
    throw new ValidationError(`Invalid trade route: ${routeKey}`);
  }

  const rows = await getTradeRoutes(userId);
  const routeRow = rows.find((r) => r.route_key === routeKey);
  if (routeRow && routeRow.is_unlocked === 1) {
    throw new ValidationError(`Trade route ${routeKey} is already unlocked`);
  }

  const state = await buildGameState(userId);
  const projected = projectResources(state);

  if (!canAfford(projected.resources, def.unlockCost)) {
    throw new ValidationError('Not enough resources to unlock this trade route');
  }

  const newResources = subtractCost(projected.resources, def.unlockCost);

  await updateGameState(userId, {
    credits: newResources.credits,
    knowledge: newResources.knowledge,
    influence: newResources.influence,
    nuclear_tech: newResources.nuclearTech,
    raw_materials: newResources.rawMaterials,
    last_tick_at: projected.lastTickAt,
    lifetime_credits: projected.lifetimeCredits,
  });

  await dbUnlockTradeRoute(userId, routeKey);

  return {
    routeKey,
    isUnlocked: true,
  };
}
