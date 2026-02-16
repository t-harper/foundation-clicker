import type { AchievementState, CheckAchievementsResponse } from '@foundation/shared';
import { apiClient } from './client.js';

export async function getAchievements(): Promise<AchievementState[]> {
  return apiClient.get<AchievementState[]>('/achievements');
}

export async function checkAchievements(): Promise<CheckAchievementsResponse> {
  return apiClient.post<CheckAchievementsResponse>('/achievements/check');
}
