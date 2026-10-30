import type { Request, Response } from 'express';
import { registerUser } from './user.service.js';
import { registerUserSchema } from './user.validation.js';

export async function register(
  req: Request,
  res: Response,
): Promise<void> {
  const validation = registerUserSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      success: false,
      message: 'Invalid registration details.',
      errors: validation.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const user = await registerUser(validation.data);

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      data: user,
    });
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message === 'EMAIL_ALREADY_EXISTS'
    ) {
      res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      });
      return;
    }

    console.error('Registration failed:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to create account.',
    });
  }
}