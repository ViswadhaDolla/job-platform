
import { Router } from 'express';
import { getPublishedJobs } from './job.controller.js';

const router = Router();

router.get('/', getPublishedJobs);

export default router;
