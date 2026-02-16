import { Router, Response, NextFunction } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import {
  getUserAchievements,
  checkAchievements,
} from '../services/achievement.js';

const router = Router();

router.get(
  '/api/achievements',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const achievements = getUserAchievements(req.userId!);
      res.json(achievements);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/api/achievements/check',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = checkAchievements(req.userId!);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
