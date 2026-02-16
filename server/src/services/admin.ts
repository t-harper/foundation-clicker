import bcrypt from 'bcrypt';
import type { GameState, AdminUserSummary, BuildingKey, UpgradeKey } from '@foundation/shared';
import { BUILDING_DEFINITIONS, UPGRADE_DEFINITIONS, ACHIEVEMENT_DEFINITIONS, HERO_DEFINITIONS } from '@foundation/shared';
import {
  getAllUsers,
  findUserById,
  updateUserPassword,
  updateUserAdmin,
  deleteUserFull,
} from '../db/queries/user-queries.js';
import { getGameState, updateGameState } from '../db/queries/game-state-queries.js';
import { upsertBuilding } from '../db/queries/building-queries.js';
import { purchaseUpgrade, unpurchaseUpgrade } from '../db/queries/upgrade-queries.js';
import { getShips, deleteShip } from '../db/queries/ship-queries.js';
import { unlockAchievement, revokeAchievement } from '../db/queries/achievement-queries.js';
import { unlockHero, deleteHero } from '../db/queries/hero-queries.js';
import { removeActiveActivity } from '../db/queries/activity-queries.js';
import { buildGameState } from './game-state.js';
import { generateToken } from './auth.js';
import {
  ValidationError,
  NotFoundError,
  ForbiddenError,
} from '../middleware/error-handler.js';

const BCRYPT_ROUNDS = 10;

export async function listUsers(): Promise<AdminUserSummary[]> {
  const users = await getAllUsers();
  const results: AdminUserSummary[] = [];
  for (const u of users) {
    const gs = await getGameState(u.id);
    results.push({
      id: u.id,
      username: u.username,
      isAdmin: u.is_admin === 1,
      createdAt: u.created_at,
      currentEra: gs?.current_era ?? 0,
      prestigeCount: gs?.prestige_count ?? 0,
    });
  }
  return results;
}

export async function getUserFullState(userId: number): Promise<GameState> {
  const user = await findUserById(userId);
  if (!user) throw new NotFoundError('User not found');
  return buildGameState(userId);
}

export async function impersonateUser(targetUserId: number): Promise<{ token: string; username: string }> {
  const user = await findUserById(targetUserId);
  if (!user) throw new NotFoundError('User not found');
  const token = generateToken(user.id, user.username);
  return { token, username: user.username };
}

export async function deleteUser(adminId: number, targetId: number): Promise<void> {
  if (adminId === targetId) {
    throw new ValidationError('Cannot delete your own account');
  }
  const user = await findUserById(targetId);
  if (!user) throw new NotFoundError('User not found');
  await deleteUserFull(targetId);
}

export async function forcePasswordChange(userId: number, newPassword: string): Promise<void> {
  if (!newPassword || newPassword.length < 6) {
    throw new ValidationError('Password must be at least 6 characters');
  }
  const user = await findUserById(userId);
  if (!user) throw new NotFoundError('User not found');
  const hash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
  await updateUserPassword(userId, hash);
}

export async function setAdminLevel(userId: number, isAdmin: boolean): Promise<void> {
  const user = await findUserById(userId);
  if (!user) throw new NotFoundError('User not found');
  await updateUserAdmin(userId, isAdmin);
}

export async function updateResources(
  userId: number,
  partial: { credits?: number; knowledge?: number; influence?: number; nuclearTech?: number; rawMaterials?: number }
): Promise<void> {
  const user = await findUserById(userId);
  if (!user) throw new NotFoundError('User not found');

  const data: Record<string, number> = {};
  if (partial.credits !== undefined) data.credits = partial.credits;
  if (partial.knowledge !== undefined) data.knowledge = partial.knowledge;
  if (partial.influence !== undefined) data.influence = partial.influence;
  if (partial.nuclearTech !== undefined) data.nuclear_tech = partial.nuclearTech;
  if (partial.rawMaterials !== undefined) data.raw_materials = partial.rawMaterials;

  if (Object.keys(data).length === 0) return;
  await updateGameState(userId, data);
}

