const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret || jwtSecret.length < 32) {
  throw new Error(
    'JWT_SECRET must be configured with at least 32 characters.',
  );
}

export const authConfig = {
  jwtSecret,
  expiresIn: '1d' as const,
  cookieName: 'job_platform_token',
  cookieMaxAge: 24 * 60 * 60 * 1000,
};