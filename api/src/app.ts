import userRoutes from './modules/users/user.routes.js';
import jobRoutes from './modules/jobs/job.routes.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.APP_BASE_URL || 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
  }),
);

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Job Platform API is running',
  });
});
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
export default app;