export async function updateEra(userId: number, era: number): Promise<void> {
  if (era < 0 || era > 3 || !Number.isInteger(era)) {
    throw new ValidationError('Era must be an integer between 0 and 3');
  }
  const user = await findUserById(userId);
  if (!user) throw new NotFoundError('User not found');
  await updateGameState(userId, { current_era: era });
}

export async function updatePrestige(
  userId: number,
  data: { seldonPoints?: number; totalSeldonPoints?: number; prestigeCount?: number; prestigeMultiplier?: number }
): Promise<void> {
  const user = await findUserById(userId);
  if (!user) throw new NotFoundError('User not found');

  const update: Record<string, number> = {};
  if (data.seldonPoints !== undefined) update.seldon_points = data.seldonPoints;
  if (data.totalSeldonPoints !== undefined) update.total_seldon_points = data.totalSeldonPoints;
  if (data.prestigeCount !== undefined) update.prestige_count = data.prestigeCount;
  if (data.prestigeMultiplier !== undefined) update.prestige_multiplier = data.prestigeMultiplier;

  if (Object.keys(update).length === 0) return;
  await updateGameState(userId, update);
}

export async function updateBuildingAdmin(userId: number, buildingKey: string, count: number): Promise<void> {
  if (!BUILDING_DEFINITIONS[buildingKey as BuildingKey]) {
    throw new ValidationError(`Invalid building key: ${buildingKey}`);
  }
  if (!Number.isInteger(count) || count < 0) {
    throw new ValidationError('Count must be a non-negative integer');
  }
  const user = await findUserById(userId);
  if (!user) throw new NotFoundError('User not found');
  await upsertBuilding(userId, buildingKey, count, count > 0);
}

export async function setUpgradePurchased(userId: number, upgradeKey: string, isPurchased: boolean): Promise<void> {
  if (!UPGRADE_DEFINITIONS[upgradeKey as UpgradeKey]) {
    throw new ValidationError(`Invalid upgrade key: ${upgradeKey}`);
  }
  const user = await findUserById(userId);
  if (!user) throw new NotFoundError('User not found');

  if (isPurchased) {
    await purchaseUpgrade(userId, upgradeKey);
  } else {
    await unpurchaseUpgrade(userId, upgradeKey);
  }
}

export async function deleteShipAdmin(userId: number, shipId: string): Promise<void> {
  const ships = await getShips(userId);
  const ship = ships.find((s) => s.id === shipId);
  if (!ship) throw new NotFoundError('Ship not found for this user');
  await deleteShip(userId, shipId);
}

export async function grantAchievement(userId: number, achievementKey: string): Promise<void> {
  if (!ACHIEVEMENT_DEFINITIONS[achievementKey]) {
    throw new ValidationError(`Invalid achievement key: ${achievementKey}`);
  }
  const user = await findUserById(userId);
  if (!user) throw new NotFoundError('User not found');
  await unlockAchievement(userId, achievementKey);
}

export async function revokeAchievementAdmin(userId: number, achievementKey: string): Promise<void> {
  if (!ACHIEVEMENT_DEFINITIONS[achievementKey]) {
    throw new ValidationError(`Invalid achievement key: ${achievementKey}`);
  }
  const user = await findUserById(userId);
  if (!user) throw new NotFoundError('User not found');
  await revokeAchievement(userId, achievementKey);
}

export async function grantHero(userId: number, heroKey: string): Promise<void> {
  if (!HERO_DEFINITIONS[heroKey]) {
    throw new ValidationError(`Invalid hero key: ${heroKey}`);
  }
  const user = await findUserById(userId);
  if (!user) throw new NotFoundError('User not found');
  const now = Math.floor(Date.now() / 1000);
  await unlockHero(userId, heroKey, now);
}

export async function revokeHero(userId: number, heroKey: string): Promise<void> {
  if (!HERO_DEFINITIONS[heroKey]) {
    throw new ValidationError(`Invalid hero key: ${heroKey}`);
  }
  const user = await findUserById(userId);
  if (!user) throw new NotFoundError('User not found');
  await deleteHero(userId, heroKey);
}

export async function cancelActivity(userId: number, activityKey: string): Promise<void> {
  const user = await findUserById(userId);
  if (!user) throw new NotFoundError('User not found');
  await removeActiveActivity(userId, activityKey);
}
