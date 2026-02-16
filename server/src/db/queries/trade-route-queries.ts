import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient, TABLE_NAME } from '../connection.js';
import { queryItems, userPK } from '../dynamo-utils.js';

export interface TradeRouteRow {
  user_id: number;
  route_key: string;
  is_unlocked: number;
}

export async function getTradeRoutes(userId: number): Promise<TradeRouteRow[]> {
  const items = await queryItems(userPK(userId), 'TRADEROUTE#');
  return items.map((item) => ({
    user_id: userId,
    route_key: item.SK.replace('TRADEROUTE#', ''),
    is_unlocked: 1, // Only stored if unlocked (sparse model)
  }));
}

export async function unlockTradeRoute(userId: number, key: string): Promise<void> {
  const client = getDocClient();
  await client.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: userPK(userId),
        SK: `TRADEROUTE#${key}`,
        isUnlocked: 1,
      },
    })
  );
}
