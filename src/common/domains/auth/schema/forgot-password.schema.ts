import { z } from 'zod';

export interface ForgotPasswordValidationMessages {
  emailRequired: string;
  emailInvalid: string;
}

const DEFAULT_MESSAGES: ForgotPasswordValidationMessages = {
  emailRequired: 'auth.forgotPassword.validation.emailRequired',
  emailInvalid: 'auth.forgotPassword.validation.emailInvalid',
};

export function createForgotPasswordSchema(messages: ForgotPasswordValidationMessages = DEFAULT_MESSAGES) {
  return z.object({
    email: z.string().min(1, messages.emailRequired).email(messages.emailInvalid),
  });
}

// Backward-compatible export with English defaults
export const ForgotPasswordSchema = createForgotPasswordSchema();
export type ForgotPasswordDto = z.infer<typeof ForgotPasswordSchema>;
