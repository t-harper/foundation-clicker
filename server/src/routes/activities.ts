import { Router, Response, NextFunction } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { getActivities, startActivity, collectActivity } from '../services/activity.js';

const router = Router();

router.get(
  '/api/activities',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = getActivities(req.userId!);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/api/activities/start',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { activityKey, heroKey } = req.body;
      const result = startActivity(req.userId!, activityKey, heroKey);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/api/activities/collect',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { activityKey } = req.body;
      const result = collectActivity(req.userId!, activityKey);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
