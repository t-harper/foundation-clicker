import { PutCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient, TABLE_NAME } from '../connection.js';
import { queryItems, userPK } from '../dynamo-utils.js';

export interface AchievementRow {
  user_id: number;
  achievement_key: string;
  unlocked_at: number | null;
}

export async function getAchievements(userId: number): Promise<AchievementRow[]> {
  const items = await queryItems(userPK(userId), 'ACHIEVEMENT#');
  return items.map((item) => ({
    user_id: userId,
    achievement_key: item.SK.replace('ACHIEVEMENT#', ''),
    unlocked_at: item.unlockedAt ?? null,
  }));
}

export async function unlockAchievement(userId: number, key: string): Promise<void> {
  const client = getDocClient();
  const now = Math.floor(Date.now() / 1000);
  // Only set unlockedAt if not already set (preserve first unlock time)
  await client.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(userId), SK: `ACHIEVEMENT#${key}` },
      UpdateExpression: 'SET unlockedAt = if_not_exists(unlockedAt, :now)',
      ExpressionAttributeValues: { ':now': now },
    })
  );
}

export async function revokeAchievement(userId: number, key: string): Promise<void> {
  const client = getDocClient();
  await client.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(userId), SK: `ACHIEVEMENT#${key}` },
    })
  );
}
