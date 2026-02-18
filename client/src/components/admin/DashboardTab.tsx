import React, { useEffect, useState } from 'react';
import type { AdminDashboardResponse } from '@foundation/shared';
import { ERA_DEFINITIONS, type Era } from '@foundation/shared';
import { getAdminDashboard } from '../../api/admin';
import { formatNumber, formatDuration } from '../../utils/format';

type Dashboard = AdminDashboardResponse;

function MetricCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white/5 border border-red-500/20 rounded-lg p-3">
      <div className="text-[11px] text-white/50 uppercase tracking-wider mb-1">{label}</div>
      <div className="text-xl font-bold text-red-400">{value}</div>
      {sub && <div className="text-[10px] text-white/40 mt-0.5">{sub}</div>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-2 border-b border-white/10 pb-1">
        {title}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {children}
      </div>
    </div>
  );
}

const ERA_COLORS = ['text-amber-400', 'text-teal-400', 'text-purple-400', 'text-cyan-400'] as const;

export function DashboardTab() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAdminDashboard();
      setData(result);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading && !data) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="bg-white/5 border border-red-500/10 rounded-lg p-3 animate-pulse">
                <div className="h-3 bg-white/10 rounded w-16 mb-2" />
                <div className="h-6 bg-white/10 rounded w-12" />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">
        <p className="font-medium">Error loading dashboard</p>
        <p className="text-sm text-red-400/70 mt-1">{error}</p>
        <button
          onClick={fetchData}
          className="mt-2 px-3 py-1 text-xs bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  const f = (n: number) => formatNumber(n, 'short');
  const ff = (n: number) => formatNumber(n, 'full');

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-[10px] text-white/30">
          Last updated: {new Date(data.computedAt * 1000).toLocaleTimeString()}
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="px-3 py-1 text-xs bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded transition-colors disabled:opacity-50"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <Section title="Player Overview">
        <MetricCard label="Total Players" value={ff(data.overview.totalPlayers)} />
        <MetricCard label="Active (24h)" value={ff(data.overview.active24h)} sub={`${data.overview.totalPlayers ? Math.round(data.overview.active24h / data.overview.totalPlayers * 100) : 0}% of total`} />
        <MetricCard label="Active (7d)" value={ff(data.overview.active7d)} sub={`${data.overview.totalPlayers ? Math.round(data.overview.active7d / data.overview.totalPlayers * 100) : 0}% of total`} />
        <MetricCard label="New Players (7d)" value={ff(data.overview.newPlayers7d)} />
      </Section>

      <Section title="Era Distribution">
        {data.eraDistribution.playersPerEra.map((count, i) => (
          <div key={i} className="bg-white/5 border border-red-500/20 rounded-lg p-3">
            <div className="text-[11px] text-white/50 uppercase tracking-wider mb-1">
              {ERA_DEFINITIONS[i as Era]?.name ?? `Era ${i}`}
            </div>
            <div className={`text-xl font-bold ${ERA_COLORS[i]}`}>{ff(count)}</div>
            <div className="text-[10px] text-white/40 mt-0.5">
              {data.overview.totalPlayers ? Math.round(count / data.overview.totalPlayers * 100) : 0}% of players
            </div>
          </div>
        ))}
        <MetricCard label="Avg Prestiges" value={f(data.eraDistribution.avgPrestigeCount)} />
        <MetricCard label="Max Prestiges" value={ff(data.eraDistribution.maxPrestigeCount)} />
        <MetricCard label="Avg Seldon Points" value={f(data.eraDistribution.avgTotalSeldonPoints)} />
        <MetricCard label="Max Seldon Points" value={f(data.eraDistribution.maxTotalSeldonPoints)} />
      </Section>

      <Section title="Engagement">
        <MetricCard label="Avg Play Time" value={formatDuration(data.engagement.avgPlayTimeSeconds)} />
        <MetricCard label="Median Play Time" value={formatDuration(data.engagement.medianPlayTimeSeconds)} />
        <MetricCard label="Avg Total Clicks" value={f(data.engagement.avgTotalClicks)} />
        <MetricCard label="Avg Lifetime Credits" value={f(data.engagement.avgLifetimeCredits)} />
        <MetricCard label="Max Lifetime Credits" value={f(data.engagement.maxLifetimeCredits)} />
      </Section>

      <Section title="Content Adoption">
        <MetricCard label="Avg Buildings Owned" value={f(data.contentAdoption.avgBuildingsOwned)} sub="per player" />
        <MetricCard label="Avg Upgrades Purchased" value={f(data.contentAdoption.avgUpgradesPurchased)} sub="per player" />
        <MetricCard label="Avg Achievements" value={f(data.contentAdoption.avgAchievementsUnlocked)} sub="per player" />
        <MetricCard label="Avg Heroes Unlocked" value={f(data.contentAdoption.avgHeroesUnlocked)} sub="per player" />
      </Section>

      <Section title="Economy">
        <MetricCard label="Total Lifetime Credits" value={f(data.economy.totalLifetimeCredits)} sub="all players combined" />
        <MetricCard label="Total Seldon Points" value={f(data.economy.totalSeldonPoints)} sub="all players combined" />
        <MetricCard label="Total Clicks" value={f(data.economy.totalClicks)} sub="all players combined" />
      </Section>

      <Section title="Ships & Trade">
        <MetricCard label="Total Ships Built" value={ff(data.shipsAndTrade.totalShipsBuilt)} />
        <MetricCard label="Trade Routes Unlocked" value={ff(data.shipsAndTrade.totalTradeRoutesUnlocked)} />
      </Section>

      <div>
        <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-2 border-b border-white/10 pb-1">
          Top Players
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white/5 border border-red-500/20 rounded-lg p-3">
            <div className="text-[11px] text-white/50 uppercase tracking-wider mb-2">By Lifetime Credits</div>
            {data.topPlayers.byLifetimeCredits.length === 0 ? (
              <div className="text-sm text-white/30">No data</div>
            ) : (
              <div className="space-y-1">
                {data.topPlayers.byLifetimeCredits.map((p, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-white/70">
                      <span className="text-white/40 mr-1.5">{i + 1}.</span>
                      {p.nickname}
                    </span>
                    <span className="text-red-400 font-medium">{f(p.value)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-white/5 border border-red-500/20 rounded-lg p-3">
            <div className="text-[11px] text-white/50 uppercase tracking-wider mb-2">By Seldon Points</div>
            {data.topPlayers.bySeldonPoints.length === 0 ? (
              <div className="text-sm text-white/30">No data</div>
            ) : (
              <div className="space-y-1">
                {data.topPlayers.bySeldonPoints.map((p, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-white/70">
                      <span className="text-white/40 mr-1.5">{i + 1}.</span>
                      {p.nickname}
                    </span>
                    <span className="text-red-400 font-medium">{f(p.value)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
