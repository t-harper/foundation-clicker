import { Router, Response, NextFunction } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { loadGameState } from '../services/game-state.js';

const router = Router();

router.get(
  '/api/game/load',
  authMiddleware,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = await loadGameState(req.userId!);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
