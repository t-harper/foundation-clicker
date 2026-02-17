import { GetCommand, PutCommand, DeleteCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient, TABLE_NAME } from '../connection.js';
import { queryItems, userPK } from '../dynamo-utils.js';
import { randomUUID } from 'crypto';

export interface EventHistoryRow {
  id: number;
  user_id: number;
  event_key: string;
  choice_index: number;
  fired_at: number;
}

export interface ActiveEffectRow {
  id: string;
  user_id: number;
  event_key: string;
  choice_index: number;
  effect_type: string;
  resource: string | null;
  multiplier: number;
  started_at: number;
  expires_at: number;
}

export async function getEventHistory(userId: number): Promise<EventHistoryRow[]> {
  const items = await queryItems(userPK(userId), 'EVENT#');
  return items
    .map((item, idx) => ({
      id: idx,
      user_id: userId,
      event_key: item.eventKey,
      choice_index: item.choiceIndex,
      fired_at: item.firedAt,
    }))
    .sort((a, b) => b.fired_at - a.fired_at);
}

export interface EventHistoryPageResult {
  items: EventHistoryRow[];
  lastKey: string | null;
}

export async function getEventHistoryPage(
  userId: number,
  limit: number,
  cursor?: string
): Promise<EventHistoryPageResult> {
  const client = getDocClient();

  const params: Record<string, unknown> = {
    TableName: TABLE_NAME,
    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :prefix)',
    ExpressionAttributeValues: {
      ':pk': userPK(userId),
      ':prefix': 'EVENT#',
    },
    ScanIndexForward: false,
    Limit: limit,
  };

  if (cursor) {
    params.ExclusiveStartKey = {
      PK: userPK(userId),
      SK: cursor,
    };
  }

  const result = await client.send(new QueryCommand(params as any));
  const items: EventHistoryRow[] = (result.Items ?? []).map((item: any, idx: number) => ({
    id: idx,
    user_id: userId,
    event_key: item.eventKey,
    choice_index: item.choiceIndex,
    fired_at: item.firedAt,
  }));

  const lastKey = result.LastEvaluatedKey ? (result.LastEvaluatedKey.SK as string) : null;

  return { items, lastKey };
}

export async function getLastEventFiredAt(userId: number, eventKey: string): Promise<number | null> {
  // Query all events and filter by eventKey, find most recent
  const items = await queryItems(userPK(userId), 'EVENT#');
  let latest: number | null = null;
  for (const item of items) {
    if (item.eventKey === eventKey) {
      if (latest === null || item.firedAt > latest) {
        latest = item.firedAt;
      }
    }
  }
  return latest;
}

export async function hasEventFired(userId: number, eventKey: string): Promise<boolean> {
  const items = await queryItems(userPK(userId), 'EVENT#');
  return items.some((item) => item.eventKey === eventKey);
}

export async function insertEventHistory(
  userId: number,
  eventKey: string,
  choiceIndex: number,
  firedAt: number
): Promise<void> {
  const client = getDocClient();
  const paddedTs = String(firedAt).padStart(12, '0');
  const uuid = randomUUID().slice(0, 8);

  await client.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: userPK(userId),
        SK: `EVENT#${paddedTs}#${uuid}`,
        eventKey,
        choiceIndex,
        firedAt,
      },
    })
  );
}

export async function getActiveEffects(userId: number): Promise<ActiveEffectRow[]> {
  const items = await queryItems(userPK(userId), 'EFFECT#');
  const now = Math.floor(Date.now() / 1000);

  // Filter out expired effects (TTL deletion is eventually consistent)
  return items
    .filter((item) => item.expiresAt > now)
    .map((item) => ({
      id: item.SK.replace('EFFECT#', ''),
      user_id: userId,
      event_key: item.eventKey,
      choice_index: item.choiceIndex,
      effect_type: item.effectType,
      resource: item.resource ?? null,
      multiplier: item.multiplier,
      started_at: item.startedAt,
      expires_at: item.expiresAt,
    }));
}

export async function insertActiveEffect(
  id: string,
  userId: number,
  eventKey: string,
  choiceIndex: number,
  effectType: string,
  resource: string | null,
  multiplier: number,
  startedAt: number,
  expiresAt: number
): Promise<void> {
  const client = getDocClient();
  await client.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: userPK(userId),
        SK: `EFFECT#${id}`,
        eventKey,
        choiceIndex,
        effectType,
        resource,
        multiplier,
        startedAt,
        expiresAt,
        ttl: expiresAt, // DynamoDB TTL auto-deletion
      },
    })
  );
}

export async function clearUserEvents(userId: number): Promise<void> {
  const { deleteItemsByPrefix } = await import('../dynamo-utils.js');
  await Promise.all([
    deleteItemsByPrefix(userPK(userId), 'EVENT#'),
    deleteItemsByPrefix(userPK(userId), 'EFFECT#'),
    (async () => {
      const client = getDocClient();
      await client.send(
        new DeleteCommand({
          TableName: TABLE_NAME,
          Key: { PK: userPK(userId), SK: 'PENDING_EVENT' },
        })
      );
    })(),
  ]);
}

export async function getPendingEvent(userId: number): Promise<string | null> {
  const client = getDocClient();
  const result = await client.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(userId), SK: 'PENDING_EVENT' },
    })
  );
  return result.Item?.eventKey ?? null;
}

export async function setPendingEvent(userId: number, eventKey: string): Promise<void> {
  const client = getDocClient();
  await client.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: userPK(userId),
        SK: 'PENDING_EVENT',
        eventKey,
      },
    })
  );
}

export async function clearPendingEvent(userId: number): Promise<void> {
  const client = getDocClient();
  await client.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(userId), SK: 'PENDING_EVENT' },
    })
  );
}
