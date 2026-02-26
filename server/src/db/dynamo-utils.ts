import { QueryCommand, BatchWriteCommand, NumberValue } from '@aws-sdk/lib-dynamodb';
import { getDocClient, getDocClientSafe, TABLE_NAME } from './connection.js';

/** Convert a DynamoDB NumberValue (from wrapNumbers: true) or any value to a JS number */
export function toNum(val: unknown): number {
  if (val == null) return 0;
  if (val instanceof NumberValue) return Number(val.value);
  return Number(val);
}

/** Wrap a number in NumberValue if it exceeds MAX_SAFE_INTEGER (for DynamoDB writes) */
export function safeNum(val: number): number | NumberValue {
  if (Math.abs(val) > Number.MAX_SAFE_INTEGER) {
    return new NumberValue(val.toString());
  }
  return val;
}

/** Query all items with a given PK and optional SK prefix */
export async function queryItems(
  pk: string,
  skPrefix?: string,
  options?: { safe?: boolean }
): Promise<Record<string, any>[]> {
  const client = options?.safe ? getDocClientSafe() : getDocClient();
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
