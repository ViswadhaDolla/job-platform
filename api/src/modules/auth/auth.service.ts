import argon2 from 'argon2';
import { UserModel } from '../users/user.model.js';

export async function loginUser(email: string, password: string) {
  const user = await UserModel.findOne()
    .where('email')
    .equals(email.toLowerCase())
    .select('+passwordHash');

  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const isPasswordValid = await argon2.verify(
    user.passwordHash,
    password,
  );

  if (!isPasswordValid) {
    throw new Error('INVALID_CREDENTIALS');
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    gender: user.gender,
    profession: user.profession,
    role: user.role,
  };
}