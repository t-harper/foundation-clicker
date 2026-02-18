import React, { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from '../../store';
import { selectProductionRates } from '../../store/selectors';
import { formatNumber, formatDuration } from '../../utils/format';
import { SparklineChart } from './SparklineChart';
import type { ResourceKey, Resources } from '@foundation/shared';
import { ERA_DEFINITIONS } from '@foundation/shared';
import type { StatsSnapshot } from '../../store/stats-slice';

const RESOURCE_KEYS: ResourceKey[] = ['credits', 'knowledge', 'influence', 'nuclearTech', 'rawMaterials'];

const RESOURCE_LABELS: Record<ResourceKey, string> = {
  credits: 'Credits',
  knowledge: 'Knowledge',
  influence: 'Influence',
  nuclearTech: 'Nuclear Tech',
  rawMaterials: 'Raw Materials',
};

const RESOURCE_COLORS: Record<ResourceKey, string> = {
  credits: 'var(--era-accent)',
  knowledge: '#60a5fa',
  influence: '#c084fc',
  nuclearTech: '#34d399',
  rawMaterials: '#f97316',
};

function getPeakRate(history: StatsSnapshot[], key: ResourceKey): number {
  if (history.length === 0) return 0;
  return Math.max(...history.map((s) => s.productionRates[key]));
}

function getChartData(history: StatsSnapshot[], accessor: (s: StatsSnapshot) => number): { x: number; y: number }[] {
  return history.map((s) => ({ x: s.timestamp, y: accessor(s) }));
}

function computeEraTime(history: StatsSnapshot[]): Record<number, number> {
  const eraSeconds: Record<number, number> = {};
  for (let i = 1; i < history.length; i++) {
    const prev = history[i - 1];
    const curr = history[i];
    const era = prev.era;
    const dt = curr.timestamp - prev.timestamp;
    eraSeconds[era] = (eraSeconds[era] || 0) + dt;
  }
  return eraSeconds;
}

export function StatsPanel() {
  const statsHistory = useGameStore((s) => s.statsHistory);
  const clearStatsHistory = useGameStore((s) => s.clearStatsHistory);
  const currentRates = useGameStore(useShallow(selectProductionRates));

  const peakRates = useMemo(() => {
    const peaks: Partial<Record<ResourceKey, number>> = {};
    for (const key of RESOURCE_KEYS) {
      peaks[key] = getPeakRate(statsHistory, key);
    }
    return peaks;
  }, [statsHistory]);

  const productionChartData = useMemo(() => {
    const data: Partial<Record<ResourceKey, { x: number; y: number }[]>> = {};
    for (const key of RESOURCE_KEYS) {
      data[key] = getChartData(statsHistory, (s) => s.productionRates[key]);
    }
    return data;
  }, [statsHistory]);

  const totalChartData = useMemo(() => {
    const data: Partial<Record<ResourceKey, { x: number; y: number }[]>> = {};
    for (const key of RESOURCE_KEYS) {
      data[key] = getChartData(statsHistory, (s) => s.resourceTotals[key]);
    }
    return data;
  }, [statsHistory]);

  const eraTime = useMemo(() => computeEraTime(statsHistory), [statsHistory]);

  const totalTrackedTime = useMemo(
    () => Object.values(eraTime).reduce((sum, t) => sum + t, 0),
    [eraTime],
  );

  const hasEnoughData = statsHistory.length >= 10;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-semibold text-[var(--era-primary)]">
          Statistics Dashboard
        </h2>
        <button
          onClick={clearStatsHistory}
          className="text-xs text-[var(--era-text)]/40 hover:text-[var(--era-text)]/70 transition-colors"
        >
          Clear History
        </button>
      </div>

      {!hasEnoughData && (
        <div className="rounded-lg bg-[var(--era-surface)]/50 border border-[var(--era-primary)]/10 p-3">
          <p className="text-xs text-[var(--era-text)]/50">
            Collecting data... Statistics become more detailed over time. Snapshots are recorded every 30 seconds and kept for 24 hours ({statsHistory.length} / 10 minimum snapshots).
          </p>
        </div>
      )}

      {/* Peak Production Rates */}
      <section>
        <h3 className="text-sm font-semibold text-[var(--era-secondary)] mb-3">
          Peak Production Rates
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {RESOURCE_KEYS.map((key) => (
            <div
              key={key}
              className="rounded-lg bg-[var(--era-surface)]/60 border border-[var(--era-primary)]/10 p-3"
            >
              <div className="text-xs text-[var(--era-text)]/40 mb-1">
                {RESOURCE_LABELS[key]}
              </div>
              <div className="text-sm font-semibold" style={{ color: RESOURCE_COLORS[key] }}>
                {formatNumber(peakRates[key] || 0, 'short')}/s
              </div>
              <div className="text-xs text-[var(--era-text)]/30 mt-0.5">
                Current: {formatNumber(currentRates[key], 'short')}/s
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Production Rates Over Time */}
      <section>
        <h3 className="text-sm font-semibold text-[var(--era-secondary)] mb-3">
          Production Rates Over Time
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {RESOURCE_KEYS.map((key) => (
            <div
              key={key}
              className="rounded-lg bg-[var(--era-surface)]/60 border border-[var(--era-primary)]/10 p-3"
            >
              <SparklineChart
                data={productionChartData[key] || []}
                color={RESOURCE_COLORS[key]}
                label={`${RESOURCE_LABELS[key]} /s`}
                height={60}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Resource Totals Over Time */}
      <section>
        <h3 className="text-sm font-semibold text-[var(--era-secondary)] mb-3">
          Resource Totals Over Time
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {RESOURCE_KEYS.map((key) => (
            <div
              key={key}
              className="rounded-lg bg-[var(--era-surface)]/60 border border-[var(--era-primary)]/10 p-3"
            >
              <SparklineChart
                data={totalChartData[key] || []}
                color={RESOURCE_COLORS[key]}
                label={RESOURCE_LABELS[key]}
                height={60}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Era Time Breakdown */}
      <section>
        <h3 className="text-sm font-semibold text-[var(--era-secondary)] mb-3">
          Era Time Breakdown
        </h3>
        {totalTrackedTime === 0 ? (
          <div className="rounded-lg bg-[var(--era-surface)]/60 border border-[var(--era-primary)]/10 p-3">
            <p className="text-xs text-[var(--era-text)]/30">
              No era time data yet. Keep playing to see how your time is distributed across eras.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {([0, 1, 2, 3] as const).map((era) => {
              const seconds = eraTime[era] || 0;
              const pct = totalTrackedTime > 0 ? (seconds / totalTrackedTime) * 100 : 0;
              const eraDef = ERA_DEFINITIONS[era];
              return (
                <div
                  key={era}
                  className="rounded-lg bg-[var(--era-surface)]/60 border border-[var(--era-primary)]/10 p-3"
                >
                  <div className="text-xs text-[var(--era-text)]/40 mb-1 truncate">
                    {eraDef.name}
                  </div>
                  <div className="text-sm font-semibold text-[var(--era-primary)]">
                    {formatDuration(seconds)}
                  </div>
                  {/* Progress bar */}
                  <div className="mt-2 w-full h-1.5 rounded-full bg-[var(--era-bg)] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-[width] duration-500"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: eraDef.themeColors.accent,
                      }}
                    />
                  </div>
                  <div className="text-xs text-[var(--era-text)]/30 mt-1">
                    {pct.toFixed(1)}%
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Data info footer */}
      <div className="text-xs text-[var(--era-text)]/20 text-center">
        {statsHistory.length} snapshots recorded (max 24h, every 30s)
      </div>
    </div>
  );
}
