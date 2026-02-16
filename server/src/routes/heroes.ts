import { Router, Response, NextFunction } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { getHeroes } from '../services/hero.js';

const router = Router();

router.get(
  '/api/heroes',
  authMiddleware,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const heroes = await getHeroes(req.userId!);
      res.json({ heroes });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
