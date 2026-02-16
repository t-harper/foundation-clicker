import type { ShipState, TradeRouteState } from '@foundation/shared';
import { apiClient } from './client.js';

export async function getShips(): Promise<ShipState[]> {
  return apiClient.get<ShipState[]>('/ships');
}

export async function buildShip(shipType: string, name: string): Promise<ShipState> {
  return apiClient.post<ShipState>('/ships/build', {
    shipType,
    name,
  });
}

export async function sendShip(shipId: string, tradeRouteKey: string): Promise<ShipState> {
  return apiClient.post<ShipState>('/ships/send', {
    shipId,
    tradeRouteKey,
  });
}

export async function recallShip(shipId: string): Promise<ShipState> {
  return apiClient.post<ShipState>('/ships/recall', {
    shipId,
  });
}

export async function getTradeRoutes(): Promise<TradeRouteState[]> {
  return apiClient.get<TradeRouteState[]>('/trade-routes');
}

export async function unlockTradeRoute(routeKey: string): Promise<TradeRouteState> {
  return apiClient.post<TradeRouteState>('/trade-routes/unlock', {
    routeKey,
  });
}
