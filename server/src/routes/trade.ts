import { Router, Response, NextFunction } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import {
  getUserTradeRoutes,
  unlockTradeRoute,
} from '../services/trade.js';

const router = Router();

router.get(
  '/api/trade-routes',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const routes = getUserTradeRoutes(req.userId!);
      res.json(routes);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/api/trade-routes/unlock',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { routeKey } = req.body;
      const result = unlockTradeRoute(req.userId!, routeKey);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
