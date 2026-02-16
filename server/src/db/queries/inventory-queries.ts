import { GetCommand, PutCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient, TABLE_NAME } from '../connection.js';
import { queryItems, userPK } from '../dynamo-utils.js';

export interface InventoryRow {
  user_id: number;
  item_key: string;
  quantity: number;
}

export interface ActiveConsumableRow {
  user_id: number;
  item_key: string;
  started_at: number;
  expires_at: number;
}

export async function getUserInventory(userId: number): Promise<InventoryRow[]> {
  const items = await queryItems(userPK(userId), 'INVENTORY#');
  return items
    .filter((item) => (item.quantity ?? 0) > 0)
    .map((item) => ({
      user_id: userId,
      item_key: item.SK.replace('INVENTORY#', ''),
      quantity: item.quantity,
    }));
}

export async function addItem(userId: number, itemKey: string, quantity: number): Promise<void> {
  const client = getDocClient();
  await client.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(userId), SK: `INVENTORY#${itemKey}` },
      UpdateExpression: 'SET quantity = if_not_exists(quantity, :zero) + :qty',
      ExpressionAttributeValues: { ':zero': 0, ':qty': quantity },
    })
  );
}

export async function removeItem(userId: number, itemKey: string, quantity: number): Promise<boolean> {
  const client = getDocClient();
  try {
    await client.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { PK: userPK(userId), SK: `INVENTORY#${itemKey}` },
        UpdateExpression: 'SET quantity = quantity - :qty',
        ConditionExpression: 'quantity >= :qty',
        ExpressionAttributeValues: { ':qty': quantity },
      })
    );
    return true;
  } catch (err: any) {
    if (err.name === 'ConditionalCheckFailedException') return false;
    throw err;
  }
}

export async function getItemQuantity(userId: number, itemKey: string): Promise<number> {
  const client = getDocClient();
  const result = await client.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(userId), SK: `INVENTORY#${itemKey}` },
    })
  );
  return result.Item?.quantity ?? 0;
}

export async function getActiveConsumable(userId: number): Promise<ActiveConsumableRow | undefined> {
  const client = getDocClient();
  const result = await client.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(userId), SK: 'ACTIVE_CONSUMABLE' },
    })
  );

  if (!result.Item) return undefined;

  return {
    user_id: userId,
    item_key: result.Item.itemKey,
    started_at: result.Item.startedAt,
    expires_at: result.Item.expiresAt,
  };
}

export async function setActiveConsumable(
  userId: number,
  itemKey: string,
  startedAt: number,
  expiresAt: number
): Promise<void> {
  const client = getDocClient();
  await client.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: userPK(userId),
        SK: 'ACTIVE_CONSUMABLE',
        itemKey,
        startedAt,
        expiresAt,
      },
    })
  );
}

export async function clearActiveConsumable(userId: number): Promise<void> {
  const client = getDocClient();
  await client.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(userId), SK: 'ACTIVE_CONSUMABLE' },
    })
  );
}
