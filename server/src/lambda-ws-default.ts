import type { APIGatewayProxyResult } from 'aws-lambda';
import type { ClientMessage, ServerMessage } from '@foundation/shared';
import { handleClientMessage } from './ws/handlers.js';
import { getConnectionUserId } from './db/queries/ws-connection-queries.js';
import { checkAchievements } from './services/achievement.js';
import { postToConnection } from './ws/api-gw-utils.js';

interface WSEvent {
  requestContext: { connectionId: string };
  body?: string | null;
}

export async function handler(
  event: WSEvent
): Promise<APIGatewayProxyResult> {
  const connectionId = event.requestContext.connectionId;

  const userId = await getConnectionUserId(connectionId);
  if (userId === null) {
    return { statusCode: 401, body: 'Unknown connection' };
  }

  let msg: ClientMessage;
  try {
    msg = JSON.parse(event.body ?? '{}');
  } catch {
    await postToConnection(connectionId, {
      type: 'error',
      requestId: '',
      message: 'Invalid JSON',
    } satisfies ServerMessage);
    return { statusCode: 200, body: 'OK' };
  }

  try {
    const result = await handleClientMessage(userId, msg);

    // Send response if one exists
    if (result.response) {
      await postToConnection(connectionId, result.response);
    }

    // Check achievements after mutations that warrant it
    if (result.checkAchievements) {
      try {
        const achResult = await checkAchievements(userId);
        if (achResult.newAchievements.length > 0) {
          await postToConnection(connectionId, {
            type: 'achievementUnlocked',
            achievements: achResult.newAchievements,
          } satisfies ServerMessage);
        }
      } catch (err) {
        console.error('Post-mutation achievement check failed:', err);
      }
    }
  } catch (err) {
    const requestId = 'requestId' in (msg as any) ? (msg as any).requestId : '';
    const message = err instanceof Error ? err.message : 'Internal server error';
    await postToConnection(connectionId, {
      type: 'error',
      requestId,
      message,
    } satisfies ServerMessage);
  }

  return { statusCode: 200, body: 'OK' };
}
