import type { CheckAchievementsResponse } from '@foundation/shared';

// Achievements are now server-pushed via WebSocket.
// This function is kept for API surface compatibility but should not be called.
export async function checkAchievements(): Promise<CheckAchievementsResponse> {
  return { newAchievements: [] };
}
