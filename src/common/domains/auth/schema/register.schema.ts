import { z } from 'zod';
import { CreateUserSchema } from '@common/domains/user/schema/user.schema';

export const RegisterSchema = CreateUserSchema.omit({ role: true })
  .extend({
    passwordConfirm: z.string().min(1, 'Будь ласка, підтвердьте свій пароль'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Паролі не збігаються',
    path: ['passwordConfirm'],
  });

export type RegisterDto = z.infer<typeof RegisterSchema>;
