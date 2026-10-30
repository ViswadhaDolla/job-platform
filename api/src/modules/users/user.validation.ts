import { z } from 'zod';

export const registerUserSchema = z.object({
  name: z.string().trim().min(2).max(100),

  email: z
    .string()
    .trim()
    .email()
    .max(254)
    .transform((email) => email.toLowerCase()),

  password: z
    .string()
    .min(8, 'Password must contain at least 8 characters.')
    .max(128, 'Password cannot exceed 128 characters.'),

  gender: z
    .enum(['male', 'female', 'other', 'prefer-not-to-say'])
    .optional(),

  profession: z.string().trim().max(100).optional(),
});