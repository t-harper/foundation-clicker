import type {
  GetActivitiesResponse,
  StartActivityResponse,
  CollectActivityResponse,
} from '@foundation/shared';
import { apiClient } from './client';

export async function getActivities(): Promise<GetActivitiesResponse> {
  return apiClient.get<GetActivitiesResponse>('/activities');
}

export async function startActivity(activityKey: string, heroKey: string): Promise<StartActivityResponse> {
  return apiClient.post<StartActivityResponse>('/activities/start', { activityKey, heroKey });
}

export async function collectActivity(activityKey: string): Promise<CollectActivityResponse> {
  return apiClient.post<CollectActivityResponse>('/activities/collect', { activityKey });
}
