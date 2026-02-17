import React, { useEffect, useRef, useState, useCallback } from 'react';
import { EVENT_DEFINITIONS, ERA_DEFINITIONS } from '@foundation/shared';
import type { EventHistoryEntry, EventEffect } from '@foundation/shared';
import { getEventHistoryPage } from '../../api/events';
import { formatTimeAgo, formatResource } from '../../utils/format';

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

export function EventHistoryPanel() {
  const [entries, setEntries] = useState<EventHistoryEntry[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const fetchPage = useCallback(async (currentCursor?: string) => {
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
  }, [isLoading]);

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
        if (observerEntries[0].isIntersecting && hasMore && !isLoading && cursor) {
          fetchPage(cursor);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoading, cursor, fetchPage]);

  // Empty state
  if (initialLoaded && entries.length === 0 && !isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-display font-semibold text-[var(--era-primary)]">
          Event History
        </h2>
        <div className="flex flex-col items-center justify-center py-16 text-[var(--era-text)]/50">
          <p className="text-lg mb-2">No events yet</p>
          <p className="text-sm">Events will appear as you progress through the game.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-display font-semibold text-[var(--era-primary)]">
        Event History
      </h2>

      <div className="space-y-3">
        {entries.map((entry, idx) => {
          const def = EVENT_DEFINITIONS[entry.eventKey];
          if (!def) return null;

          const eraDef = ERA_DEFINITIONS[def.era];

          return (
            <div
              key={`${entry.eventKey}-${entry.firedAt}-${idx}`}
              className="border border-[var(--era-surface)] rounded-lg p-4 bg-[var(--era-bg)]/60"
            >
              {/* Header: name + era badge + timestamp */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-[var(--era-primary)] text-sm">
                    {def.name}
                  </h3>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                    style={{
                      backgroundColor: `${eraDef.themeColors.accent}20`,
                      color: eraDef.themeColors.accent,
                    }}
                  >
                    {eraDef.name}
                  </span>
                </div>
                <span className="text-[var(--era-text)]/40 text-xs whitespace-nowrap">
                  {formatTimeAgo(entry.firedAt * 1000)}
                </span>
              </div>

              {/* Description */}
              <p className="text-[var(--era-text)]/60 text-xs leading-relaxed mb-3">
                {def.description}
              </p>

              {/* Choices */}
              <div className="space-y-2">
                {def.choices.map((choice, choiceIdx) => {
                  const isChosen = choiceIdx === entry.choiceIndex;
                  return (
                    <div
                      key={choiceIdx}
                      className={[
                        'p-2.5 rounded-md border text-sm transition-colors',
                        isChosen
                          ? 'border-[var(--era-accent)]/50 bg-[var(--era-accent)]/10'
                          : 'border-[var(--era-surface)]/30 opacity-40',
                      ].join(' ')}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {isChosen && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--era-accent)]/20 text-[var(--era-accent)] font-medium">
                            Chosen
                          </span>
                        )}
                        <span className={`font-medium text-xs ${isChosen ? 'text-[var(--era-primary)]' : 'text-[var(--era-text)]/50'}`}>
                          {choice.label}
                        </span>
                      </div>
                      <p className={`text-[11px] mb-1.5 ${isChosen ? 'text-[var(--era-text)]/60' : 'text-[var(--era-text)]/30'}`}>
                        {choice.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {choice.effects.map((effect, effectIdx) => (
                          <span
                            key={effectIdx}
                            className={`text-[10px] px-1.5 py-0.5 rounded ${
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
          );
        })}

        {/* Loading skeleton */}
        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="border border-[var(--era-surface)]/30 rounded-lg p-4 animate-pulse">
                <div className="h-4 w-48 bg-[var(--era-surface)]/30 rounded mb-2" />
                <div className="h-3 w-full bg-[var(--era-surface)]/20 rounded mb-3" />
                <div className="space-y-2">
                  <div className="h-16 bg-[var(--era-surface)]/10 rounded" />
                  <div className="h-16 bg-[var(--era-surface)]/10 rounded" />
                </div>
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
