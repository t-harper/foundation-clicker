import React, { useState, useEffect, useRef } from 'react';
import { getLeaderboard } from '@desktop/api/leaderboard';
import { formatNumber } from '@desktop/utils/format';
import { ERA_DEFINITIONS } from '@foundation/shared';
import type { LeaderboardCategory, GetLeaderboardResponse } from '@foundation/shared';

const CATEGORIES: { key: LeaderboardCategory; label: string }[] = [
  { key: 'lifetimeCredits', label: 'Credits' },
  { key: 'totalSeldonPoints', label: 'Seldon Pts' },
  { key: 'prestigeCount', label: 'Prestige' },
  { key: 'currentEra', label: 'Era' },
  { key: 'totalAchievements', label: 'Achievements' },
];

export function MobileLeaderboardPanel() {
  const [category, setCategory] = useState<LeaderboardCategory>('lifetimeCredits');
  const [data, setData] = useState<GetLeaderboardResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getLeaderboard(category)
      .then((result) => { if (!cancelled) setData(result); })
      .catch((err) => { if (!cancelled) setError(err.message || 'Failed to load'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [category]);

  // Format value based on category
  const formatValue = (value: number, cat: LeaderboardCategory): string => {
    switch (cat) {
      case 'currentEra':
        return ERA_DEFINITIONS[value as keyof typeof ERA_DEFINITIONS]?.name ?? `Era ${value}`;
      case 'lifetimeCredits':
      case 'totalSeldonPoints':
        return formatNumber(value, 'short');
      default:
        return String(value);
    }
  };

  // Rank badge
  const rankBadge = (rank: number): React.ReactNode => {
    if (rank === 1) return <span className="w-7 h-7 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold flex items-center justify-center">1</span>;
    if (rank === 2) return <span className="w-7 h-7 rounded-full bg-gray-300/20 text-gray-300 text-xs font-bold flex items-center justify-center">2</span>;
    if (rank === 3) return <span className="w-7 h-7 rounded-full bg-amber-600/20 text-amber-600 text-xs font-bold flex items-center justify-center">3</span>;
    return <span className="w-7 h-7 rounded-full bg-[var(--era-surface)]/30 text-[var(--era-text)]/40 text-xs flex items-center justify-center">{rank}</span>;
  };

  return (
    <div className="space-y-3 pb-4">
      {/* Header */}
      <h2 className="text-base font-display font-semibold text-[var(--era-primary)]">Leaderboard</h2>

      {/* Horizontally scrollable category pills */}
      <div
        ref={pillsRef}
        className="flex gap-2 overflow-x-auto pb-1 -mx-3 px-3 scrollbar-none"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => setCategory(cat.key)}
            className={[
              'shrink-0 px-3 py-2 rounded-full text-xs font-medium transition-colors min-h-[44px]',
              category === cat.key
                ? 'bg-[var(--era-accent)]/20 text-[var(--era-accent)] border border-[var(--era-accent)]/30'
                : 'text-[var(--era-text)]/50 bg-[var(--era-surface)]/20 border border-transparent',
            ].join(' ')}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading && <p className="text-sm text-[var(--era-text)]/40 animate-pulse py-4 text-center">Loading rankings...</p>}
      {error && <p className="text-sm text-red-400 py-4 text-center">{error}</p>}
      {data && !loading && (
        <div className="space-y-2">
          {data.entries.length === 0 ? (
            <p className="text-sm text-[var(--era-text)]/40 py-4 text-center">No players found.</p>
          ) : (
            data.entries.map((entry) => (
              <div
                key={entry.rank}
                className={[
                  'flex items-center gap-3 px-3 py-3 rounded-lg min-h-[44px]',
                  entry.rank <= 3 ? 'bg-[var(--era-surface)]/40' : 'bg-[var(--era-surface)]/15',
                ].join(' ')}
              >
                {rankBadge(entry.rank)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--era-text)] truncate">{entry.nickname}</p>
                  <p className="text-[10px] text-[var(--era-text)]/40">{ERA_DEFINITIONS[entry.currentEra as keyof typeof ERA_DEFINITIONS]?.name}</p>
                </div>
                <span className="text-sm font-semibold text-[var(--era-accent)] tabular-nums shrink-0">
                  {formatValue(entry.value, data.category)}
                </span>
              </div>
            ))
          )}
          <p className="text-[10px] text-[var(--era-text)]/30 text-center pt-1">
            Updated {new Date(data.updatedAt * 1000).toLocaleTimeString()}
          </p>
        </div>
      )}
    </div>
  );
}
