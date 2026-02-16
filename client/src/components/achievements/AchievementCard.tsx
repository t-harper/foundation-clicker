import React from 'react';
import type { AchievementState, AchievementDefinition } from '@foundation/shared';
import { ACHIEVEMENT_DEFINITIONS } from '@foundation/shared';
import { StarIcon, TimeIcon, ClickIcon } from '../../assets/svg/icons';

interface AchievementCardProps {
  achievementState: AchievementState;
}

function getAchievementIcon(icon: string): React.ReactNode {
  switch (icon) {
    case 'star':
    case 'crown':
      return <StarIcon className="w-6 h-6" />;
    case 'click':
      return <ClickIcon className="w-6 h-6" />;
    case 'time':
      return <TimeIcon className="w-6 h-6" />;
    default:
      return <StarIcon className="w-6 h-6" />;
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

export function AchievementCard({ achievementState }: AchievementCardProps) {
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
        'flex flex-col items-center text-center p-4 rounded-lg border transition-all',
        isUnlocked
          ? 'border-[var(--era-accent)]/30 bg-[var(--era-accent)]/5 hover:bg-[var(--era-accent)]/10'
          : 'border-[var(--era-surface)] bg-[var(--era-surface)]/20 opacity-50',
      ].join(' ')}
    >
      {/* Icon */}
      <div
        className={[
          'w-12 h-12 rounded-full flex items-center justify-center mb-3',
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
            className="w-6 h-6"
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

      {/* Name */}
      <h4 className={[
        'text-sm font-semibold mb-1',
        isUnlocked ? 'text-[var(--era-text)]' : 'text-[var(--era-text)]/40',
      ].join(' ')}>
        {isUnlocked ? definition.name : '???'}
      </h4>

      {/* Description */}
      <p className="text-xs text-[var(--era-text)]/50 mb-2 line-clamp-2">
        {isUnlocked ? definition.description : '???'}
      </p>

      {/* Reward */}
      {rewardText && (
        <span
          className={[
            'text-[10px] px-2 py-0.5 rounded-full mb-1',
            isUnlocked
              ? 'bg-[var(--era-accent)]/15 text-[var(--era-accent)]'
              : 'bg-[var(--era-surface)] text-[var(--era-text)]/20',
          ].join(' ')}
        >
          {isUnlocked ? rewardText : 'Hidden reward'}
        </span>
      )}

      {/* Unlock date */}
      {isUnlocked && unlockDate && (
        <span className="text-[10px] text-[var(--era-text)]/30 mt-1">
          Unlocked {unlockDate}
        </span>
      )}
    </div>
  );
}
