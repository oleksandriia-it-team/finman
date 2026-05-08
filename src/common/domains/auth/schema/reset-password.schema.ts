import z from 'zod';

export const ResetPasswordSchema = z
  .object({
    email: z.string().email(),
    code: z.string().length(6),
    password: z.string().min(8, 'Мінімум 8 символів'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Паролі не збігаються',
    path: ['passwordConfirm'],
  });

export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>;
