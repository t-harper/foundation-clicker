import type { AdminUserSummary, GameState } from '@foundation/shared';
import { apiClient } from './client';

export async function getAdminUsers(): Promise<{ users: AdminUserSummary[] }> {
  return apiClient.get('/admin/users');
}

export async function impersonateUser(userId: number): Promise<{ token: string; username: string }> {
  return apiClient.post(`/admin/users/${userId}/impersonate`);
}

export async function deleteAdminUser(userId: number): Promise<void> {
  return apiClient.delete(`/admin/users/${userId}`);
}

export async function forcePasswordChange(userId: number, newPassword: string): Promise<void> {
  return apiClient.post(`/admin/users/${userId}/password`, { newPassword });
}

export async function toggleAdmin(userId: number, isAdmin: boolean): Promise<void> {
  return apiClient.patch(`/admin/users/${userId}/admin`, { isAdmin });
}

export async function getAdminUserState(userId: number): Promise<GameState> {
  return apiClient.get(`/admin/users/${userId}/state`);
}

export async function setUserResources(
  userId: number,
  resources: { credits?: number; knowledge?: number; influence?: number; nuclearTech?: number; rawMaterials?: number }
): Promise<void> {
  return apiClient.patch(`/admin/users/${userId}/resources`, resources);
}

export async function setUserEra(userId: number, era: number): Promise<void> {
  return apiClient.patch(`/admin/users/${userId}/era`, { era });
}

export async function setUserPrestige(
  userId: number,
  data: { seldonPoints?: number; totalSeldonPoints?: number; prestigeCount?: number; prestigeMultiplier?: number }
): Promise<void> {
  return apiClient.patch(`/admin/users/${userId}/prestige`, data);
}

export async function setUserBuilding(userId: number, buildingKey: string, count: number): Promise<void> {
  return apiClient.patch(`/admin/users/${userId}/buildings/${buildingKey}`, { count });
}

export async function setUserUpgrade(userId: number, upgradeKey: string, isPurchased: boolean): Promise<void> {
  return apiClient.patch(`/admin/users/${userId}/upgrades/${upgradeKey}`, { isPurchased });
}

export async function deleteUserShip(userId: number, shipId: string): Promise<void> {
  return apiClient.delete(`/admin/users/${userId}/ships/${shipId}`);
}

export async function grantUserAchievement(userId: number, achievementKey: string): Promise<void> {
  return apiClient.post(`/admin/users/${userId}/achievements/${achievementKey}`);
}

export async function revokeUserAchievement(userId: number, achievementKey: string): Promise<void> {
  return apiClient.delete(`/admin/users/${userId}/achievements/${achievementKey}`);
}

export async function grantUserHero(userId: number, heroKey: string): Promise<void> {
  return apiClient.post(`/admin/users/${userId}/heroes/${heroKey}`);
}

export async function revokeUserHero(userId: number, heroKey: string): Promise<void> {
  return apiClient.delete(`/admin/users/${userId}/heroes/${heroKey}`);
}

export async function cancelUserActivity(userId: number, activityKey: string): Promise<void> {
  return apiClient.delete(`/admin/users/${userId}/activities/${activityKey}`);
}
