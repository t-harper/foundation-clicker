import { HERO_DEFINITIONS, HeroState } from '@foundation/shared';
import { getUserHeroes, unlockHero as dbUnlockHero, hasHero } from '../db/queries/hero-queries.js';
import { ValidationError } from '../middleware/error-handler.js';

export function getHeroes(userId: number): HeroState[] {
  const rows = getUserHeroes(userId);
  const heroMap = new Map(rows.map((r) => [r.hero_key, r]));

  return Object.keys(HERO_DEFINITIONS).map((key) => {
    const row = heroMap.get(key);
    return {
      heroKey: key,
      unlockedAt: row?.unlocked_at ?? null,
    };
  });
}

export function unlockHero(userId: number, heroKey: string): void {
  const def = HERO_DEFINITIONS[heroKey];
  if (!def) {
    throw new ValidationError(`Invalid hero key: ${heroKey}`);
  }

  if (hasHero(userId, heroKey)) {
    return; // Already unlocked, no-op
  }

  const now = Math.floor(Date.now() / 1000);
  dbUnlockHero(userId, heroKey, now);
}
