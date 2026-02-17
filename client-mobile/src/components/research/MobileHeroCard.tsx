import React from 'react';
import type { HeroState } from '@foundation/shared';
import { HERO_DEFINITIONS } from '@foundation/shared';

interface MobileHeroCardProps {
  heroState: HeroState;
  isBusy: boolean;
  assignedActivity?: string;
  isPreviousEra?: boolean;
  wasDiscovered?: boolean;
}

export function MobileHeroCard({
  heroState,
  isBusy,
  assignedActivity,
  isPreviousEra = false,
  wasDiscovered = false,
}: MobileHeroCardProps) {
  const def = HERO_DEFINITIONS[heroState.heroKey];
  if (!def) return null;

  const isUnlocked = heroState.unlockedAt !== null;
  const showDetails = isUnlocked || wasDiscovered;

  // Generate initials from name (first letter of first two words)
  const initials = showDetails
    ? def.name
        .split(' ')
        .slice(0, 2)
        .map((w) => w.charAt(0))
        .join('')
    : '?';

  // Status indicator
  let statusText: string | null = null;
  let statusColorClass = '';

  if (!isUnlocked && !wasDiscovered) {
    statusText = 'Locked';
    statusColorClass = 'text-[var(--era-text)]/30';
  } else if (!isUnlocked && wasDiscovered) {
    statusText = 'Previously discovered';
    statusColorClass = 'text-[var(--era-text)]/40';
  } else if (isPreviousEra) {
    statusText = 'Unavailable in current era';
    statusColorClass = 'text-[var(--era-text)]/30';
  } else if (isBusy && assignedActivity) {
    statusText = 'On assignment';
    statusColorClass = 'text-amber-400';
  } else if (isUnlocked && !isBusy && !isPreviousEra) {
    statusText = 'Idle';
    statusColorClass = 'text-green-400/70';
  }

  return (
    <div
      className={[
        'w-full p-3 rounded-lg border transition-colors flex items-center gap-3',
        !isUnlocked && wasDiscovered
          ? 'border-[var(--era-surface)]/20 bg-[var(--era-surface)]/10 opacity-50'
          : !isUnlocked
            ? 'border-[var(--era-surface)]/20 bg-[var(--era-surface)]/10 opacity-40'
            : isPreviousEra
              ? 'border-[var(--era-surface)]/20 bg-[var(--era-surface)]/10 opacity-50'
              : isBusy
                ? 'border-amber-500/30 bg-[var(--era-surface)]/30'
                : 'border-[var(--era-primary)]/20 bg-[var(--era-surface)]/30',
      ].join(' ')}
    >
      {/* Avatar circle with initials */}
      <div className={[
        'w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
        isUnlocked
          ? 'bg-[var(--era-accent)]/20 text-[var(--era-accent)]'
          : wasDiscovered
            ? 'bg-[var(--era-surface)]/30 text-[var(--era-text)]/40'
            : 'bg-[var(--era-surface)]/30 text-[var(--era-text)]/30',
      ].join(' ')}>
        {initials}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold text-[var(--era-text)] truncate">
            {showDetails ? def.name : '???'}
          </h4>
          {/* Specialization badge */}
          <span className={[
            'shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase',
            def.specialization === 'research'
              ? 'bg-blue-500/20 text-blue-400'
              : 'bg-orange-500/20 text-orange-400',
          ].join(' ')}>
            {def.specialization}
          </span>
        </div>

        {showDetails && (
          <p className="text-[11px] text-[var(--era-text)]/50 mt-0.5 truncate">{def.title}</p>
        )}

        {/* Status indicator */}
        {statusText && (
          <p className={`text-[11px] mt-0.5 ${statusColorClass}`}>
            {statusText}
          </p>
        )}
      </div>

      {/* Status dot indicator */}
      <div className="shrink-0">
        {isUnlocked && !isPreviousEra && (
          <div className={[
            'w-2.5 h-2.5 rounded-full',
            isBusy ? 'bg-amber-400' : 'bg-green-400/70',
          ].join(' ')} />
        )}
      </div>
    </div>
  );
}
