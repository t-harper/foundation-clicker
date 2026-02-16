import { PutCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient, TABLE_NAME } from '../connection.js';
import { queryItems, userPK } from '../dynamo-utils.js';

export interface UpgradeRow {
  user_id: number;
  upgrade_key: string;
  is_purchased: number;
}

export async function getUpgrades(userId: number): Promise<UpgradeRow[]> {
  const items = await queryItems(userPK(userId), 'UPGRADE#');
  return items.map((item) => ({
    user_id: userId,
    upgrade_key: item.SK.replace('UPGRADE#', ''),
    is_purchased: 1, // Only stored if purchased (sparse model)
  }));
}

export async function purchaseUpgrade(userId: number, key: string): Promise<void> {
  const client = getDocClient();
  await client.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: userPK(userId),
        SK: `UPGRADE#${key}`,
        isPurchased: 1,
      },
    })
  );
}

export async function unpurchaseUpgrade(userId: number, key: string): Promise<void> {
  const client = getDocClient();
  await client.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(userId), SK: `UPGRADE#${key}` },
    })
  );
}
