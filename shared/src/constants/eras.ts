import { Era, EraDefinition } from '../types/eras.js';

export const ERA_DEFINITIONS: Record<Era, EraDefinition> = {
  [Era.ReligiousDominance]: {
    era: Era.ReligiousDominance,
    name: 'Religious Dominance',
    description: 'The Foundation uses technology-as-religion to dominate surrounding kingdoms.',
    unlockCondition: 'Starting era',
    themeColors: {
      primary: '#d4a574',
      secondary: '#f5e6d3',
      accent: '#c9952e',
      bg: '#1a1612',
      surface: '#2a2420',
      text: '#f5e6d3',
    },
  },
  [Era.TradingExpansion]: {
    era: Era.TradingExpansion,
    name: 'Trading Expansion',
    description: 'The Merchant Princes of the Foundation extend their trade network across the galaxy.',
    unlockCondition: 'First prestige (Seldon Crisis)',
    themeColors: {
      primary: '#2dd4bf',
      secondary: '#ccfbf1',
      accent: '#14b8a6',
      bg: '#0f1a1a',
      surface: '#1a2e2e',
      text: '#ccfbf1',
    },
  },
  [Era.PsychologicalInfluence]: {
    era: Era.PsychologicalInfluence,
    name: 'Psychological Influence',
    description: 'The Second Foundation guides humanity from the shadows through mentalic power.',
    unlockCondition: '100 Seldon Points',
    themeColors: {
      primary: '#a78bfa',
      secondary: '#ede9fe',
      accent: '#8b5cf6',
      bg: '#1a1625',
      surface: '#2a2440',
      text: '#ede9fe',
    },
  },
  [Era.GalacticReunification]: {
    era: Era.GalacticReunification,
    name: 'Galactic Reunification',
    description: 'The dream of Galaxia — a unified galactic consciousness — nears reality.',
    unlockCondition: '10,000 Seldon Points',
    themeColors: {
      primary: '#22d3ee',
      secondary: '#cffafe',
      accent: '#06b6d4',
      bg: '#0f1720',
      surface: '#1a2e40',
      text: '#cffafe',
    },
  },
};

export const ERA_UNLOCK_THRESHOLDS: Record<Era, { prestigeCount?: number; seldonPoints?: number }> = {
  [Era.ReligiousDominance]: {},
  [Era.TradingExpansion]: { prestigeCount: 1 },
  [Era.PsychologicalInfluence]: { seldonPoints: 100 },
  [Era.GalacticReunification]: { seldonPoints: 10000 },
};
