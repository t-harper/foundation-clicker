import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient, TABLE_NAME } from '../db/connection.js';
import type { LeaderboardCategory, LeaderboardEntry, GetLeaderboardResponse } from '@foundation/shared';

interface CacheEntry {
  data: GetLeaderboardResponse;
  expiresAt: number;
}

const cache = new Map<LeaderboardCategory, CacheEntry>();
const CACHE_TTL_MS = 60_000;
const MAX_ENTRIES = 100;

async function scanBySort(sk: string): Promise<Record<string, any>[]> {
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

export async function getLeaderboard(category: LeaderboardCategory): Promise<GetLeaderboardResponse> {
  const cached = cache.get(category);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.data;
  }

  // Scan PROFILE items for nicknames
  const profiles = await scanBySort('PROFILE');
  // Scan GAMESTATE items for metrics
  const gameStates = await scanBySort('GAMESTATE');

  // Build user map: userId -> { nickname }
  const profileMap = new Map<string, { nickname: string }>();
  for (const p of profiles) {
    const userId = p.PK as string;
    profileMap.set(userId, {
      nickname: (p.nickname ?? p.username) as string,
    });
  }

  // For totalAchievements category, count achievements per user
  let achievementCounts: Map<string, number> | undefined;
  if (category === 'totalAchievements') {
    achievementCounts = new Map();
    const achItems = await scanByPrefix('ACHIEVEMENT#');

    for (const a of achItems) {
      const userId = a.PK as string;
      achievementCounts.set(userId, (achievementCounts.get(userId) ?? 0) + 1);
    }
  }

  // Build entries
  const entries: LeaderboardEntry[] = [];
  for (const gs of gameStates) {
    const userId = gs.PK as string;
    const profile = profileMap.get(userId);
    if (!profile) continue;

    let value: number;
    switch (category) {
      case 'lifetimeCredits':
        value = (gs.lifetimeCredits ?? 0) as number;
        break;
      case 'totalSeldonPoints':
        value = (gs.totalSeldonPoints ?? 0) as number;
        break;
      case 'prestigeCount':
        value = (gs.prestigeCount ?? 0) as number;
        break;
      case 'currentEra':
        value = (gs.currentEra ?? 0) as number;
        break;
      case 'totalAchievements':
        value = achievementCounts?.get(userId) ?? 0;
        break;
      default:
        value = 0;
    }

    entries.push({
      rank: 0, // Will be set after sorting
      nickname: profile.nickname,
      value,
      currentEra: (gs.currentEra ?? 0) as number,
    });
  }

  // Sort descending by value
  entries.sort((a, b) => b.value - a.value);

  // Assign ranks and trim to top 100
  const ranked = entries.slice(0, MAX_ENTRIES).map((e, i) => ({
    ...e,
    rank: i + 1,
  }));

  const result: GetLeaderboardResponse = {
    category,
    entries: ranked,
    updatedAt: Math.floor(Date.now() / 1000),
  };

  cache.set(category, { data: result, expiresAt: Date.now() + CACHE_TTL_MS });
  return result;
}
