import { Router, Response, NextFunction } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { getUserUpgrades, buyUpgrade } from '../services/upgrade.js';

const router = Router();

router.get(
  '/api/upgrades',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const upgrades = getUserUpgrades(req.userId!);
      res.json(upgrades);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/api/upgrades/buy',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { upgradeKey } = req.body;
      const result = buyUpgrade(req.userId!, upgradeKey);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
