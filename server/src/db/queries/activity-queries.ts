import { GetCommand, PutCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient, TABLE_NAME } from '../connection.js';
import { queryItems, userPK } from '../dynamo-utils.js';

export interface ActivityRow {
  user_id: number;
  activity_key: string;
  times_completed: number;
}

export interface ActiveActivityRow {
  user_id: number;
  activity_key: string;
  hero_key: string;
  started_at: number;
  completes_at: number;
}

export async function getUserActivities(userId: number): Promise<ActivityRow[]> {
  const items = await queryItems(userPK(userId), 'ACTIVITY#');
  return items.map((item) => ({
    user_id: userId,
    activity_key: item.SK.replace('ACTIVITY#', ''),
    times_completed: item.timesCompleted ?? 0,
  }));
}

export async function getActiveActivities(userId: number): Promise<ActiveActivityRow[]> {
  const items = await queryItems(userPK(userId), 'ACTIVE_ACTIVITY#');
  return items.map((item) => ({
    user_id: userId,
    activity_key: item.SK.replace('ACTIVE_ACTIVITY#', ''),
    hero_key: item.heroKey,
    started_at: item.startedAt,
    completes_at: item.completesAt,
  }));
}

export async function getActiveActivityByKey(userId: number, activityKey: string): Promise<ActiveActivityRow | undefined> {
  const client = getDocClient();
  const result = await client.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(userId), SK: `ACTIVE_ACTIVITY#${activityKey}` },
    })
  );

  if (!result.Item) return undefined;

  return {
    user_id: userId,
    activity_key: activityKey,
    hero_key: result.Item.heroKey,
    started_at: result.Item.startedAt,
    completes_at: result.Item.completesAt,
  };
}

export async function getActiveActivityByHero(userId: number, heroKey: string): Promise<ActiveActivityRow | undefined> {
  // Query all active activities and filter by heroKey
  const items = await queryItems(userPK(userId), 'ACTIVE_ACTIVITY#');
  const match = items.find((item) => item.heroKey === heroKey);
  if (!match) return undefined;

  return {
    user_id: userId,
    activity_key: match.SK.replace('ACTIVE_ACTIVITY#', ''),
    hero_key: match.heroKey,
    started_at: match.startedAt,
    completes_at: match.completesAt,
  };
}

export async function insertActiveActivity(
  userId: number,
  activityKey: string,
  heroKey: string,
  startedAt: number,
  completesAt: number
): Promise<void> {
  const client = getDocClient();
  await client.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: userPK(userId),
        SK: `ACTIVE_ACTIVITY#${activityKey}`,
        heroKey,
        startedAt,
        completesAt,
      },
    })
  );
}

export async function removeActiveActivity(userId: number, activityKey: string): Promise<void> {
  const client = getDocClient();
  await client.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(userId), SK: `ACTIVE_ACTIVITY#${activityKey}` },
    })
  );
}

export async function incrementTimesCompleted(userId: number, activityKey: string): Promise<void> {
  const client = getDocClient();
  await client.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(userId), SK: `ACTIVITY#${activityKey}` },
      UpdateExpression: 'SET timesCompleted = if_not_exists(timesCompleted, :zero) + :one',
      ExpressionAttributeValues: { ':zero': 0, ':one': 1 },
    })
  );
}

export async function getTimesCompleted(userId: number, activityKey: string): Promise<number> {
  const client = getDocClient();
  const result = await client.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(userId), SK: `ACTIVITY#${activityKey}` },
    })
  );
  return result.Item?.timesCompleted ?? 0;
}
