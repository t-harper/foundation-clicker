import { Router, Response, NextFunction } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import {
  checkForEvent,
  handleEventChoice,
  getUserActiveEffects,
  getUserEventHistory,
} from '../services/event.js';

const router = Router();

router.post(
  '/api/events/check',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = checkForEvent(req.userId!);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/api/events/choose',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { eventKey, choiceIndex } = req.body;
      const result = handleEventChoice(req.userId!, eventKey, choiceIndex);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/api/events/active-effects',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const activeEffects = getUserActiveEffects(req.userId!);
      res.json({ activeEffects });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/api/events/history',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const history = getUserEventHistory(req.userId!);
      res.json({ history });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
