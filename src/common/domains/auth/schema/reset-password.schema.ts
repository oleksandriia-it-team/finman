import z from 'zod';

export interface ResetPasswordValidationMessages {
  passwordMinLength: string;
  passwordsDoNotMatch: string;
}

const DEFAULT_MESSAGES: ResetPasswordValidationMessages = {
  passwordMinLength: 'Minimum 8 characters',
  passwordsDoNotMatch: 'Passwords do not match',
};

export function createResetPasswordSchema(messages: ResetPasswordValidationMessages = DEFAULT_MESSAGES) {
  return z
    .object({
      email: z.string().email(),
      code: z.string().length(6),
      password: z.string().min(8, messages.passwordMinLength),
      passwordConfirm: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: messages.passwordsDoNotMatch,
      path: ['passwordConfirm'],
    });
}

// Backward-compatible export with English defaults
export const ResetPasswordSchema = createResetPasswordSchema();
export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>;
