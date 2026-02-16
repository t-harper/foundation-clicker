import {
  ShipState,
  ShipType,
  TradeRouteKey,
  Resources,
  ResourceKey,
  SHIP_DEFINITIONS,
  TRADE_ROUTE_DEFINITIONS,
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

export function getUserShips(userId: number): ShipState[] {
  const shipRows = getShips(userId);
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

export function buildShip(
  userId: number,
  shipType: ShipType,
  name: string
): ShipState {
  const def = SHIP_DEFINITIONS[shipType];
  if (!def) {
    throw new ValidationError(`Invalid ship type: ${shipType}`);
  }

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new ValidationError('Ship name is required');
  }

  if (name.trim().length > 50) {
    throw new ValidationError('Ship name must be 50 characters or fewer');
  }

  const state = buildGameState(userId);
  const projected = projectResources(state);

  // Check affordability against projected resources
  if (!canAfford(projected.resources, def.buildCost)) {
    throw new ValidationError('Not enough resources to build this ship');
  }

  // Subtract cost from projected resources
  const newResources = subtractCost(projected.resources, def.buildCost);

  // Update resources in DB with projected values
  updateGameState(userId, {
    credits: newResources.credits,
    knowledge: newResources.knowledge,
    influence: newResources.influence,
    nuclear_tech: newResources.nuclearTech,
    raw_materials: newResources.rawMaterials,
    last_tick_at: projected.lastTickAt,
    lifetime_credits: projected.lifetimeCredits,
  });

  // Create ship with UUID
  const shipId = crypto.randomUUID();
  const shipRow = createShip(userId, {
    id: shipId,
    shipType,
    name: name.trim(),
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

export function sendShip(
  userId: number,
  shipId: string,
  tradeRouteKey: TradeRouteKey
): ShipState {
  if (!shipId) {
    throw new ValidationError('Ship ID is required');
  }

  const routeDef = TRADE_ROUTE_DEFINITIONS[tradeRouteKey];
  if (!routeDef) {
    throw new ValidationError(`Invalid trade route: ${tradeRouteKey}`);
  }

  // Verify ship belongs to user and is docked
  const shipRows = getShips(userId);
  const shipRow = shipRows.find((s) => s.id === shipId);
  if (!shipRow) {
    throw new NotFoundError('Ship not found');
  }

  if (shipRow.status !== 'docked') {
    throw new ValidationError('Ship must be docked to send on a trade route');
  }

  // Verify the trade route is unlocked
  const tradeRouteRows = getTradeRoutes(userId);
  const routeRow = tradeRouteRows.find((t) => t.route_key === tradeRouteKey);
  if (!routeRow || routeRow.is_unlocked !== 1) {
    throw new ValidationError(`Trade route ${tradeRouteKey} is not unlocked`);
  }

  // Check ship type matches route requirement
  if (shipRow.ship_type !== routeDef.requiredShipType) {
    throw new ValidationError(
      `This trade route requires a ${routeDef.requiredShipType}, but this ship is a ${shipRow.ship_type}`
    );
  }

  // Set departure and return times
  const now = Date.now();
  const returnsAt = now + routeDef.duration * 1000;

  updateShipStatus(shipId, 'trading', tradeRouteKey, now, returnsAt);

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

export function recallShip(userId: number, shipId: string): ShipState {
  if (!shipId) {
    throw new ValidationError('Ship ID is required');
  }

  // Verify ship belongs to user
  const shipRows = getShips(userId);
  const shipRow = shipRows.find((s) => s.id === shipId);
  if (!shipRow) {
    throw new NotFoundError('Ship not found');
  }

  if (shipRow.status === 'docked') {
    throw new ValidationError('Ship is already docked');
  }

  updateShipStatus(shipId, 'docked', null, null, null);

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
