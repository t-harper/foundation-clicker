import { Router, Response, NextFunction } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import {
  loadGameState,
  saveGameState,
  handleClick,
  resetGame,
  getGameStats,
} from '../services/game-state.js';

const router = Router();

router.get(
  '/api/game/load',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = loadGameState(req.userId!);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/api/game/save',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      saveGameState(req.userId!, req.body);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/api/game/click',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { clicks } = req.body;
      const result = handleClick(req.userId!, clicks);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/api/game/reset',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      resetGame(req.userId!);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/api/game/stats',
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = getGameStats(req.userId!);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
