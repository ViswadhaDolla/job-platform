import './config/env.js';
import mongoose from 'mongoose';

export async function connectToDatabase(): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl || !databaseUrl.startsWith('mongodb')) {
    throw new Error(
      'DATABASE_URL is missing or invalid. Check the root .env file.',
    );
  }

  await mongoose.connect(databaseUrl);

  console.log('Connected to MongoDB successfully.');
}
