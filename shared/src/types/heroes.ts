import { Era } from './eras.js';

export type HeroKey = string;

export type HeroSpecialization = 'research' | 'mission';

export interface HeroDefinition {
  key: HeroKey;
  name: string;
  title: string;
  description: string;
  era: Era;
  specialization: HeroSpecialization;
  /** Duration multiplier when specialization matches activity type (e.g. 0.85 = 15% faster) */
  durationBonus: number;
}

export interface HeroState {
  heroKey: HeroKey;
  unlockedAt: number | null;
}
