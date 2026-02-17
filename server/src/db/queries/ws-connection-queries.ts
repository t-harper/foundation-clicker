import { GetCommand, PutCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient, TABLE_NAME } from '../connection.js';
import { queryItems } from '../dynamo-utils.js';

const CONNECTION_TTL_SECONDS = 2 * 60 * 60; // 2 hours

function connectionPK(connectionId: string): string {
  return `WSCONN#${connectionId}`;
}

function userPK(userId: number): string {
  return `USER#${userId}`;
}

/** Store a WebSocket connection mapping (bidirectional lookup) */
export async function createConnection(
  connectionId: string,
  userId: number
): Promise<void> {
  const client = getDocClient();
  const now = Math.floor(Date.now() / 1000);
  const ttl = now + CONNECTION_TTL_SECONDS;

  // Write both items (connection→user and user→connection)
  await Promise.all([
    client.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: connectionPK(connectionId),
          SK: 'META',
          userId,
          connectedAt: now,
          ttl,
        },
      })
    ),
    client.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: userPK(userId),
          SK: `WSCONN#${connectionId}`,
          connectedAt: now,
          ttl,
        },
      })
    ),
  ]);
}

/** Delete a WebSocket connection mapping */
export async function deleteConnection(
  connectionId: string,
  userId: number
): Promise<void> {
  const client = getDocClient();

  await Promise.all([
    client.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { PK: connectionPK(connectionId), SK: 'META' },
      })
    ),
    client.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { PK: userPK(userId), SK: `WSCONN#${connectionId}` },
      })
    ),
  ]);
}

/** Look up the userId for a given connectionId */
export async function getConnectionUserId(
  connectionId: string
): Promise<number | null> {
  const client = getDocClient();
  const result = await client.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { PK: connectionPK(connectionId), SK: 'META' },
      ProjectionExpression: 'userId',
    })
  );
  return result.Item?.userId ?? null;
}

/** Get all active connection IDs for a user */
export async function getUserConnections(
  userId: number
): Promise<string[]> {
  const items = await queryItems(userPK(userId), 'WSCONN#');
  return items.map((item) => item.SK.replace('WSCONN#', ''));
}
