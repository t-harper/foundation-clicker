import { GetCommand, PutCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient, TABLE_NAME } from '../connection.js';
import { queryItems, userPK } from '../dynamo-utils.js';

export interface HeroRow {
  user_id: number;
  hero_key: string;
  unlocked_at: number;
}

export async function getUserHeroes(userId: number): Promise<HeroRow[]> {
  const items = await queryItems(userPK(userId), 'HERO#');
  return items.map((item) => ({
    user_id: userId,
    hero_key: item.SK.replace('HERO#', ''),
    unlocked_at: item.unlockedAt,
  }));
}

export async function unlockHero(userId: number, heroKey: string, unlockedAt: number): Promise<void> {
  const client = getDocClient();
  // Only create if not already existing (preserve original unlock time)
  await client.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: userPK(userId),
        SK: `HERO#${heroKey}`,
        unlockedAt,
      },
      ConditionExpression: 'attribute_not_exists(PK)',
    })
  ).catch((err) => {
    // Ignore ConditionalCheckFailed - hero already unlocked
    if (err.name !== 'ConditionalCheckFailedException') throw err;
  });
}

export async function hasHero(userId: number, heroKey: string): Promise<boolean> {
  const client = getDocClient();
  const result = await client.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(userId), SK: `HERO#${heroKey}` },
    })
  );
  return !!result.Item;
}

export async function deleteHero(userId: number, heroKey: string): Promise<void> {
  const client = getDocClient();
  await client.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(userId), SK: `HERO#${heroKey}` },
    })
  );
}
