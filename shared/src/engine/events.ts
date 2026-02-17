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
    case 'heroOwned': {
      const hero = state.heroes.find(h => h.heroKey === condition.hero);
      return hero?.unlockedAt != null;
    }
    case 'activityCompleted': {
      const activity = state.activities.find(a => a.activityKey === condition.activityKey);
      return (activity?.timesCompleted ?? 0) >= condition.count;
    }
    case 'eventChoiceMade': {
      return state.eventHistory.some(
        e => e.eventKey === condition.eventKey && e.choiceIndex === condition.choiceIndex
      );
    }
    case 'anyEventCompleted': {
      return condition.eventKeys.some(
        key => state.eventHistory.some(e => e.eventKey === key)
      );
    }
    default:
      return false;
  }
}

export function areAllConditionsMet(conditions: EventCondition[], state: GameState): boolean {
  return conditions.every(c => isEventConditionMet(c, state));
}
