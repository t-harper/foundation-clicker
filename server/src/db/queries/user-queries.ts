import { GetCommand, PutCommand, UpdateCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { TransactWriteCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient, TABLE_NAME } from '../connection.js';
import { queryItems, batchDeleteItems, userPK } from '../dynamo-utils.js';

export interface UserRow {
  id: number;
  username: string;
  nickname: string;
  password_hash: string;
  is_admin: number;
  created_at: number;
}

/** Atomically increment the user ID counter and return the new value */
async function nextUserId(): Promise<number> {
  const client = getDocClient();
  const result = await client.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { PK: 'COUNTER', SK: 'USER_ID' },
      UpdateExpression: 'ADD currentId :one',
      ExpressionAttributeValues: { ':one': 1 },
      ReturnValues: 'UPDATED_NEW',
    })
  );
  return result.Attributes!.currentId as number;
}

export async function createUser(username: string, passwordHash: string): Promise<UserRow> {
  const client = getDocClient();
  const id = await nextUserId();
  const now = Math.floor(Date.now() / 1000);

  // Transact: reserve username + create profile atomically
  await client.send(
    new TransactWriteCommand({
      TransactItems: [
        {
          Put: {
            TableName: TABLE_NAME,
            Item: {
              PK: `USERNAME#${username}`,
              SK: 'RESERVATION',
              userId: id,
            },
            ConditionExpression: 'attribute_not_exists(PK)',
          },
        },
        {
          Put: {
            TableName: TABLE_NAME,
            Item: {
              PK: userPK(id),
              SK: 'PROFILE',
              username,
              passwordHash,
              isAdmin: 0,
              createdAt: now,
              GSI1PK: `USERNAME#${username}`,
              GSI1SK: 'PROFILE',
            },
          },
        },
      ],
    })
  );

  return { id, username, nickname: username, password_hash: passwordHash, is_admin: 0, created_at: now };
}

export async function findUserByUsername(username: string): Promise<UserRow | undefined> {
  const client = getDocClient();
  const result = await client.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: 'GSI1',
      KeyConditionExpression: 'GSI1PK = :pk AND GSI1SK = :sk',
      ExpressionAttributeValues: {
        ':pk': `USERNAME#${username}`,
        ':sk': 'PROFILE',
      },
      Limit: 1,
    })
  );

  const item = result.Items?.[0];
  if (!item) return undefined;

  return {
    id: parseInt(item.PK.replace('USER#', ''), 10),
    username: item.username,
    nickname: item.nickname ?? item.username,
    password_hash: item.passwordHash,
    is_admin: item.isAdmin,
    created_at: item.createdAt,
  };
}

export async function findUserById(id: number): Promise<UserRow | undefined> {
  const client = getDocClient();
  const result = await client.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(id), SK: 'PROFILE' },
    })
  );

  const item = result.Item;
  if (!item) return undefined;

  return {
    id,
    username: item.username,
    nickname: item.nickname ?? item.username,
    password_hash: item.passwordHash,
    is_admin: item.isAdmin,
    created_at: item.createdAt,
  };
}

export async function getAllUsers(): Promise<UserRow[]> {
  // Scan all PROFILE items (admin-only, infrequent)
  const client = getDocClient();
  const { ScanCommand } = await import('@aws-sdk/lib-dynamodb');
  const items: Record<string, any>[] = [];
  let lastKey: Record<string, any> | undefined;

  do {
    const result = await client.send(
      new ScanCommand({
        TableName: TABLE_NAME,
        FilterExpression: 'SK = :sk',
        ExpressionAttributeValues: { ':sk': 'PROFILE' },
        ExclusiveStartKey: lastKey,
      })
    );
    if (result.Items) items.push(...result.Items);
    lastKey = result.LastEvaluatedKey;
  } while (lastKey);

  return items
    .map((item) => ({
      id: parseInt(item.PK.replace('USER#', ''), 10),
      username: item.username as string,
      nickname: (item.nickname ?? item.username) as string,
      password_hash: item.passwordHash as string,
      is_admin: item.isAdmin as number,
      created_at: item.createdAt as number,
    }))
    .sort((a, b) => a.id - b.id);
}

export async function updateUserPassword(userId: number, passwordHash: string): Promise<void> {
  const client = getDocClient();
  await client.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(userId), SK: 'PROFILE' },
      UpdateExpression: 'SET passwordHash = :hash',
      ExpressionAttributeValues: { ':hash': passwordHash },
    })
  );
}

export async function updateUserAdmin(userId: number, isAdmin: boolean): Promise<void> {
  const client = getDocClient();
  await client.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(userId), SK: 'PROFILE' },
      UpdateExpression: 'SET isAdmin = :val',
      ExpressionAttributeValues: { ':val': isAdmin ? 1 : 0 },
    })
  );
}

export async function updateUserNickname(userId: number, nickname: string): Promise<void> {
  const client = getDocClient();
  await client.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(userId), SK: 'PROFILE' },
      UpdateExpression: 'SET nickname = :nick',
      ExpressionAttributeValues: { ':nick': nickname },
    })
  );
}

export async function deleteUserFull(userId: number): Promise<void> {
  // Get username for reservation cleanup
  const user = await findUserById(userId);

  // Query ALL items for this user and delete them
  const items = await queryItems(userPK(userId));
  await batchDeleteItems(items.map((item) => ({ PK: item.PK, SK: item.SK })));

  // Delete username reservation
  if (user) {
    const client = getDocClient();
    const { DeleteCommand } = await import('@aws-sdk/lib-dynamodb');
    await client.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { PK: `USERNAME#${user.username}`, SK: 'RESERVATION' },
      })
    );
  }
}
