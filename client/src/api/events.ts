import type {
  ChooseEventResponse,
  GetActiveEffectsResponse,
  GetEventHistoryResponse,
  GetEventHistoryPageResponse,
} from '@foundation/shared';
import { wsManager } from '../ws';

// Event checking is now server-pushed via WebSocket.
// chooseEvent is still used when the player makes a choice.
export async function chooseEvent(data: { eventKey: string; choiceIndex: number }): Promise<ChooseEventResponse> {
  return wsManager.send<ChooseEventResponse>({ type: 'chooseEvent', eventKey: data.eventKey, choiceIndex: data.choiceIndex });
}

export async function getActiveEffects(): Promise<GetActiveEffectsResponse> {
  return wsManager.send<GetActiveEffectsResponse>({ type: 'getActiveEffects' });
}

export async function getEventHistory(): Promise<GetEventHistoryResponse> {
  return wsManager.send<GetEventHistoryResponse>({ type: 'getEventHistory' });
}

export async function getEventHistoryPage(limit?: number, cursor?: string): Promise<GetEventHistoryPageResponse> {
  return wsManager.send<GetEventHistoryPageResponse>({ type: 'getEventHistoryPage', limit, cursor });
}
