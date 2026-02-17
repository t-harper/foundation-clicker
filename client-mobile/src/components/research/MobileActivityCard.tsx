import React, { useState, useCallback, useEffect } from 'react';
import type { ResourceKey } from '@foundation/shared';
import { ACTIVITY_DEFINITIONS, HERO_DEFINITIONS, ITEM_DEFINITIONS } from '@foundation/shared';
import { useGameStore } from '@desktop/store';
import { startActivity, collectActivity } from '@desktop/api/activities';
import { Button } from '@desktop/components/common';
import { formatNumber, formatDuration } from '@desktop/utils/format';
import { formatCountdown } from '@desktop/utils/time';
import { MobileModal } from '@/components/common/MobileModal';
import { formatItemEffect } from '@desktop/utils/items';

interface MobileActivityCardProps {
  activityKey: string;
  timesCompleted: number;
}

export function MobileActivityCard({ activityKey, timesCompleted }: MobileActivityCardProps) {
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
  const [rewardModalData, setRewardModalData] = useState<{
    activityName: string;
    rewards: { itemKey: string; quantity: number }[];
  } | null>(null);

  if (!def) return null;

  const activeActivity = activeActivities.find((a) => a.activityKey === activityKey);
  const isActive = !!activeActivity;

  // Which heroes are idle, unlocked, and from the current era?
  const currentEra = useGameStore((s) => s.currentEra);
  const busyHeroKeys = new Set(activeActivities.map((a) => a.heroKey));
  const availableHeroes = heroes.filter((h) => {
    if (h.unlockedAt === null || busyHeroKeys.has(h.heroKey)) return false;
    const heroDef = HERO_DEFINITIONS[h.heroKey];
    return heroDef && heroDef.era === currentEra;
  });

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
      setRewardModalData({
        activityName: def.name,
        rewards: result.rewards,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to collect';
      addNotification({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [loading, activityKey, def.name, removeActiveActivity, updateActivityCompletion, setInventory, addNotification]);

  const progressPercent = countdown !== null
    ? Math.max(0, Math.min(100, (1 - countdown / def.durationSeconds) * 100))
    : 0;

  return (
    <div className={[
      'w-full p-3 rounded-lg border transition-colors',
      isActive
        ? 'border-amber-500/30 bg-[var(--era-surface)]/40'
        : atMaxCompletions
          ? 'border-[var(--era-surface)]/20 bg-[var(--era-surface)]/10 opacity-50'
          : 'border-[var(--era-primary)]/20 bg-[var(--era-surface)]/30',
    ].join(' ')}>
      {/* Header row: name + type badge */}
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-sm font-semibold text-[var(--era-text)] truncate flex-1">
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

      {/* Description */}
      <p className="text-xs text-[var(--era-text)]/50 mb-2">{def.description}</p>

      {/* Duration + completions row */}
      <div className="flex items-center gap-3 mb-2 text-xs text-[var(--era-text)]/40">
        <span>Duration: {formatDuration(def.durationSeconds)}</span>
        <span>Done: {timesCompleted}{def.maxCompletions !== null ? `/${def.maxCompletions}` : ''}</span>
      </div>

      {/* Active timer with progress bar */}
      {isActive && (
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-amber-400 font-medium">
              {isComplete ? 'Complete!' : formatCountdown(countdown ?? 0)}
            </span>
            {activeActivity && (
              <span className="text-[11px] text-[var(--era-text)]/40">
                {HERO_DEFINITIONS[activeActivity.heroKey]?.name ?? activeActivity.heroKey}
              </span>
            )}
          </div>
          {!isComplete && countdown !== null && (
            <div className="w-full h-2 rounded-full bg-[var(--era-surface)]/50 overflow-hidden">
              <div
                className="h-full rounded-full bg-amber-500 transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}
          {isComplete && (
            <Button
              variant="primary"
              size="sm"
              loading={loading}
              onClick={handleCollect}
              className="mt-2 w-full"
            >
              Collect Rewards
            </Button>
          )}
        </div>
      )}

      {/* Cost display + hero selector + start button (when not active) */}
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

          {/* Hero selector dropdown */}
          <select
            value={selectedHero}
            onChange={(e) => setSelectedHero(e.target.value)}
            className="w-full text-sm px-3 py-2 rounded-lg bg-[var(--era-bg)] border border-[var(--era-surface)]/50 text-[var(--era-text)] focus:outline-none focus:border-[var(--era-accent)] touch-action-manipulation"
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

          {/* Start button */}
          <Button
            variant="primary"
            size="sm"
            disabled={!selectedHero || !canAfford}
            loading={loading}
            onClick={handleStart}
            className="w-full"
          >
            Start
          </Button>
        </div>
      )}

      {atMaxCompletions && !isActive && (
        <p className="text-xs text-[var(--era-text)]/30 italic">Max completions reached</p>
      )}

      {/* Reward modal */}
      <MobileModal
        isOpen={rewardModalData !== null}
        onClose={() => setRewardModalData(null)}
        title={rewardModalData?.activityName ?? ''}
      >
        <div className="space-y-3">
          {rewardModalData?.rewards.map((reward) => {
            const itemDef = ITEM_DEFINITIONS[reward.itemKey];
            if (!itemDef) return null;
            const isConsumable = itemDef.category === 'consumable';

            return (
              <div
                key={reward.itemKey}
                className={[
                  'p-3 rounded-lg border',
                  isConsumable
                    ? 'border-orange-500/20 bg-[var(--era-surface)]/30'
                    : 'border-purple-500/20 bg-[var(--era-surface)]/30',
                ].join(' ')}
              >
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-[var(--era-text)]">
                    {itemDef.name}
                  </h4>
                  <span className={[
                    'shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase',
                    isConsumable
                      ? 'bg-orange-500/20 text-orange-400'
                      : 'bg-purple-500/20 text-purple-400',
                  ].join(' ')}>
                    {itemDef.category}
                  </span>
                  <span className="text-xs text-[var(--era-text)]/40 tabular-nums">
                    x{reward.quantity}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--era-text)]/50">{itemDef.description}</p>
                <p className="text-[11px] text-[var(--era-accent)] mt-1">
                  {formatItemEffect(itemDef)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-4">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setRewardModalData(null)}
            className="w-full"
          >
            Nice!
          </Button>
        </div>
      </MobileModal>
    </div>
  );
}
