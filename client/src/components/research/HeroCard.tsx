import React from 'react';
import type { HeroState } from '@foundation/shared';
import { HERO_DEFINITIONS } from '@foundation/shared';

interface HeroCardProps {
  heroState: HeroState;
  isBusy: boolean;
  assignedActivity?: string;
  isPreviousEra?: boolean;
  wasDiscovered?: boolean;
}

export function HeroCard({ heroState, isBusy, assignedActivity, isPreviousEra = false, wasDiscovered = false }: HeroCardProps) {
  const def = HERO_DEFINITIONS[heroState.heroKey];
  if (!def) return null;

  const isUnlocked = heroState.unlockedAt !== null;
  const showDetails = isUnlocked || wasDiscovered;

  return (
    <div
      className={[
        'p-3 rounded-lg border transition-colors',
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
      <div className="flex items-start gap-3">
        {/* Avatar placeholder */}
        <div className={[
          'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
          isUnlocked
            ? 'bg-[var(--era-accent)]/20 text-[var(--era-accent)]'
            : wasDiscovered
              ? 'bg-[var(--era-surface)]/30 text-[var(--era-text)]/40'
              : 'bg-[var(--era-surface)]/30 text-[var(--era-text)]/30',
        ].join(' ')}>
          {showDetails ? def.name.charAt(0) : '?'}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-[var(--era-text)] truncate">
              {showDetails ? def.name : '???'}
            </h4>
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
            <>
              <p className="text-[11px] text-[var(--era-text)]/50 mt-0.5">{def.title}</p>
              <p className="text-[11px] text-[var(--era-text)]/40 mt-1 line-clamp-2">{def.description}</p>
            </>
          )}

          {!isUnlocked && !wasDiscovered && (
            <p className="text-[11px] text-[var(--era-text)]/30 mt-0.5 italic">
              Locked - complete a story event to unlock
            </p>
          )}

          {!isUnlocked && wasDiscovered && (
            <p className="text-[11px] text-[var(--era-text)]/30 mt-1 italic">
              Previously discovered - replay event to unlock
            </p>
          )}

          {isUnlocked && isPreviousEra && (
            <p className="text-[11px] text-[var(--era-text)]/30 mt-1 italic">
              Unavailable in current era
            </p>
          )}

          {isBusy && assignedActivity && !isPreviousEra && (
            <p className="text-[11px] text-amber-400 mt-1">
              Assigned to activity
            </p>
          )}

          {isUnlocked && !isBusy && !isPreviousEra && (
            <p className="text-[11px] text-green-400/70 mt-1">Idle</p>
          )}
        </div>
      </div>
    </div>
  );
}
