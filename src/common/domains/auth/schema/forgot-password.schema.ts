import { z } from 'zod';

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Некоректний формат email').min(1, "Email обов'язковий"),
});

export type ForgotPasswordDto = z.infer<typeof ForgotPasswordSchema>;
