import type { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { authConfig } from '../config/auth.js';
import { UserModel } from '../modules/users/user.model.js';

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const token = req.cookies?.[authConfig.cookieName];

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Authentication required.',
    });
    return;
  }

  try {
    const decoded = verify(token, authConfig.jwtSecret);

    if (
      typeof decoded === 'string' ||
      typeof decoded.sub !== 'string'
    ) {
      res.status(401).json({
        success: false,
        message: 'Invalid authentication token.',
      });
      return;
    }

    const user = await UserModel.findOne()
  .where('_id')
  .equals(decoded.sub);

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User account not found.',
      });
      return;
    }

    req.user = {
      id: user._id.toString(),
      role: user.role,
    };

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token.',
    });
  }
}