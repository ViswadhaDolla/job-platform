
import mongoose, { Schema } from 'mongoose';

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    company: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      trim: true,
      default: 'Not specified',
    },
    workMode: {
      type: String,
      enum: ['remote', 'hybrid', 'onsite', 'unknown'],
      default: 'unknown',
    },
    employmentType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship', 'temporary'],
      default: 'full-time',
    },
    experienceLevel: {
      type: String,
      trim: true,
    },
    professionCategory: {
      type: String,
      trim: true,
    },
    salaryText: {
      type: String,
      trim: true,
    },
    sourceUrl: {
      type: String,
      trim: true,
    },
    applicationUrl: {
      type: String,
      trim: true,
    },
    referralUrl: {
      type: String,
      trim: true,
    },
    postedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived', 'rejected', 'ingestion_failed'],
      default: 'draft',
      index: true,
    },
    extractionMetadata: {
      type: Schema.Types.Mixed,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

jobSchema.index({
  title: 'text',
  company: 'text',
  description: 'text',
});

export type Job = mongoose.InferSchemaType<typeof jobSchema>;

export const JobModel =
  mongoose.models.Job ?? mongoose.model('Job', jobSchema);
