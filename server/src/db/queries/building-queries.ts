import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient, TABLE_NAME } from '../connection.js';
import { queryItems, userPK } from '../dynamo-utils.js';

export interface BuildingRow {
  user_id: number;
  building_key: string;
  count: number;
  is_unlocked: number;
}

export async function getBuildings(userId: number): Promise<BuildingRow[]> {
  const items = await queryItems(userPK(userId), 'BUILDING#');
  return items.map((item) => ({
    user_id: userId,
    building_key: item.SK.replace('BUILDING#', ''),
    count: item.count ?? 0,
    is_unlocked: item.isUnlocked ?? 0,
  }));
}

export async function upsertBuilding(
  userId: number,
  key: string,
  count: number,
  isUnlocked: boolean
): Promise<void> {
  const client = getDocClient();
  await client.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: userPK(userId),
        SK: `BUILDING#${key}`,
        count,
        isUnlocked: isUnlocked ? 1 : 0,
      },
    })
  );
}
