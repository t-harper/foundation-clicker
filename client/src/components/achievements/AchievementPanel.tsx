import React, { useMemo } from 'react';
import { useGameStore } from '../../store';
import { ACHIEVEMENT_DEFINITIONS } from '@foundation/shared';
import { AchievementCard } from './AchievementCard';

export function AchievementPanel() {
  const achievements = useGameStore((s) => s.achievements);

  const unlockedCount = useMemo(
    () => achievements.filter((a) => a.unlockedAt !== null).length,
    [achievements],
  );

  // Sort: unlocked first, then locked
  const sortedAchievements = useMemo(() => {
    return [...achievements].sort((a, b) => {
      const aUnlocked = a.unlockedAt !== null;
      const bUnlocked = b.unlockedAt !== null;
      if (aUnlocked && !bUnlocked) return -1;
      if (!aUnlocked && bUnlocked) return 1;
      // Among unlocked, sort by unlock time (newest first)
      if (aUnlocked && bUnlocked) {
        return (b.unlockedAt ?? 0) - (a.unlockedAt ?? 0);
      }
      return 0;
    });
  }, [achievements]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-semibold text-[var(--era-primary)]">
          Achievements
        </h2>
        <span className="text-xs text-[var(--era-text)]/40">
          {unlockedCount} / {achievements.length} unlocked
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 rounded-full bg-[var(--era-surface)] overflow-hidden">
        <div
          className="h-full rounded-full bg-[var(--era-accent)] transition-[width] duration-500"
          style={{
            width: achievements.length > 0
              ? `${(unlockedCount / achievements.length) * 100}%`
              : '0%',
          }}
        />
      </div>

      {/* Achievement grid */}
      {sortedAchievements.length === 0 ? (
        <div className="text-center py-12 text-[var(--era-text)]/40">
          <p className="text-lg">No achievements to display.</p>
          <p className="text-sm mt-2">Start playing to unlock achievements!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedAchievements.map((achievement) => (
            <AchievementCard
              key={achievement.achievementKey}
              achievementState={achievement}
            />
          ))}
        </div>
      )}
    </div>
  );
}
