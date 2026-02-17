import React, { useMemo } from 'react';
import { useGameStore } from '../../store';
import { ACHIEVEMENT_DEFINITIONS } from '@foundation/shared';
import type { AchievementState } from '@foundation/shared';
import { AchievementCard } from './AchievementCard';

const ALL_KEYS = Object.keys(ACHIEVEMENT_DEFINITIONS);

export function AchievementPanel() {
  const achievements = useGameStore((s) => s.achievements);

  // Merge store data (unlocked only, sparse) with all definitions
  const allAchievements = useMemo(() => {
    const unlockedMap = new Map(
      achievements.map((a) => [a.achievementKey, a]),
    );
    return ALL_KEYS.map(
      (key): AchievementState =>
        unlockedMap.get(key) ?? { achievementKey: key, unlockedAt: null },
    );
  }, [achievements]);

  const unlockedCount = useMemo(
    () => allAchievements.filter((a) => a.unlockedAt !== null).length,
    [allAchievements],
  );

  // Sort: unlocked first (newest unlock first), then locked (definition order)
  const sortedAchievements = useMemo(() => {
    return [...allAchievements].sort((a, b) => {
      const aUnlocked = a.unlockedAt !== null;
      const bUnlocked = b.unlockedAt !== null;
      if (aUnlocked && !bUnlocked) return -1;
      if (!aUnlocked && bUnlocked) return 1;
      if (aUnlocked && bUnlocked) {
        return (b.unlockedAt ?? 0) - (a.unlockedAt ?? 0);
      }
      return 0;
    });
  }, [allAchievements]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-semibold text-[var(--era-primary)]">
          Achievements
        </h2>
        <span className="text-xs text-[var(--era-text)]/40">
          {unlockedCount} / {ALL_KEYS.length} unlocked
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 rounded-full bg-[var(--era-surface)] overflow-hidden">
        <div
          className="h-full rounded-full bg-[var(--era-accent)] transition-[width] duration-500"
          style={{
            width: `${(unlockedCount / ALL_KEYS.length) * 100}%`,
          }}
        />
      </div>

      {/* Achievement grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedAchievements.map((achievement) => (
          <AchievementCard
            key={achievement.achievementKey}
            achievementState={achievement}
          />
        ))}
      </div>
    </div>
  );
}
