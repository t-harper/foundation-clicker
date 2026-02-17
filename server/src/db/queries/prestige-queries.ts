import { PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient, TABLE_NAME } from '../connection.js';
import { queryItems, deleteItemsByPrefix, userPK } from '../dynamo-utils.js';

export interface PrestigeHistoryRow {
  id: number;
  user_id: number;
  prestige_number: number;
  credits_at_reset: number;
  seldon_points_earned: number;
  era_at_reset: number;
  triggered_at: number;
}

export async function getPrestigeHistory(userId: number): Promise<PrestigeHistoryRow[]> {
  const items = await queryItems(userPK(userId), 'PRESTIGE#');
  return items
    .map((item, idx) => ({
      id: idx,
      user_id: userId,
      prestige_number: item.prestigeNumber,
      credits_at_reset: item.creditsAtReset,
      seldon_points_earned: item.seldonPointsEarned,
      era_at_reset: item.eraAtReset,
      triggered_at: item.triggeredAt,
    }))
    .sort((a, b) => a.prestige_number - b.prestige_number);
}

export async function addPrestigeEntry(
  userId: number,
  data: {
    prestigeNumber: number;
    creditsAtReset: number;
    seldonPointsEarned: number;
    eraAtReset: number;
  }
): Promise<void> {
  const client = getDocClient();
  const now = Math.floor(Date.now() / 1000);
  const paddedNumber = String(data.prestigeNumber).padStart(5, '0');

  await client.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: userPK(userId),
        SK: `PRESTIGE#${paddedNumber}`,
        prestigeNumber: data.prestigeNumber,
        creditsAtReset: data.creditsAtReset,
        seldonPointsEarned: data.seldonPointsEarned,
        eraAtReset: data.eraAtReset,
        triggeredAt: now,
      },
    })
  );
}

export async function resetForPrestige(
  userId: number,
  prestige: {
    seldonPoints: number;
    totalSeldonPoints: number;
    prestigeCount: number;
    prestigeMultiplier: number;
  }
): Promise<void> {
  // Parallel batch deletes of buildings, upgrades, ships, trade routes
  await Promise.all([
    deleteItemsByPrefix(userPK(userId), 'BUILDING#'),
    deleteItemsByPrefix(userPK(userId), 'UPGRADE#'),
    deleteItemsByPrefix(userPK(userId), 'SHIP#'),
    deleteItemsByPrefix(userPK(userId), 'TRADEROUTE#'),
  ]);

  // Atomic update of game state with pre-computed prestige values
  const client = getDocClient();
  const now = Math.floor(Date.now() / 1000);

  await client.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(userId), SK: 'GAMESTATE' },
      UpdateExpression: `
        SET credits = :zero,
            knowledge = :zero,
            influence = :zero,
            #nt = :zero,
            #rm = :zero,
            #cv = :one,
            #ce = :zero,
            #sp = :sp,
            #tsp = :tsp,
            #pc = :pc,
            #pm = :pm,
            #lt = :now
      `,
      ExpressionAttributeNames: {
        '#nt': 'nuclearTech',
        '#rm': 'rawMaterials',
        '#cv': 'clickValue',
        '#ce': 'currentEra',
        '#sp': 'seldonPoints',
        '#tsp': 'totalSeldonPoints',
        '#pc': 'prestigeCount',
        '#pm': 'prestigeMultiplier',
        '#lt': 'lastTickAt',
      },
      ExpressionAttributeValues: {
        ':zero': 0,
        ':one': 1,
        ':sp': prestige.seldonPoints,
        ':tsp': prestige.totalSeldonPoints,
        ':pc': prestige.prestigeCount,
        ':pm': prestige.prestigeMultiplier,
        ':now': now,
      },
    })
  );
}
