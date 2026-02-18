import { Router, Response, NextFunction } from 'express';

import { register, login, setNickname } from '../services/auth.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { findUserById } from '../db/queries/user-queries.js';

const router = Router();

router.post(
  '/api/auth/register',
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const result = await register(username, password);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/api/auth/login',
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const result = await login(username, password);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/api/auth/me',
  authMiddleware,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = await findUserById(req.userId!);
      res.json({
        user: {
          id: req.userId,
          username: req.username,
          nickname: user?.nickname ?? req.username,
          isAdmin: user ? !!user.is_admin : false,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  '/api/auth/nickname',
  authMiddleware,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { nickname } = req.body;
      const result = await setNickname(req.userId!, nickname);
      res.json({ nickname: result });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
