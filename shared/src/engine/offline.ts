import { GameState, Resources, ResourceKey, EMPTY_RESOURCES } from '../types/index.js';
import { calcProductionRates } from './calculator.js';
import { calcOfflineEarnings, MAX_OFFLINE_SECONDS, OFFLINE_MULTIPLIER } from '../constants/formulas.js';
import { TRADE_ROUTE_DEFINITIONS } from '../constants/ships.js';

/** Calculate offline earnings for a period of absence */
export function calculateOfflineEarnings(
  state: GameState,
  elapsedSeconds: number
): { earnings: Resources; cappedSeconds: number } {
  const rates = calcProductionRates(state);
  const cappedSeconds = Math.min(elapsedSeconds, MAX_OFFLINE_SECONDS);

  const earnings: Resources = { ...EMPTY_RESOURCES };
  for (const key of Object.keys(rates) as ResourceKey[]) {
    earnings[key] = rates[key] * cappedSeconds * OFFLINE_MULTIPLIER;
  }

  // Process trade ships that returned during offline period
  for (const ship of state.ships) {
    if (ship.status === 'trading' && ship.returnsAt && ship.tradeRouteId) {
      const route = TRADE_ROUTE_DEFINITIONS[ship.tradeRouteId];
      if (!route) continue;

      const now = state.lastTickAt + elapsedSeconds * 1000;
      if (ship.returnsAt <= now) {
        // Ship completed its route during offline time
        for (const [resource, amount] of Object.entries(route.reward)) {
          if (amount === undefined) continue;
          earnings[resource as ResourceKey] += amount;
        }
      }
    }
  }

  return { earnings, cappedSeconds };
}

/** Apply offline earnings to game state */
export function applyOfflineEarnings(state: GameState, earnings: Resources): GameState {
  const newResources = { ...state.resources };
  for (const key of Object.keys(earnings) as ResourceKey[]) {
    newResources[key] += earnings[key];
  }

  // Dock returned ships
  const now = Date.now();
  const updatedShips = state.ships.map(ship => {
    if (ship.status === 'trading' && ship.returnsAt && ship.returnsAt <= now) {
      return { ...ship, status: 'docked' as const, tradeRouteId: null, departedAt: null, returnsAt: null };
    }
    return ship;
  });

  return {
    ...state,
    resources: newResources,
    ships: updatedShips,
    lastTickAt: now,
  };
}
