import type { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import { loginUser } from './auth.service.js';
import { loginSchema } from './auth.validation.js';
import { authConfig } from '../../config/auth.js';

export async function login(
  req: Request,
  res: Response,
): Promise<void> {
  const validation = loginSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      success: false,
      message: 'Invalid login details.',
      errors: validation.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const user = await loginUser(
      validation.data.email,
      validation.data.password,
    );

    const token = sign(
      { sub: String(user.id) },
      authConfig.jwtSecret,
      { expiresIn: authConfig.expiresIn },
    );

    res.cookie(authConfig.cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: authConfig.cookieMaxAge,
      path: '/',
    });

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: { user },
    });
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message === 'INVALID_CREDENTIALS'
    ) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
      return;
    }

    console.error('Login failed:', error);

    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.',
    });
  }
}

export function logout(
  _req: Request,
  res: Response,
): void {
  res.clearCookie(authConfig.cookieName, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  res.status(200).json({
    success: true,
    message: 'Logout successful.',
  });
}