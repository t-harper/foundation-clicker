import { QueryCommand, BatchWriteCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient, TABLE_NAME } from './connection.js';

/** Query all items with a given PK and optional SK prefix */
export async function queryItems(
  pk: string,
  skPrefix?: string
): Promise<Record<string, any>[]> {
  const client = getDocClient();
  const items: Record<string, any>[] = [];
  let lastKey: Record<string, any> | undefined;

  do {
    const params: any = {
      TableName: TABLE_NAME,
      KeyConditionExpression: skPrefix
        ? 'PK = :pk AND begins_with(SK, :skPrefix)'
        : 'PK = :pk',
      ExpressionAttributeValues: skPrefix
        ? { ':pk': pk, ':skPrefix': skPrefix }
        : { ':pk': pk },
      ExclusiveStartKey: lastKey,
    };

    const result = await client.send(new QueryCommand(params));
    if (result.Items) {
      items.push(...result.Items);
    }
    lastKey = result.LastEvaluatedKey;
  } while (lastKey);

  return items;
}

/** Delete all items matching a PK and optional SK prefix */
export async function deleteItemsByPrefix(
  pk: string,
  skPrefix?: string
): Promise<void> {
  const items = await queryItems(pk, skPrefix);
  await batchDeleteItems(items.map((item) => ({ PK: item.PK, SK: item.SK })));
}

/** Batch delete items (handles 25-item batches) */
export async function batchDeleteItems(
  keys: { PK: string; SK: string }[]
): Promise<void> {
  if (keys.length === 0) return;

  const client = getDocClient();

  for (let i = 0; i < keys.length; i += 25) {
    const batch = keys.slice(i, i + 25);
    await client.send(
      new BatchWriteCommand({
        RequestItems: {
          [TABLE_NAME]: batch.map((key) => ({
            DeleteRequest: { Key: { PK: key.PK, SK: key.SK } },
          })),
        },
      })
    );
  }
}

/** Helper to build USER# PK */
export function userPK(userId: number): string {
  return `USER#${userId}`;
}
