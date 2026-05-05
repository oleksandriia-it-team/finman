import { z } from 'zod';

export const ForgotPasswordSchema = z.object({
  email: z.string().min(1, "Email обов'язковий").email('Некоректний формат email'),
});

export type ForgotPasswordDto = z.infer<typeof ForgotPasswordSchema>;
