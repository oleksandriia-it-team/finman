import { z } from 'zod';

export const LoginSchema = z.object({
  login: z
    .union([
      z.string().email('Invalid email address'),
      z
        .string()
        .regex(/^[a-zA-Z0-9._%+-]+$/, 'Invalid username format')
        .min(4, 'Login is required'),
    ])
    .and(z.string().max(255)),
  password: z.string().min(8, 'Password is required').max(255),
});

export type LoginDto = z.infer<typeof LoginSchema>;
