import type { GetLeaderboardResponse, LeaderboardCategory } from '@foundation/shared';
import { apiClient } from './client';

export async function getLeaderboard(
  category: LeaderboardCategory = 'lifetimeCredits'
): Promise<GetLeaderboardResponse> {
  return apiClient.get<GetLeaderboardResponse>(`/leaderboard?category=${category}`);
}
