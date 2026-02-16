import { Router, Response, NextFunction } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { getInventory, useConsumable } from '../services/inventory.js';

const router = Router();

router.get(
  '/api/inventory',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = getInventory(req.userId!);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/api/inventory/use',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { itemKey } = req.body;
      const result = useConsumable(req.userId!, itemKey);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
