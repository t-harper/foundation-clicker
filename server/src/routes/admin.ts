import { Router, Response, NextFunction } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { adminMiddleware } from '../middleware/admin.js';
import {
  listUsers,
  getUserFullState,
  impersonateUser,
  deleteUser,
  forcePasswordChange,
  setAdminLevel,
  updateResources,
  updateEra,
  updatePrestige,
  updateBuildingAdmin,
  setUpgradePurchased,
  deleteShipAdmin,
  grantAchievement,
  revokeAchievementAdmin,
  grantHero,
  revokeHero,
  cancelActivity,
} from '../services/admin.js';

const router = Router();

// All admin routes require auth + admin
const adminAuth = [authMiddleware, adminMiddleware];

function paramStr(value: string | string[]): string {
  return Array.isArray(value) ? value[0] : value;
}

function paramInt(value: string | string[]): number {
  return parseInt(paramStr(value), 10);
}

// List users
router.get(
  '/api/admin/users',
  ...adminAuth,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const users = await listUsers();
      res.json({ users });
    } catch (err) {
      next(err);
    }
  }
);

// Impersonate user
router.post(
  '/api/admin/users/:userId/impersonate',
  ...adminAuth,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = await impersonateUser(paramInt(req.params.userId));
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

// Delete user
router.delete(
  '/api/admin/users/:userId',
  ...adminAuth,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await deleteUser(req.userId!, paramInt(req.params.userId));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

// Force password change
router.post(
  '/api/admin/users/:userId/password',
  ...adminAuth,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await forcePasswordChange(paramInt(req.params.userId), req.body.newPassword);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

// Toggle admin
router.patch(
  '/api/admin/users/:userId/admin',
  ...adminAuth,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await setAdminLevel(paramInt(req.params.userId), req.body.isAdmin);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

// Get full game state
router.get(
  '/api/admin/users/:userId/state',
  ...adminAuth,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const state = await getUserFullState(paramInt(req.params.userId));
      res.json(state);
    } catch (err) {
      next(err);
    }
  }
);

// Set resources
router.patch(
  '/api/admin/users/:userId/resources',
  ...adminAuth,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await updateResources(paramInt(req.params.userId), req.body);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

// Set era
router.patch(
  '/api/admin/users/:userId/era',
  ...adminAuth,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await updateEra(paramInt(req.params.userId), req.body.era);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

// Set prestige
router.patch(
  '/api/admin/users/:userId/prestige',
  ...adminAuth,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await updatePrestige(paramInt(req.params.userId), req.body);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

// Set building count
router.patch(
  '/api/admin/users/:userId/buildings/:key',
  ...adminAuth,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await updateBuildingAdmin(paramInt(req.params.userId), paramStr(req.params.key), req.body.count);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

// Set upgrade purchased state
router.patch(
  '/api/admin/users/:userId/upgrades/:key',
  ...adminAuth,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await setUpgradePurchased(paramInt(req.params.userId), paramStr(req.params.key), req.body.isPurchased);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

// Delete ship
router.delete(
  '/api/admin/users/:userId/ships/:shipId',
  ...adminAuth,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await deleteShipAdmin(paramInt(req.params.userId), paramStr(req.params.shipId));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

// Grant achievement
router.post(
  '/api/admin/users/:userId/achievements/:key',
  ...adminAuth,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await grantAchievement(paramInt(req.params.userId), paramStr(req.params.key));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

// Revoke achievement
router.delete(
  '/api/admin/users/:userId/achievements/:key',
  ...adminAuth,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await revokeAchievementAdmin(paramInt(req.params.userId), paramStr(req.params.key));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

// Grant hero
router.post(
  '/api/admin/users/:userId/heroes/:key',
  ...adminAuth,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await grantHero(paramInt(req.params.userId), paramStr(req.params.key));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

// Revoke hero
router.delete(
  '/api/admin/users/:userId/heroes/:key',
  ...adminAuth,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await revokeHero(paramInt(req.params.userId), paramStr(req.params.key));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

// Cancel activity
router.delete(
  '/api/admin/users/:userId/activities/:key',
  ...adminAuth,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await cancelActivity(paramInt(req.params.userId), paramStr(req.params.key));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
