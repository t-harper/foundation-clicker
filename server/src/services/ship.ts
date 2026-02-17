import {
  ShipState,
  ShipType,
  TradeRouteKey,
  Resources,
  ResourceKey,
  EMPTY_RESOURCES,
  SHIP_DEFINITIONS,
  TRADE_ROUTE_DEFINITIONS,
  generateShipName,
} from '@foundation/shared';
import { canAfford, subtractCost } from '@foundation/shared';
import {
  getShips,
  createShip,
  updateShipStatus,
} from '../db/queries/ship-queries.js';
import { getTradeRoutes } from '../db/queries/trade-route-queries.js';
import { updateGameState } from '../db/queries/game-state-queries.js';
import {
  ValidationError,
  NotFoundError,
} from '../middleware/error-handler.js';
import { buildGameState, projectResources } from './game-state.js';

export async function getUserShips(userId: number): Promise<ShipState[]> {
  const shipRows = await getShips(userId);
  return shipRows.map((s) => ({
    id: s.id,
    shipType: s.ship_type as ShipType,
    name: s.name,
    status: s.status as ShipState['status'],
    tradeRouteId: s.trade_route_id,
    departedAt: s.departed_at,
    returnsAt: s.returns_at,
  }));
}

export async function buildShip(
  userId: number,
  shipType: ShipType,
  name: string
): Promise<ShipState> {
  const def = SHIP_DEFINITIONS[shipType];
  if (!def) {
    throw new ValidationError(`Invalid ship type: ${shipType}`);
  }

  const finalName = (name && typeof name === 'string' && name.trim().length > 0)
    ? name.trim()
    : generateShipName();

  if (finalName.length > 50) {
    throw new ValidationError('Ship name must be 50 characters or fewer');
  }

  const state = await buildGameState(userId);
  const projected = projectResources(state);

  if (!canAfford(projected.resources, def.buildCost)) {
    throw new ValidationError('Not enough resources to build this ship');
  }

  const newResources = subtractCost(projected.resources, def.buildCost);

  await updateGameState(userId, {
    credits: newResources.credits,
    knowledge: newResources.knowledge,
    influence: newResources.influence,
    nuclear_tech: newResources.nuclearTech,
    raw_materials: newResources.rawMaterials,
    last_tick_at: projected.lastTickAt,
    lifetime_credits: projected.lifetimeCredits,
  });

  const shipId = crypto.randomUUID();
  const shipRow = await createShip(userId, {
    id: shipId,
    shipType,
    name: finalName,
  });

  return {
    id: shipRow.id,
    shipType: shipRow.ship_type as ShipType,
    name: shipRow.name,
    status: shipRow.status as ShipState['status'],
    tradeRouteId: shipRow.trade_route_id,
    departedAt: shipRow.departed_at,
    returnsAt: shipRow.returns_at,
  };
}

export async function sendShip(
  userId: number,
  shipId: string,
  tradeRouteKey: TradeRouteKey
): Promise<ShipState> {
  if (!shipId) {
    throw new ValidationError('Ship ID is required');
  }

  const routeDef = TRADE_ROUTE_DEFINITIONS[tradeRouteKey];
  if (!routeDef) {
    throw new ValidationError(`Invalid trade route: ${tradeRouteKey}`);
  }

  const shipRows = await getShips(userId);
  const shipRow = shipRows.find((s) => s.id === shipId);
  if (!shipRow) {
    throw new NotFoundError('Ship not found');
  }

  if (shipRow.status !== 'docked') {
    throw new ValidationError('Ship must be docked to send on a trade route');
  }

  const tradeRouteRows = await getTradeRoutes(userId);
  const routeRow = tradeRouteRows.find((t) => t.route_key === tradeRouteKey);
  if (!routeRow || routeRow.is_unlocked !== 1) {
    throw new ValidationError(`Trade route ${tradeRouteKey} is not unlocked`);
  }

  if (shipRow.ship_type !== routeDef.requiredShipType) {
    throw new ValidationError(
      `This trade route requires a ${routeDef.requiredShipType}, but this ship is a ${shipRow.ship_type}`
    );
  }

  const now = Date.now();
  const returnsAt = now + routeDef.duration * 1000;

  await updateShipStatus(userId, shipId, 'trading', tradeRouteKey, now, returnsAt);

  return {
    id: shipRow.id,
    shipType: shipRow.ship_type as ShipType,
    name: shipRow.name,
    status: 'trading',
    tradeRouteId: tradeRouteKey,
    departedAt: now,
    returnsAt,
  };
}

export async function recallShip(userId: number, shipId: string): Promise<ShipState> {
  if (!shipId) {
    throw new ValidationError('Ship ID is required');
  }

  const shipRows = await getShips(userId);
  const shipRow = shipRows.find((s) => s.id === shipId);
  if (!shipRow) {
    throw new NotFoundError('Ship not found');
  }

  if (shipRow.status === 'docked') {
    throw new ValidationError('Ship is already docked');
  }

  await updateShipStatus(userId, shipId, 'docked', null, null, null);

  return {
    id: shipRow.id,
    shipType: shipRow.ship_type as ShipType,
    name: shipRow.name,
    status: 'docked',
    tradeRouteId: null,
    departedAt: null,
    returnsAt: null,
  };
}

/** Collect rewards from all ships that have completed their trade routes */
export async function collectCompletedShips(
  userId: number
): Promise<{ collectedRewards: Partial<Resources> | null; shipsCollected: number }> {
  const shipRows = await getShips(userId);
  const now = Date.now();

  const completedShips = shipRows.filter(
    (s) => s.status === 'trading' && s.returns_at && s.returns_at <= now && s.trade_route_id
  );

  if (completedShips.length === 0) {
    return { collectedRewards: null, shipsCollected: 0 };
  }

  // Accumulate rewards from all completed ships
  const totalRewards: Resources = { ...EMPTY_RESOURCES };
  for (const ship of completedShips) {
    const route = TRADE_ROUTE_DEFINITIONS[ship.trade_route_id!];
    if (!route) continue;

    for (const key of Object.keys(route.reward) as ResourceKey[]) {
      const amount = route.reward[key];
      if (amount) {
        totalRewards[key] += amount;
      }
    }

    // Dock the ship
    await updateShipStatus(userId, ship.id, 'docked', null, null, null);
  }

  // Apply rewards to player resources
  const state = await buildGameState(userId);
  const projected = projectResources(state);

  const newResources: Resources = { ...projected.resources };
  for (const key of Object.keys(totalRewards) as ResourceKey[]) {
    newResources[key] += totalRewards[key];
  }

  const creditReward = totalRewards.credits;
  await updateGameState(userId, {
    credits: newResources.credits,
    knowledge: newResources.knowledge,
    influence: newResources.influence,
    nuclear_tech: newResources.nuclearTech,
    raw_materials: newResources.rawMaterials,
    last_tick_at: projected.lastTickAt,
    lifetime_credits: projected.lifetimeCredits + creditReward,
  });

  return { collectedRewards: totalRewards, shipsCollected: completedShips.length };
}
