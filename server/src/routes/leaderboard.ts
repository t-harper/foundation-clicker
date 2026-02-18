import { Router, Request, Response, NextFunction } from 'express';
import { getLeaderboard } from '../services/leaderboard.js';
import { ValidationError } from '../middleware/error-handler.js';
import type { LeaderboardCategory } from '@foundation/shared';

const router = Router();

const VALID_CATEGORIES: LeaderboardCategory[] = [
  'lifetimeCredits', 'totalSeldonPoints', 'prestigeCount', 'currentEra', 'totalAchievements'
];

// Public endpoint - no auth required
router.get(
  '/api/leaderboard',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = (req.query.category as string) || 'lifetimeCredits';
      if (!VALID_CATEGORIES.includes(category as LeaderboardCategory)) {
        throw new ValidationError(`Invalid category. Must be one of: ${VALID_CATEGORIES.join(', ')}`);
      }
      const result = await getLeaderboard(category as LeaderboardCategory);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
