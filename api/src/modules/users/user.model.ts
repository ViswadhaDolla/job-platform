
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer-not-to-say'],
    },

    profession: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

export type User = mongoose.InferSchemaType<typeof userSchema>;

export const UserModel =
  mongoose.models.User ?? mongoose.model('User', userSchema);
