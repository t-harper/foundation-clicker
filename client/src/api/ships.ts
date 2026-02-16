import type { ShipState, TradeRouteState } from '@foundation/shared';
import { wsManager } from '../ws';

export async function buildShip(shipType: string, name: string): Promise<ShipState> {
  return wsManager.send<ShipState>({ type: 'buildShip', shipType, name });
}

export async function sendShip(shipId: string, tradeRouteKey: string): Promise<ShipState> {
  return wsManager.send<ShipState>({ type: 'sendShip', shipId, tradeRouteKey });
}

export async function recallShip(shipId: string): Promise<ShipState> {
  return wsManager.send<ShipState>({ type: 'recallShip', shipId });
}

export async function unlockTradeRoute(routeKey: string): Promise<TradeRouteState> {
  return wsManager.send<TradeRouteState>({ type: 'unlockTradeRoute', routeKey });
}
