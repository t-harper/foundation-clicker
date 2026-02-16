import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.js';
import { findUserById } from '../db/queries/user-queries.js';
import { ForbiddenError } from './error-handler.js';

export async function adminMiddleware(
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = await findUserById(req.userId!);
    if (!user || user.is_admin !== 1) {
      throw new ForbiddenError('Admin access required');
    }
    next();
  } catch (err) {
    next(err);
  }
}
