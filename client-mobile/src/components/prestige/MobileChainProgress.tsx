import React, { useState } from 'react';
import { useGameStore } from '@desktop/store';
import {
  EVENT_CHAIN_DEFINITIONS,
  EVENT_DEFINITIONS,
  ERA_DEFINITIONS,
  ERA_SELDON_THRESHOLDS,
} from '@foundation/shared';
import type { EventChainDefinition } from '@foundation/shared';
import { ProgressBar } from '@desktop/components/common';
import { formatNumber } from '@desktop/utils/format';

function ChainAccordion({ chain }: { chain: EventChainDefinition }) {
  const [expanded, setExpanded] = useState(false);
  const eventHistory = useGameStore((s) => s.eventHistory);
  const lifetimeCredits = useGameStore((s) => s.lifetimeCredits);
  const currentEra = useGameStore((s) => s.currentEra);
  const achievements = useGameStore((s) => s.achievements);

  const completedKeys = new Set(eventHistory.map((e) => e.eventKey));
  const completedCount = chain.eventKeys.filter((k) => completedKeys.has(k)).length;
  const isComplete = completedCount === chain.eventKeys.length;
  const isLocked = currentEra < chain.era;

  const eraName = ERA_DEFINITIONS[chain.era]?.name ?? `Era ${chain.era}`;
  const threshold =
    ERA_SELDON_THRESHOLDS[chain.era] ??
    ERA_SELDON_THRESHOLDS[ERA_SELDON_THRESHOLDS.length - 1];

  // Find next milestone
  let nextMilestone: number | null = null;
  if (!isComplete && !isLocked) {
    for (let i = 0; i < chain.eventKeys.length; i++) {
      if (!completedKeys.has(chain.eventKeys[i])) {
        nextMilestone = threshold * ((i + 1) / chain.eventKeys.length);
        break;
      }
    }
  }

  const achievement = achievements.find(
    (a) => a.achievementKey === chain.achievementKey,
  );
  const achievementUnlocked = achievement?.unlockedAt != null;

  return (
    <div className="rounded-lg border border-[var(--era-primary)]/15 bg-[var(--era-surface)]/20 overflow-hidden">
      {/* Accordion header */}
      <button
        type="button"
        className="w-full p-3 text-left flex items-center gap-2 active:bg-[var(--era-surface)]/30 transition-colors touch-action-manipulation"
        onClick={() => !isLocked && setExpanded(!expanded)}
        disabled={isLocked}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
            <h4 className="text-sm font-display font-semibold text-[var(--era-primary)] truncate">
              {chain.name}
            </h4>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--era-primary)]/15 text-[var(--era-primary)]/70 shrink-0">
              {eraName}
            </span>
            {isComplete && (
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-500/15 text-green-400 shrink-0">
                Complete
              </span>
            )}
            {isLocked && (
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--era-text)]/10 text-[var(--era-text)]/30 shrink-0">
                Locked
              </span>
            )}
          </div>
          <p className="text-[11px] text-[var(--era-text)]/40 line-clamp-1">
            {chain.description}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs tabular-nums text-[var(--era-text)]/60">
            {completedCount}/{chain.eventKeys.length}
          </span>
          {!isLocked && (
            <span className="text-[var(--era-text)]/30 text-[10px]">
              {expanded ? '\u25B2' : '\u25BC'}
            </span>
          )}
        </div>
      </button>

      {/* Progress bar */}
      <div className="px-3 pb-2">
        <ProgressBar
          value={completedCount}
          max={chain.eventKeys.length}
          size="sm"
          color={isComplete ? '#22c55e' : undefined}
        />
        {nextMilestone != null && !isComplete && (
          <p className="text-[10px] text-[var(--era-text)]/30 mt-1">
            Next: {formatNumber(nextMilestone, 'short')} lifetime credits
            {lifetimeCredits < nextMilestone && (
              <span className="ml-1">
                ({formatNumber(lifetimeCredits, 'short')} /{' '}
                {formatNumber(nextMilestone, 'short')})
              </span>
            )}
          </p>
        )}
        {isComplete && achievementUnlocked && (
          <p className="text-[10px] text-green-400/60 mt-1">
            Achievement unlocked: {chain.name}
          </p>
        )}
      </div>

      {/* Expanded event list */}
      {expanded && !isLocked && (
        <div className="border-t border-[var(--era-primary)]/10 px-3 py-2 space-y-2">
          {chain.eventKeys.map((eventKey, i) => {
            const def = EVENT_DEFINITIONS[eventKey];
            if (!def) return null;

            const historyEntry = eventHistory.find(
              (e) => e.eventKey === eventKey,
            );
            const isEventComplete = historyEntry != null;
            const milestone = threshold * ((i + 1) / chain.eventKeys.length);

            return (
              <div
                key={eventKey}
                className={`rounded-md p-2.5 border ${
                  isEventComplete
                    ? 'border-[var(--era-accent)]/20 bg-[var(--era-accent)]/5'
                    : 'border-[var(--era-text)]/5 bg-[var(--era-surface)]/10 opacity-50'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="w-4 h-4 flex items-center justify-center rounded-full bg-[var(--era-primary)]/15 text-[var(--era-primary)] text-[9px] font-bold tabular-nums shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-xs font-medium text-[var(--era-text)]/80 truncate">
                    {def.name}
                  </span>
                  <span className="text-[9px] text-[var(--era-text)]/30 shrink-0 ml-auto tabular-nums">
                    {formatNumber(milestone, 'short')}
                  </span>
                </div>

                {isEventComplete && (
                  <>
                    <p className="text-[11px] text-[var(--era-text)]/50 mt-1.5 leading-relaxed">
                      {def.description}
                    </p>

                    <div className="mt-1.5 space-y-1">
                      {def.choices.map((choice, ci) => {
                        const wasChosen = historyEntry.choiceIndex === ci;
                        return (
                          <div
                            key={ci}
                            className={`text-[11px] px-2 py-0.5 rounded ${
                              wasChosen
                                ? 'bg-[var(--era-accent)]/10 text-[var(--era-accent)]/80 border border-[var(--era-accent)]/20'
                                : 'text-[var(--era-text)]/20'
                            }`}
                          >
                            <span className="font-medium">{choice.label}</span>
                            {wasChosen && (
                              <span className="ml-1 text-[9px]">(chosen)</span>
                            )}
                            {wasChosen && choice.effects.length > 0 && (
                              <span className="ml-1.5 text-[9px] text-[var(--era-text)]/30">
                                {choice.effects
                                  .map((eff) => {
                                    if (eff.type === 'resourceGrant')
                                      return `+${formatNumber(eff.amount, 'short')} ${eff.resource}`;
                                    if (eff.type === 'resourceLoss')
                                      return `-${formatNumber(eff.amount, 'short')} ${eff.resource}`;
                                    if (eff.type === 'productionBuff')
                                      return `${eff.multiplier}x ${eff.resource} (${eff.durationSeconds}s)`;
                                    if (eff.type === 'globalProductionBuff')
                                      return `${eff.multiplier}x all (${eff.durationSeconds}s)`;
                                    if (eff.type === 'clickBuff')
                                      return `${eff.multiplier}x click (${eff.durationSeconds}s)`;
                                    return '';
                                  })
                                  .filter(Boolean)
                                  .join(', ')}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {!isEventComplete && (
                  <p className="text-[10px] text-[var(--era-text)]/20 mt-1 italic">
                    Reach {formatNumber(milestone, 'short')} lifetime credits to
                    unlock
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function MobileChainProgress() {
  return (
    <div>
      <h3 className="text-sm font-display font-semibold text-[var(--era-primary)] mb-2">
        Era Chronicles
      </h3>
      <p className="text-[11px] text-[var(--era-text)]/40 mb-3">
        Story-driven event chains that unfold as you accumulate lifetime credits.
        Complete a chronicle to earn a permanent achievement bonus.
      </p>
      <div className="space-y-2">
        {EVENT_CHAIN_DEFINITIONS.map((chain) => (
          <ChainAccordion key={chain.chainKey} chain={chain} />
        ))}
      </div>
    </div>
  );
}
