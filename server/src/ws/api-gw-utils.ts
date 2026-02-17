import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
  GoneException,
} from '@aws-sdk/client-apigatewaymanagementapi';
import { deleteConnection, getConnectionUserId } from '../db/queries/ws-connection-queries.js';

let cachedClient: ApiGatewayManagementApiClient | null = null;

function getApiGwClient(): ApiGatewayManagementApiClient {
  if (!cachedClient) {
    const endpoint = process.env.WS_API_ENDPOINT;
    if (!endpoint) {
      throw new Error('WS_API_ENDPOINT environment variable is required');
    }
    cachedClient = new ApiGatewayManagementApiClient({
      endpoint,
      region: process.env.AWS_REGION_APP || process.env.AWS_REGION || 'us-east-1',
    });
  }
  return cachedClient;
}

/** Send JSON data to a WebSocket connection. Cleans up stale connections on 410 Gone. */
export async function postToConnection(
  connectionId: string,
  data: unknown
): Promise<void> {
  const client = getApiGwClient();
  try {
    await client.send(
      new PostToConnectionCommand({
        ConnectionId: connectionId,
        Data: new TextEncoder().encode(JSON.stringify(data)),
      })
    );
  } catch (err) {
    if (err instanceof GoneException) {
      // Connection is stale — clean up
      const userId = await getConnectionUserId(connectionId);
      if (userId !== null) {
        await deleteConnection(connectionId, userId);
      }
    } else {
      throw err;
    }
  }
}
