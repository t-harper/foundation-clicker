import React from 'react';
import type { AchievementState, AchievementDefinition } from '@foundation/shared';
import { ACHIEVEMENT_DEFINITIONS } from '@foundation/shared';
import { StarIcon, TimeIcon, ClickIcon } from '@desktop/assets/svg/icons';

interface MobileAchievementCardProps {
  achievementState: AchievementState;
}

function getAchievementIcon(icon: string): React.ReactNode {
  switch (icon) {
    case 'star':
    case 'crown':
      return <StarIcon className="w-5 h-5" />;
    case 'click':
      return <ClickIcon className="w-5 h-5" />;
    case 'time':
      return <TimeIcon className="w-5 h-5" />;
    default:
      return <StarIcon className="w-5 h-5" />;
  }
}

function formatReward(reward: AchievementDefinition['reward']): string | null {
  if (!reward) return null;
  switch (reward.type) {
    case 'globalMultiplier':
      return `All production x${reward.value}`;
    case 'clickMultiplier':
      return `Click value x${reward.value}`;
    case 'resourceMultiplier':
      return `${reward.resource ?? ''} production x${reward.value}`;
  }
}

export function MobileAchievementCard({
  achievementState,
}: MobileAchievementCardProps) {
  const definition = ACHIEVEMENT_DEFINITIONS[achievementState.achievementKey];
  if (!definition) return null;

  const isUnlocked = achievementState.unlockedAt !== null;
  const rewardText = formatReward(definition.reward);
  const unlockDate = isUnlocked
    ? new Date(achievementState.unlockedAt!).toLocaleDateString()
    : null;

  return (
    <div
      className={[
        'flex items-start gap-3 p-3 rounded-lg border transition-colors',
        isUnlocked
          ? 'border-[var(--era-accent)]/30 bg-[var(--era-accent)]/5'
          : 'border-[var(--era-surface)] bg-[var(--era-surface)]/20 opacity-50',
      ].join(' ')}
    >
      {/* Icon */}
      <div
        className={[
          'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
          isUnlocked
            ? 'bg-[var(--era-accent)]/20 text-[var(--era-accent)]'
            : 'bg-[var(--era-surface)] text-[var(--era-text)]/20',
        ].join(' ')}
      >
        {isUnlocked ? (
          getAchievementIcon(definition.icon)
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4
          className={[
            'text-sm font-semibold',
            isUnlocked
              ? 'text-[var(--era-text)]'
              : 'text-[var(--era-text)]/40',
          ].join(' ')}
        >
          {isUnlocked ? definition.name : '???'}
        </h4>

        <p className="text-[11px] text-[var(--era-text)]/50 mt-0.5 line-clamp-2">
          {isUnlocked ? definition.description : '???'}
        </p>

        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          {rewardText && (
            <span
              className={[
                'text-[10px] px-2 py-0.5 rounded-full',
                isUnlocked
                  ? 'bg-[var(--era-accent)]/15 text-[var(--era-accent)]'
                  : 'bg-[var(--era-surface)] text-[var(--era-text)]/20',
              ].join(' ')}
            >
              {isUnlocked ? rewardText : 'Hidden reward'}
            </span>
          )}

          {isUnlocked && unlockDate && (
            <span className="text-[10px] text-[var(--era-text)]/30">
              Unlocked {unlockDate}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
