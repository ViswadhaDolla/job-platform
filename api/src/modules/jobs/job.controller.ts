
import type { Request, Response } from 'express';
import { JobModel } from './job.model.js';
import { createJobSchema } from './job.validation.js';

export async function getPublishedJobs(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const jobs = await JobModel.find()
  .where('status')
  .equals('published')
      .select('-__v')
      .sort({ postedAt: -1, createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error: unknown) {
    console.error('Failed to fetch published jobs:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs.',
    });
  }
}

export async function createJob(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const validation = createJobSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid job details.',
        errors: validation.error.flatten().fieldErrors,
      });
      return;
    }

    const job = await JobModel.create({
      ...validation.data,
      status: 'draft',
    });

    res.status(201).json({
      success: true,
      message: 'Job saved as a draft successfully.',
      data: job,
    });
  } catch (error: unknown) {
    console.error('Failed to create job:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to create job.',
    });
  }
}
