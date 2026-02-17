import type { APIGatewayProxyResult } from 'aws-lambda';
import {
  getConnectionUserId,
  deleteConnection,
} from './db/queries/ws-connection-queries.js';

interface WSEvent {
  requestContext: { connectionId: string };
}

export async function handler(
  event: WSEvent
): Promise<APIGatewayProxyResult> {
  const connectionId = event.requestContext.connectionId;

  try {
    const userId = await getConnectionUserId(connectionId);
    if (userId !== null) {
      await deleteConnection(connectionId, userId);
    }
  } catch (err) {
    console.error('Error cleaning up connection:', err);
  }

  return { statusCode: 200, body: 'Disconnected' };
}
