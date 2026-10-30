import argon2 from 'argon2';
import { UserModel } from './user.model.js';
import type { z } from 'zod';
import type { registerUserSchema } from './user.validation.js';

type RegisterUserInput = z.infer<typeof registerUserSchema>;

export async function registerUser(input: RegisterUserInput) {
  const existingUser = await UserModel.findOne()
  .where('email')
  .equals(input.email);

  if (existingUser) {
    throw new Error('EMAIL_ALREADY_EXISTS');
  }

  const passwordHash = await argon2.hash(input.password);

  const user = await UserModel.create({
    name: input.name,
    email: input.email,
    passwordHash,
    gender: input.gender,
    profession: input.profession,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    gender: user.gender,
    profession: user.profession,
    role: user.role,
  };
}