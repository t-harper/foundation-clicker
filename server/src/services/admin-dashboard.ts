import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient, TABLE_NAME } from '../db/connection.js';
import type { AdminDashboardResponse } from '@foundation/shared';

interface DashboardCache {
  data: AdminDashboardResponse;
  expiresAt: number;
}

let cache: DashboardCache | null = null;
const CACHE_TTL_MS = 60_000;

async function scanBySK(sk: string): Promise<Record<string, any>[]> {
  const client = getDocClient();
  const items: Record<string, any>[] = [];
  let lastKey: Record<string, any> | undefined;
  do {
    const result = await client.send(
      new ScanCommand({
        TableName: TABLE_NAME,
        FilterExpression: 'SK = :sk',
        ExpressionAttributeValues: { ':sk': sk },
        ExclusiveStartKey: lastKey,
      })
    );
    if (result.Items) items.push(...result.Items);
    lastKey = result.LastEvaluatedKey;
  } while (lastKey);
  return items;
}

async function scanByPrefix(prefix: string): Promise<Record<string, any>[]> {
  const client = getDocClient();
  const items: Record<string, any>[] = [];
  let lastKey: Record<string, any> | undefined;
  do {
    const result = await client.send(
      new ScanCommand({
        TableName: TABLE_NAME,
        FilterExpression: 'begins_with(SK, :prefix)',
        ExpressionAttributeValues: { ':prefix': prefix },
        ExclusiveStartKey: lastKey,
      })
    );
    if (result.Items) items.push(...result.Items);
    lastKey = result.LastEvaluatedKey;
  } while (lastKey);
  return items;
}

