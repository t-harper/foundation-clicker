import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../../api/leaderboard';
import { formatNumber } from '../../utils/format';
import { ERA_DEFINITIONS } from '@foundation/shared';
import type { LeaderboardCategory, GetLeaderboardResponse } from '@foundation/shared';

const CATEGORIES: { key: LeaderboardCategory; label: string }[] = [
  { key: 'lifetimeCredits', label: 'Credits' },
  { key: 'totalSeldonPoints', label: 'Seldon Points' },
  { key: 'prestigeCount', label: 'Prestige' },
  { key: 'currentEra', label: 'Era' },
  { key: 'totalAchievements', label: 'Achievements' },
];

export function LeaderboardPanel() {
  const [category, setCategory] = useState<LeaderboardCategory>('lifetimeCredits');
  const [data, setData] = useState<GetLeaderboardResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Rank medal
  const rankDisplay = (rank: number): React.ReactNode => {
    if (rank === 1) return <span className="text-yellow-400 font-bold">1st</span>;
    if (rank === 2) return <span className="text-gray-300 font-bold">2nd</span>;
    if (rank === 3) return <span className="text-amber-600 font-bold">3rd</span>;
    return <span className="text-[var(--era-text)]/50">{rank}</span>;
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-display font-semibold text-[var(--era-primary)]">Leaderboard</h2>
        <p className="text-sm text-[var(--era-text)]/50 mt-1">Top players across the galaxy.</p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => setCategory(cat.key)}
            className={[
              'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
              category === cat.key
                ? 'bg-[var(--era-accent)]/20 text-[var(--era-accent)] border border-[var(--era-accent)]/30'
                : 'text-[var(--era-text)]/50 hover:text-[var(--era-text)] hover:bg-[var(--era-surface)]/30 border border-transparent',
            ].join(' ')}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading && <p className="text-sm text-[var(--era-text)]/40 animate-pulse">Loading rankings...</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}
      {data && !loading && (
        <div className="space-y-1">
          {data.entries.length === 0 ? (
            <p className="text-sm text-[var(--era-text)]/40">No players found.</p>
          ) : (
            data.entries.map((entry) => (
              <div
                key={entry.rank}
                className={[
                  'flex items-center gap-3 px-3 py-2 rounded-md',
                  entry.rank <= 3 ? 'bg-[var(--era-surface)]/40' : 'bg-[var(--era-surface)]/15',
                ].join(' ')}
              >
                <span className="w-10 text-center text-sm tabular-nums">{rankDisplay(entry.rank)}</span>
                <span className="flex-1 text-sm font-medium text-[var(--era-text)] truncate">{entry.nickname}</span>
                <span className="text-xs text-[var(--era-text)]/40">{ERA_DEFINITIONS[entry.currentEra as keyof typeof ERA_DEFINITIONS]?.name}</span>
                <span className="text-sm font-semibold text-[var(--era-accent)] tabular-nums">{formatValue(entry.value, data.category)}</span>
              </div>
            ))
          )}
          <p className="text-[10px] text-[var(--era-text)]/30 mt-2">
            Updated {new Date(data.updatedAt * 1000).toLocaleTimeString()}
          </p>
        </div>
      )}
    </div>
  );
}
