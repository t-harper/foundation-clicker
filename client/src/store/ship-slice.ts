import type { StateCreator } from 'zustand';
import type { ShipState, TradeRouteState, TradeRouteKey } from '@foundation/shared';
import type { StoreState } from './index.js';

export interface ShipSlice {
  // State
  ships: ShipState[];
  tradeRoutes: TradeRouteState[];

  // Actions
  setShips: (ships: ShipState[]) => void;
  addShip: (ship: ShipState) => void;
  updateShip: (ship: ShipState) => void;
  removeShip: (shipId: string) => void;
  setTradeRoutes: (routes: TradeRouteState[]) => void;
  unlockTradeRoute: (routeKey: TradeRouteKey) => void;
}

export const createShipSlice: StateCreator<StoreState, [], [], ShipSlice> = (set) => ({
  // Initial state
  ships: [],
  tradeRoutes: [],

  // Actions
  setShips: (ships) =>
    set({ ships }),

  addShip: (ship) =>
    set((state) => ({
      ships: [...state.ships, ship],
    })),

  updateShip: (ship) =>
    set((state) => ({
      ships: state.ships.map((s) =>
        s.id === ship.id ? ship : s
      ),
    })),

  removeShip: (shipId) =>
    set((state) => ({
      ships: state.ships.filter((s) => s.id !== shipId),
    })),

  setTradeRoutes: (routes) =>
    set({ tradeRoutes: routes }),

  unlockTradeRoute: (routeKey) =>
    set((state) => ({
      tradeRoutes: state.tradeRoutes.map((r) =>
        r.routeKey === routeKey ? { ...r, isUnlocked: true } : r
      ),
    })),
});
