import { GameState, Resources, ResourceKey, EMPTY_RESOURCES } from '../types/index.js';
import { calcProductionRates } from './calculator.js';
import { TRADE_ROUTE_DEFINITIONS } from '../constants/ships.js';

/** Apply a single tick of production to game state. Returns new resources. */
export function tick(state: GameState, deltaSeconds: number): Resources {
  const rates = calcProductionRates(state);
  const newResources: Resources = { ...state.resources };

  for (const key of Object.keys(rates) as ResourceKey[]) {
    newResources[key] += rates[key] * deltaSeconds;
  }

  return newResources;
}

/** Apply click earnings to game state */
export function applyClick(state: GameState, clickValue: number, clicks: number = 1, bonusResources?: Partial<Resources>): Resources {
  const newResources = { ...state.resources };
  newResources.credits += clickValue * clicks;
  if (bonusResources) {
    for (const key of Object.keys(bonusResources) as ResourceKey[]) {
      const amount = bonusResources[key];
      if (amount) {
        newResources[key] += amount * clicks;
      }
    }
  }
  return newResources;
}

/** Process returning trade ships and collect rewards */
export function processTradeShips(state: GameState, now: number): {
  resources: Resources;
  updatedShips: typeof state.ships;
  anyChanged: boolean;
} {
  const resources = { ...state.resources };
  let anyChanged = false;
  const updatedShips = state.ships.map(ship => {
    if (ship.status === 'trading' && ship.returnsAt && now >= ship.returnsAt) {
      anyChanged = true;

      // Apply trade route rewards
      if (ship.tradeRouteId) {
        const route = TRADE_ROUTE_DEFINITIONS[ship.tradeRouteId];
        if (route) {
          for (const key of Object.keys(route.reward) as ResourceKey[]) {
            const amount = route.reward[key];
            if (amount) {
              resources[key] += amount;
            }
          }
        }
      }

      return { ...ship, status: 'docked' as const, tradeRouteId: null, departedAt: null, returnsAt: null };
    }
    return ship;
  });

  return { resources, updatedShips, anyChanged };
}
