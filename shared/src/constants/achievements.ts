import { AchievementDefinition } from '../types/achievements.js';
import { Era } from '../types/eras.js';

export const ACHIEVEMENT_DEFINITIONS: Record<string, AchievementDefinition> = {
  // Credit milestones
  firstCredits: {
    key: 'firstCredits',
    name: 'First Steps',
    description: 'Earn your first 100 credits on Terminus.',
    condition: { type: 'resourceTotal', resource: 'credits', amount: 100 },
    icon: 'star',
  },
  thousandCredits: {
    key: 'thousandCredits',
    name: 'Getting Started',
    description: 'Earn 1,000 lifetime credits. The colony takes root.',
    condition: { type: 'resourceTotal', resource: 'credits', amount: 1000 },
    reward: { type: 'clickMultiplier', value: 1.1 },
    icon: 'star',
  },
  millionCredits: {
    key: 'millionCredits',
    name: 'Foundation Fortune',
    description: 'Earn 1,000,000 lifetime credits. Terminus prospers.',
    condition: { type: 'resourceTotal', resource: 'credits', amount: 1e6 },
    reward: { type: 'globalMultiplier', value: 1.05 },
    icon: 'star',
  },
  billionCredits: {
    key: 'billionCredits',
    name: 'Galactic Mogul',
    description: 'Earn 1,000,000,000 lifetime credits. The Periphery takes notice.',
    condition: { type: 'resourceTotal', resource: 'credits', amount: 1e9 },
    reward: { type: 'globalMultiplier', value: 1.1 },
    icon: 'star',
  },
  trillionCredits: {
    key: 'trillionCredits',
    name: 'Imperial Wealth',
    description: 'Earn 1,000,000,000,000 lifetime credits. Rivaling the old Empire.',
    condition: { type: 'resourceTotal', resource: 'credits', amount: 1e12 },
    reward: { type: 'globalMultiplier', value: 1.15 },
    icon: 'crown',
  },

  // Click milestones
  hundredClicks: {
    key: 'hundredClicks',
    name: 'Clicker',
    description: 'Click 100 times. Every action shapes the Plan.',
    condition: { type: 'totalClicks', count: 100 },
    icon: 'click',
  },
  thousandClicks: {
    key: 'thousandClicks',
    name: 'Dedicated Clicker',
    description: 'Click 1,000 times. The Foundation is built one click at a time.',
    condition: { type: 'totalClicks', count: 1000 },
    reward: { type: 'clickMultiplier', value: 1.2 },
    icon: 'click',
  },
  tenThousandClicks: {
    key: 'tenThousandClicks',
    name: 'Obsessive Clicker',
    description: 'Click 10,000 times. Seldon would be impressed.',
    condition: { type: 'totalClicks', count: 10000 },
    reward: { type: 'clickMultiplier', value: 1.5 },
    icon: 'click',
  },

  // Building milestones
  firstBuilding: {
    key: 'firstBuilding',
    name: 'Builder',
    description: 'Build your first structure on Terminus.',
    condition: { type: 'totalBuildings', count: 1 },
    icon: 'building',
  },
  tenBuildings: {
    key: 'tenBuildings',
    name: 'Architect',
    description: 'Own 10 buildings. The colony grows.',
    condition: { type: 'totalBuildings', count: 10 },
    reward: { type: 'globalMultiplier', value: 1.05 },
    icon: 'building',
  },
  fiftyBuildings: {
    key: 'fiftyBuildings',
    name: 'City Planner',
    description: 'Own 50 buildings. Terminus City takes shape.',
    condition: { type: 'totalBuildings', count: 50 },
    reward: { type: 'globalMultiplier', value: 1.1 },
    icon: 'building',
  },
  hundredBuildings: {
    key: 'hundredBuildings',
    name: 'Master Builder',
    description: 'Own 100 buildings. A civilization on the edge of the galaxy.',
    condition: { type: 'totalBuildings', count: 100 },
    reward: { type: 'globalMultiplier', value: 1.15 },
    icon: 'building',
  },

  // Prestige milestones
  firstPrestige: {
    key: 'firstPrestige',
    name: 'First Seldon Crisis',
    description: 'Survive your first Seldon Crisis. The Plan moves forward.',
    condition: { type: 'prestigeCount', count: 1 },
    icon: 'prestige',
  },
  fivePrestige: {
    key: 'fivePrestige',
    name: 'Crisis Manager',
    description: 'Survive 5 Seldon Crises. History bends to your will.',
    condition: { type: 'prestigeCount', count: 5 },
    reward: { type: 'globalMultiplier', value: 1.1 },
    icon: 'prestige',
  },
  tenPrestige: {
    key: 'tenPrestige',
    name: 'Seldon Heir',
    description: 'Survive 10 Seldon Crises. You are the Plan incarnate.',
    condition: { type: 'prestigeCount', count: 10 },
    reward: { type: 'globalMultiplier', value: 1.2 },
    icon: 'prestige',
  },

  // Era milestones
  reachEra1: {
    key: 'reachEra1',
    name: 'Trading Begins',
    description: 'Reach the Trading Expansion era. From religion to commerce.',
    condition: { type: 'eraReached', era: Era.TradingExpansion },
    icon: 'era',
  },
  reachEra2: {
    key: 'reachEra2',
    name: 'Mind Over Matter',
    description: 'Reach the Psychological Influence era. The Second Foundation awakens.',
    condition: { type: 'eraReached', era: Era.PsychologicalInfluence },
    icon: 'era',
  },
  reachEra3: {
    key: 'reachEra3',
    name: 'Galaxia Dawns',
    description: 'Reach the Galactic Reunification era. One galaxy, one mind.',
    condition: { type: 'eraReached', era: Era.GalacticReunification },
    icon: 'era',
  },

  // Special
  firstShip: {
    key: 'firstShip',
    name: 'Shipwright',
    description: 'Build your first ship. The Foundation takes to the stars.',
    condition: { type: 'shipCount', count: 1 },
    icon: 'ship',
  },
  tenShips: {
    key: 'tenShips',
    name: 'Fleet Commander',
    description: 'Own 10 ships. A fleet worthy of the Foundation.',
    condition: { type: 'shipCount', count: 10 },
    reward: { type: 'globalMultiplier', value: 1.1 },
    icon: 'ship',
  },
  playOneHour: {
    key: 'playOneHour',
    name: 'Dedicated',
    description: 'Play for 1 hour. The Plan unfolds in real time.',
    condition: { type: 'playTime', seconds: 3600 },
    icon: 'time',
  },
  playTenHours: {
    key: 'playTenHours',
    name: 'Devoted',
    description: 'Play for 10 hours. A true guardian of the Plan.',
    condition: { type: 'playTime', seconds: 36000 },
    reward: { type: 'globalMultiplier', value: 1.05 },
    icon: 'time',
  },
};

export const ALL_ACHIEVEMENT_KEYS = Object.keys(ACHIEVEMENT_DEFINITIONS);
