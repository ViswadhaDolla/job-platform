
import './config/env.js';
import app from './app.js';
import { connectToDatabase } from './db.js';

const port = Number(process.env.PORT) || 4000;

async function startServer(): Promise<void> {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`Job Platform API running at http://localhost:${port}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Failed to start the API:', error);
  process.exit(1);
});
