import { z } from 'zod';

export const serverSchema = z.object({
  DB_HOST: z.string().min(1, 'DB_HOST is required (e.g. localhost or 127.0.0.1)'),

  DB_PORT: z
    .string()
    .regex(/^\d+$/, 'DB_PORT must be a numeric string')
    .transform(Number)
    .refine((port) => port > 0 && port <= 65535, {
      message: 'DB_PORT must be in the range 1–65535',
    }),
  DB_USERNAME: z.string().min(1, 'DB_USERNAME is required'),
  DB_PASSWORD: z.string().min(1, 'DB_PASSWORD cannot be empty'),
  DB_DATABASE: z.string().min(1, 'DB_DATABASE is required'),
  JWT_SECRET: z
    .string()
    .min(32, 'Security risk: JWT_SECRET must be at least 32 characters')
    .refine((s) => !s.includes('secret') && !s.includes('password'), {
      message: "JWT_SECRET is too weak: avoid common words like 'secret' or 'password'",
    }),
  RESEND_FROM: z
    .string()
    .email('RESEND_FROM must be a valid email address')
    .min(1, 'RESEND_FROM is required (must be from your Resend domain)'),
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is required'),
});
