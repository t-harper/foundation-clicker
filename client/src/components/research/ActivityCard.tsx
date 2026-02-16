import React, { useState, useCallback, useEffect } from 'react';
import type { ActivityDefinition, ActiveActivity, HeroState, ResourceKey, Resources } from '@foundation/shared';
import { ACTIVITY_DEFINITIONS, HERO_DEFINITIONS } from '@foundation/shared';
import { useGameStore } from '../../store';
import { startActivity, collectActivity } from '../../api/activities';
import { Button } from '../common';
import { formatNumber, formatDuration } from '../../utils/format';
import { formatCountdown } from '../../utils/time';

interface ActivityCardProps {
  activityKey: string;
  timesCompleted: number;
}

export function ActivityCard({ activityKey, timesCompleted }: ActivityCardProps) {
  const def = ACTIVITY_DEFINITIONS[activityKey];
  const resources = useGameStore((s) => s.resources);
  const heroes = useGameStore((s) => s.heroes);
  const activeActivities = useGameStore((s) => s.activeActivities);
  const setResources = useGameStore((s) => s.setResources);
  const addActiveActivity = useGameStore((s) => s.addActiveActivity);
  const removeActiveActivity = useGameStore((s) => s.removeActiveActivity);
  const updateActivityCompletion = useGameStore((s) => s.updateActivityCompletion);
  const setInventory = useGameStore((s) => s.setInventory);
  const addNotification = useGameStore((s) => s.addNotification);

  const [loading, setLoading] = useState(false);
  const [selectedHero, setSelectedHero] = useState<string>('');
  const [countdown, setCountdown] = useState<number | null>(null);

  if (!def) return null;

  const activeActivity = activeActivities.find((a) => a.activityKey === activityKey);
  const isActive = !!activeActivity;

  // Which heroes are idle and unlocked?
  const busyHeroKeys = new Set(activeActivities.map((a) => a.heroKey));
  const availableHeroes = heroes.filter(
    (h) => h.unlockedAt !== null && !busyHeroKeys.has(h.heroKey)
  );

  // Affordability check
  const canAfford = Object.entries(def.cost).every(([key, amount]) =>
    amount === undefined || (resources[key as ResourceKey] ?? 0) >= amount
  );

  // Max completions check
  const atMaxCompletions = def.maxCompletions !== null && timesCompleted >= def.maxCompletions;

  // Countdown timer
  useEffect(() => {
    if (!activeActivity) {
      setCountdown(null);
      return;
    }

    function tick() {
      const now = Math.floor(Date.now() / 1000);
      const remaining = activeActivity!.completesAt - now;
      setCountdown(remaining);
    }

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [activeActivity]);

  const isComplete = countdown !== null && countdown <= 0;

  const handleStart = useCallback(async () => {
    if (loading || !selectedHero) return;
    setLoading(true);
    try {
      const result = await startActivity(activityKey, selectedHero);
      addActiveActivity(result.activeActivity);
      setResources(result.resources);
      setSelectedHero('');
      addNotification({
        message: `Started: ${def.name}`,
        type: 'success',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to start activity';
      addNotification({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [loading, selectedHero, activityKey, def.name, addActiveActivity, setResources, addNotification]);

  const handleCollect = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await collectActivity(activityKey);
      removeActiveActivity(activityKey);
      updateActivityCompletion(activityKey, result.activity.timesCompleted);
      setInventory(result.inventory);
      const rewardNames = result.rewards.map((r) => {
        const itemName = r.itemKey;
        return `${r.quantity}x ${itemName}`;
      }).join(', ');
      addNotification({
        message: `Collected: ${rewardNames}`,
        type: 'success',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to collect';
      addNotification({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [loading, activityKey, removeActiveActivity, updateActivityCompletion, setInventory, addNotification]);

  return (
    <div className={[
      'p-4 rounded-lg border transition-colors',
      isActive
        ? 'border-amber-500/30 bg-[var(--era-surface)]/40'
        : atMaxCompletions
          ? 'border-[var(--era-surface)]/20 bg-[var(--era-surface)]/10 opacity-50'
          : 'holo-card neon-border-hover border-[var(--era-primary)]/20 bg-[var(--era-surface)]/30 hover:bg-[var(--era-surface)]/50',
    ].join(' ')}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-[var(--era-text)] truncate">
              {def.name}
            </h3>
            <span className={[
              'shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase',
              def.type === 'research'
                ? 'bg-blue-500/20 text-blue-400'
                : 'bg-orange-500/20 text-orange-400',
            ].join(' ')}>
              {def.type}
            </span>
          </div>
          <p className="text-xs text-[var(--era-text)]/50 mt-1">{def.description}</p>
        </div>
      </div>

      {/* Duration and completions */}
      <div className="flex items-center gap-4 mb-2 text-xs text-[var(--era-text)]/40">
        <span>Duration: {formatDuration(def.durationSeconds)}</span>
        <span>Completed: {timesCompleted}{def.maxCompletions !== null ? ` / ${def.maxCompletions}` : ''}</span>
      </div>

      {/* Active timer */}
      {isActive && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-amber-400">
              {isComplete ? 'Complete!' : `Time remaining: ${formatCountdown(countdown ?? 0)}`}
            </span>
            {activeActivity && (
              <span className="text-[11px] text-[var(--era-text)]/40">
                Hero: {HERO_DEFINITIONS[activeActivity.heroKey]?.name ?? activeActivity.heroKey}
              </span>
            )}
          </div>
          {!isComplete && countdown !== null && (
            <div className="w-full h-1.5 rounded-full bg-[var(--era-surface)]/50 overflow-hidden">
              <div
                className="h-full rounded-full bg-amber-500 transition-all duration-1000"
                style={{
                  width: `${Math.max(0, Math.min(100, (1 - countdown / def.durationSeconds) * 100))}%`,
                }}
              />
            </div>
          )}
          {isComplete && (
            <Button
              variant="primary"
              size="sm"
              loading={loading}
              onClick={handleCollect}
              className="mt-2"
            >
              Collect Rewards
            </Button>
          )}
        </div>
      )}

      {/* Cost and start (when not active) */}
      {!isActive && !atMaxCompletions && (
        <div className="space-y-2">
          {/* Cost display */}
          <div className="flex flex-wrap gap-x-2 gap-y-0.5">
            {Object.entries(def.cost).map(([key, val]) => {
              if (val === undefined) return null;
              const hasEnough = (resources[key as ResourceKey] ?? 0) >= val;
              return (
                <span
                  key={key}
                  className={`text-xs tabular-nums ${hasEnough ? 'text-[var(--era-text)]/60' : 'text-red-400'}`}
                >
                  {formatNumber(val, 'short')} {key}
                </span>
              );
            })}
          </div>

          {/* Hero selection and start */}
          <div className="flex items-center gap-2">
            <select
              value={selectedHero}
              onChange={(e) => setSelectedHero(e.target.value)}
              className="flex-1 text-xs px-2 py-1.5 rounded bg-[var(--era-bg)] border border-[var(--era-surface)]/50 text-[var(--era-text)] focus:outline-none focus:border-[var(--era-accent)]"
            >
              <option value="">Select hero...</option>
              {availableHeroes.map((h) => {
                const heroDef = HERO_DEFINITIONS[h.heroKey];
                if (!heroDef) return null;
                const bonus = heroDef.specialization === def.type
                  ? ` (-${Math.round((1 - heroDef.durationBonus) * 100)}%)`
                  : '';
                return (
                  <option key={h.heroKey} value={h.heroKey}>
                    {heroDef.name}{bonus}
                  </option>
                );
              })}
            </select>
            <Button
              variant="primary"
              size="sm"
              disabled={!selectedHero || !canAfford}
              loading={loading}
              onClick={handleStart}
              className="shrink-0"
            >
              Start
            </Button>
          </div>
        </div>
      )}

      {atMaxCompletions && !isActive && (
        <p className="text-xs text-[var(--era-text)]/30 italic">Max completions reached</p>
      )}
    </div>
  );
}
