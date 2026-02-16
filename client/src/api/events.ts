import type {
  CheckEventsResponse,
  ChooseEventRequest,
  ChooseEventResponse,
  GetActiveEffectsResponse,
  GetEventHistoryResponse,
} from '@foundation/shared';
import { apiClient } from './client';

export async function checkEvents(): Promise<CheckEventsResponse> {
  return apiClient.post<CheckEventsResponse>('/events/check');
}

export async function chooseEvent(data: ChooseEventRequest): Promise<ChooseEventResponse> {
  return apiClient.post<ChooseEventResponse>('/events/choose', data);
}

export async function getActiveEffects(): Promise<GetActiveEffectsResponse> {
  return apiClient.get<GetActiveEffectsResponse>('/events/active-effects');
}

export async function getEventHistory(): Promise<GetEventHistoryResponse> {
  return apiClient.get<GetEventHistoryResponse>('/events/history');
}
