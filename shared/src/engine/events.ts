import { EventCondition } from '../types/events.js';
import { GameState } from '../types/game-state.js';

export function isEventConditionMet(condition: EventCondition, state: GameState): boolean {
  switch (condition.type) {
    case 'buildingCount': {
      const building = state.buildings.find(b => b.buildingKey === condition.building);
      return (building?.count ?? 0) >= condition.count;
    }
    case 'totalBuildings': {
      const total = state.buildings.reduce((sum, b) => sum + b.count, 0);
      return total >= condition.count;
    }
    case 'resourceTotal':
      return state.resources[condition.resource] >= condition.amount;
    case 'eraReached':
      return state.currentEra >= condition.era;
    case 'prestigeCount':
      return state.prestige.prestigeCount >= condition.count;
    case 'totalClicks':
      return state.totalClicks >= condition.count;
    case 'shipCount':
      return state.ships.length >= condition.count;
    case 'playTime':
      return state.totalPlayTime >= condition.seconds;
    case 'upgradeOwned': {
      const upgrade = state.upgrades.find(u => u.upgradeKey === condition.upgrade);
      return upgrade?.isPurchased ?? false;
    }
    case 'lifetimeCredits':
      return state.lifetimeCredits >= condition.amount;
    default:
      return false;
  }
}

export function areAllConditionsMet(conditions: EventCondition[], state: GameState): boolean {
  return conditions.every(c => isEventConditionMet(c, state));
}
