import React, { useEffect, useRef, useState, useCallback } from 'react';
import { EVENT_DEFINITIONS, ERA_DEFINITIONS } from '@foundation/shared';
import type { EventHistoryEntry, EventEffect } from '@foundation/shared';
import { getEventHistoryPage } from '@desktop/api/events';
import { formatTimeAgo, formatResource } from '@desktop/utils/format';

function effectDescription(effect: EventEffect): string {
  switch (effect.type) {
    case 'resourceGrant':
      return `+${formatResource(effect.amount)} ${effect.resource}`;
    case 'resourceLoss':
      return `-${formatResource(effect.amount)} ${effect.resource}`;
    case 'resourcePercentGrant':
      return `+${effect.percent}% ${effect.resource}`;
    case 'resourcePercentLoss':
      return `-${effect.percent}% ${effect.resource}`;
    case 'productionBuff':
      return `${effect.resource} production x${effect.multiplier} for ${Math.floor(effect.durationSeconds / 60)}m`;
    case 'productionDebuff':
      return `${effect.resource} production x${effect.multiplier} for ${Math.floor(effect.durationSeconds / 60)}m`;
    case 'globalProductionBuff':
      return `All production x${effect.multiplier} for ${Math.floor(effect.durationSeconds / 60)}m`;
    case 'globalProductionDebuff':
      return `All production x${effect.multiplier} for ${Math.floor(effect.durationSeconds / 60)}m`;
    case 'clickBuff':
      return `Click value x${effect.multiplier} for ${Math.floor(effect.durationSeconds / 60)}m`;
    case 'clickDebuff':
      return `Click value x${effect.multiplier} for ${Math.floor(effect.durationSeconds / 60)}m`;
    default:
      return '';
  }
}

function isPositiveEffect(effect: EventEffect): boolean {
  switch (effect.type) {
    case 'resourceGrant':
    case 'resourcePercentGrant':
    case 'productionBuff':
    case 'globalProductionBuff':
    case 'clickBuff':
      return true;
    default:
      return false;
  }
}

const PAGE_SIZE = 10;

function HistoryEntry({
  entry,
}: {
  entry: EventHistoryEntry;
}) {
  const [expanded, setExpanded] = useState(false);
  const def = EVENT_DEFINITIONS[entry.eventKey];
  if (!def) return null;

  const eraDef = ERA_DEFINITIONS[def.era];
  const chosenChoice = def.choices[entry.choiceIndex];

  return (
    <div className="border border-[var(--era-surface)] rounded-lg overflow-hidden bg-[var(--era-bg)]/60">
      {/* Tap to expand header */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full p-3 text-left active:bg-[var(--era-surface)]/20 transition-colors touch-action-manipulation"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
            <h3 className="font-semibold text-[var(--era-primary)] text-sm truncate">
              {def.name}
            </h3>
            <span
              className="text-[9px] px-1.5 py-0.5 rounded-full font-medium shrink-0"
              style={{
                backgroundColor: `${eraDef.themeColors.accent}20`,
                color: eraDef.themeColors.accent,
              }}
            >
              {eraDef.name}
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[var(--era-text)]/40 text-[10px] whitespace-nowrap">
              {formatTimeAgo(entry.firedAt * 1000)}
            </span>
            <span className="text-[var(--era-text)]/30 text-[10px]">
              {expanded ? '\u25B2' : '\u25BC'}
            </span>
          </div>
        </div>

        {/* Choice summary (always visible) */}
        {chosenChoice && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--era-accent)]/20 text-[var(--era-accent)] font-medium shrink-0">
              Chosen
            </span>
            <span className="text-xs text-[var(--era-text)]/60 truncate">
              {chosenChoice.label}
            </span>
          </div>
        )}
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-[var(--era-surface)]/50 px-3 py-2.5">
          {/* Description */}
          <p className="text-[var(--era-text)]/60 text-[11px] leading-relaxed mb-2.5">
            {def.description}
          </p>

          {/* All choices */}
          <div className="space-y-1.5">
            {def.choices.map((choice, choiceIdx) => {
              const isChosen = choiceIdx === entry.choiceIndex;
              return (
                <div
                  key={choiceIdx}
                  className={[
                    'p-2 rounded-md border text-sm',
                    isChosen
                      ? 'border-[var(--era-accent)]/50 bg-[var(--era-accent)]/10'
                      : 'border-[var(--era-surface)]/30 opacity-40',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {isChosen && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--era-accent)]/20 text-[var(--era-accent)] font-medium">
                        Chosen
                      </span>
                    )}
                    <span
                      className={`font-medium text-xs ${isChosen ? 'text-[var(--era-primary)]' : 'text-[var(--era-text)]/50'}`}
                    >
                      {choice.label}
                    </span>
                  </div>
                  <p
                    className={`text-[10px] mb-1 ${isChosen ? 'text-[var(--era-text)]/60' : 'text-[var(--era-text)]/30'}`}
                  >
                    {choice.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {choice.effects.map((effect, effectIdx) => (
                      <span
                        key={effectIdx}
                        className={`text-[9px] px-1.5 py-0.5 rounded ${
                          isPositiveEffect(effect)
                            ? 'bg-green-500/15 text-green-400'
                            : 'bg-red-500/15 text-red-400'
                        } ${!isChosen ? 'opacity-60' : ''}`}
                      >
                        {effectDescription(effect)}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function MobileEventHistoryPanel() {
  const [entries, setEntries] = useState<EventHistoryEntry[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const fetchPage = useCallback(
    async (currentCursor?: string) => {
      if (isLoading) return;
      setIsLoading(true);
      try {
        const result = await getEventHistoryPage(PAGE_SIZE, currentCursor);
        setEntries((prev) => [...prev, ...result.history]);
        setCursor(result.cursor);
        setHasMore(result.hasMore);
      } catch (err) {
        console.error('Failed to load event history:', err);
      } finally {
        setIsLoading(false);
        setInitialLoaded(true);
      }
    },
    [isLoading],
  );

  // Initial load
  useEffect(() => {
    fetchPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (observerEntries) => {
        if (
          observerEntries[0].isIntersecting &&
          hasMore &&
          !isLoading &&
          cursor
        ) {
          fetchPage(cursor);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoading, cursor, fetchPage]);

  // Empty state
  if (initialLoaded && entries.length === 0 && !isLoading) {
    return (
      <div className="space-y-4 pb-4">
        <h2 className="text-base font-display font-semibold text-[var(--era-primary)]">
          Event History
        </h2>
        <div className="flex flex-col items-center justify-center py-12 text-[var(--era-text)]/50">
          <p className="text-sm mb-1">No events yet</p>
          <p className="text-xs">
            Events will appear as you progress through the game.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-4">
      <h2 className="text-base font-display font-semibold text-[var(--era-primary)]">
        Event History
      </h2>

      <div className="space-y-2">
        {entries.map((entry, idx) => (
          <HistoryEntry
            key={`${entry.eventKey}-${entry.firedAt}-${idx}`}
            entry={entry}
          />
        ))}

        {/* Loading skeleton */}
        {isLoading && (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="border border-[var(--era-surface)]/30 rounded-lg p-3 animate-pulse"
              >
                <div className="h-3.5 w-40 bg-[var(--era-surface)]/30 rounded mb-1.5" />
                <div className="h-3 w-24 bg-[var(--era-surface)]/20 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Sentinel for infinite scroll */}
        {hasMore && <div ref={sentinelRef} className="h-4" />}
      </div>
    </div>
  );
}
