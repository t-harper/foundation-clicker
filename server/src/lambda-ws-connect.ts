import type { APIGatewayProxyResult } from 'aws-lambda';
import jwt from 'jsonwebtoken';
import { createConnection } from './db/queries/ws-connection-queries.js';

const JWT_SECRET = process.env.JWT_SECRET || 'foundation-dev-secret-key';

interface WSConnectEvent {
  requestContext: { connectionId: string };
  queryStringParameters?: Record<string, string | undefined> | null;
}

export async function handler(
  event: WSConnectEvent
): Promise<APIGatewayProxyResult> {
  const connectionId = event.requestContext.connectionId;
  const token = event.queryStringParameters?.['token'];

  if (!token) {
    return { statusCode: 401, body: 'Missing token' };
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: number;
      username: string;
    };

    await createConnection(connectionId, decoded.userId);

    return { statusCode: 200, body: 'Connected' };
  } catch {
    return { statusCode: 401, body: 'Invalid token' };
  }
}
