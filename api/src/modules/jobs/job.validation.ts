
import { z } from 'zod';

export const createJobSchema = z.object({
  title: z.string().trim().min(2).max(200),

  company: z.string().trim().min(2).max(150),

  description: z.string().trim().min(20),

  requirements: z.array(z.string().trim()).optional(),

  location: z.string().trim().optional(),

  workMode: z
    .enum(['remote', 'hybrid', 'onsite', 'unknown'])
    .optional(),

  employmentType: z
    .enum(['full-time', 'part-time', 'contract', 'internship', 'temporary'])
    .optional(),

  experienceLevel: z.string().trim().optional(),

  professionCategory: z.string().trim().optional(),

  salaryText: z.string().trim().optional(),

  sourceUrl: z.string().url().optional(),

  applicationUrl: z.string().url().optional(),

  referralUrl: z.string().url().optional(),

  postedAt: z.coerce.date().optional(),
}).refine(
  (data) =>
    !data.referralUrl || data.applicationUrl,
  {
    message: 'An application URL is required when a referral URL is provided.',
    path: ['applicationUrl'],
  },
);
