import { Router, Response, NextFunction } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import {
  getUserShips,
  buildShip,
  sendShip,
  recallShip,
} from '../services/ship.js';

const router = Router();

router.get(
  '/api/ships',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const ships = getUserShips(req.userId!);
      res.json(ships);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/api/ships/build',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { shipType, name } = req.body;
      const result = buildShip(req.userId!, shipType, name);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/api/ships/send',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { shipId, tradeRouteKey } = req.body;
      const result = sendShip(req.userId!, shipId, tradeRouteKey);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/api/ships/recall',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { shipId } = req.body;
      const result = recallShip(req.userId!, shipId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
