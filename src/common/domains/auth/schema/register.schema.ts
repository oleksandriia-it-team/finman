import { z } from 'zod';
import { CreateUserSchema } from '@common/domains/user/schema/user.schema';

export const RegisterSchema = CreateUserSchema.omit({ role: true })
  .extend({
    passwordConfirm: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  });

export type RegisterDto = z.infer<typeof RegisterSchema>;
