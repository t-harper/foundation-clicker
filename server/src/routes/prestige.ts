import { Router, Response, NextFunction } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import {
  previewPrestige,
  triggerPrestige,
  getPrestigeHistoryForUser,
} from '../services/prestige.js';

const router = Router();

router.get(
  '/api/prestige/preview',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = previewPrestige(req.userId!);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/api/prestige/trigger',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = triggerPrestige(req.userId!);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/api/prestige/history',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const history = getPrestigeHistoryForUser(req.userId!);
      res.json(history);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
