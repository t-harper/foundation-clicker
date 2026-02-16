import { Router, Response, NextFunction } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import {
  getUserBuildings,
  buyBuilding,
  sellBuilding,
} from '../services/building.js';

const router = Router();

router.get(
  '/api/buildings',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const buildings = getUserBuildings(req.userId!);
      res.json(buildings);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/api/buildings/buy',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { buildingKey, amount } = req.body;
      const result = buyBuilding(req.userId!, buildingKey, amount);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/api/buildings/sell',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { buildingKey, amount } = req.body;
      const result = sellBuilding(req.userId!, buildingKey, amount);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