function avg(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

function countByUser(items: Record<string, any>[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const item of items) {
    const pk = item.PK as string;
    counts.set(pk, (counts.get(pk) ?? 0) + 1);
  }
  return counts;
}

export async function getAdminDashboard(): Promise<AdminDashboardResponse> {
  if (cache && Date.now() < cache.expiresAt) {
    return cache.data;
  }

  const [profiles, gameStates, buildingItems, upgradeItems, achievementItems, heroItems, shipItems, tradeRouteItems] =
    await Promise.all([
      scanBySK('PROFILE'),
      scanBySK('GAMESTATE'),
      scanByPrefix('BUILDING#'),
      scanByPrefix('UPGRADE#'),
      scanByPrefix('ACHIEVEMENT#'),
      scanByPrefix('HERO#'),
      scanByPrefix('SHIP#'),
      scanByPrefix('TRADEROUTE#'),
    ]);

  const nowSeconds = Math.floor(Date.now() / 1000);

  // --- Profile map ---
  const profileMap = new Map<string, { nickname: string; createdAt: number }>();
  for (const p of profiles) {
    profileMap.set(p.PK as string, {
      nickname: (p.nickname ?? p.username) as string,
      createdAt: (p.createdAt ?? 0) as number,
    });
  }

  // --- Overview ---
  const totalPlayers = profiles.length;
  let active24h = 0;
  let active7d = 0;
  let newPlayers7d = 0;

  for (const p of profiles) {
    const createdAt = (p.createdAt ?? 0) as number;
    if (createdAt > nowSeconds - 604800) newPlayers7d++;
  }

  // --- Era Distribution ---
  const playersPerEra: [number, number, number, number] = [0, 0, 0, 0];
  const prestigeCounts: number[] = [];
  const seldonPointsArr: number[] = [];
  const playTimes: number[] = [];
  const totalClicksArr: number[] = [];
  const lifetimeCreditsArr: number[] = [];

  for (const gs of gameStates) {
    const lastTickAt = (gs.last_tick_at ?? 0) as number;
    if (lastTickAt > nowSeconds - 86400) active24h++;
    if (lastTickAt > nowSeconds - 604800) active7d++;

    const era = (gs.current_era ?? 0) as number;
    if (era >= 0 && era <= 3) playersPerEra[era]++;

    const pc = (gs.prestige_count ?? 0) as number;
    prestigeCounts.push(pc);

    const sp = (gs.total_seldon_points ?? 0) as number;
    seldonPointsArr.push(sp);

    const pt = (gs.total_play_time ?? 0) as number;
    playTimes.push(pt);

    const tc = (gs.total_clicks ?? 0) as number;
    totalClicksArr.push(tc);

    const lc = (gs.lifetime_credits ?? 0) as number;
    lifetimeCreditsArr.push(lc);
  }

  // --- Content Adoption ---
  // Buildings: sum counts per user
  const buildingCountsByUser = new Map<string, number>();
  for (const b of buildingItems) {
    const pk = b.PK as string;
    const count = (b.count ?? 0) as number;
    buildingCountsByUser.set(pk, (buildingCountsByUser.get(pk) ?? 0) + count);
  }
  const buildingTotals = Array.from(buildingCountsByUser.values());

  const upgradesByUser = countByUser(upgradeItems);
  const achievementsByUser = countByUser(achievementItems);
  const heroesByUser = countByUser(heroItems);

  const playerCount = gameStates.length || 1; // avoid division by zero

  // --- Top Players ---
  type PlayerEntry = { nickname: string; value: number };
  const byCredits: PlayerEntry[] = [];
  const bySeldon: PlayerEntry[] = [];
  for (const gs of gameStates) {
    const profile = profileMap.get(gs.PK as string);
    if (!profile) continue;
    byCredits.push({ nickname: profile.nickname, value: (gs.lifetime_credits ?? 0) as number });
    bySeldon.push({ nickname: profile.nickname, value: (gs.total_seldon_points ?? 0) as number });
  }
  byCredits.sort((a, b) => b.value - a.value);
  bySeldon.sort((a, b) => b.value - a.value);

  const data: AdminDashboardResponse = {
    overview: {
      totalPlayers,
      active24h,
      active7d,
      newPlayers7d,
    },
    eraDistribution: {
      playersPerEra,
      avgPrestigeCount: Math.round(avg(prestigeCounts) * 100) / 100,
      maxPrestigeCount: Math.max(0, ...prestigeCounts),
      avgTotalSeldonPoints: Math.round(avg(seldonPointsArr) * 100) / 100,
      maxTotalSeldonPoints: Math.max(0, ...seldonPointsArr),
    },
    engagement: {
      avgPlayTimeSeconds: Math.round(avg(playTimes)),
      medianPlayTimeSeconds: Math.round(median(playTimes)),
      avgTotalClicks: Math.round(avg(totalClicksArr)),
      avgLifetimeCredits: Math.round(avg(lifetimeCreditsArr) * 100) / 100,
      maxLifetimeCredits: Math.max(0, ...lifetimeCreditsArr),
    },
    contentAdoption: {
      avgBuildingsOwned: Math.round((buildingTotals.reduce((a, b) => a + b, 0) / playerCount) * 100) / 100,
      avgUpgradesPurchased: Math.round((Array.from(upgradesByUser.values()).reduce((a, b) => a + b, 0) / playerCount) * 100) / 100,
      avgAchievementsUnlocked: Math.round((Array.from(achievementsByUser.values()).reduce((a, b) => a + b, 0) / playerCount) * 100) / 100,
      avgHeroesUnlocked: Math.round((Array.from(heroesByUser.values()).reduce((a, b) => a + b, 0) / playerCount) * 100) / 100,
    },
    economy: {
      totalLifetimeCredits: lifetimeCreditsArr.reduce((a, b) => a + b, 0),
      totalSeldonPoints: seldonPointsArr.reduce((a, b) => a + b, 0),
      totalClicks: totalClicksArr.reduce((a, b) => a + b, 0),
    },
    shipsAndTrade: {
      totalShipsBuilt: shipItems.length,
      totalTradeRoutesUnlocked: tradeRouteItems.length,
    },
    topPlayers: {
      byLifetimeCredits: byCredits.slice(0, 5),
      bySeldonPoints: bySeldon.slice(0, 5),
    },
    computedAt: nowSeconds,
  };

  cache = { data, expiresAt: Date.now() + CACHE_TTL_MS };
  return data;
}
