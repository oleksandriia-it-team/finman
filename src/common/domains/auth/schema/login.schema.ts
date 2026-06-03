import { z } from 'zod';
import { UserRequirements } from '@common/constants/user-requirements.constant';
import { LatinPasswordPattern, LatinUsernamePattern } from '@common/constants/latin-pattern.constant';
import { type SixCodeMessages, buildSixCodeSchema } from '@common/schema-fields/six-code.schema';

export interface LoginValidationMessages {
  loginRequired: string;
  loginMaxLength: string;
  emailInvalidFormat: string;
  usernameMinLength: string;
  loginInvalidChars: string;
  passwordRequired: string;
  passwordMinLength: string;
  passwordMaxLength: string;
  passwordLatinOnly: string;
  codeMessages?: SixCodeMessages;
}

const DEFAULT_MESSAGES: LoginValidationMessages = {
  loginRequired: 'Login or email is required',
  loginMaxLength: `Login cannot exceed ${UserRequirements.MaxLoginLength} characters`,
  emailInvalidFormat: 'Invalid email format (missing domain, e.g. .com)',
  usernameMinLength: `Username must be at least ${UserRequirements.MinNameLength} characters`,
  loginInvalidChars: 'Login contains invalid characters',
  passwordRequired: 'Password is required',
  passwordMinLength: `Password must be at least ${UserRequirements.MinPasswordLength} characters`,
  passwordMaxLength: `Password cannot exceed ${UserRequirements.MaxPasswordLength} characters`,
  passwordLatinOnly: 'Password can only contain Latin characters and special symbols',
};

export const buildLoginSchema = (
  codeIsRequired: boolean = false,
  messages: LoginValidationMessages = DEFAULT_MESSAGES,
) =>
  z.object({
    login: z
      .string()
      .min(1, messages.loginRequired)
      .max(UserRequirements.MaxLoginLength, messages.loginMaxLength)
      .superRefine((val, ctx) => {
        if (val.includes('@')) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(val)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: messages.emailInvalidFormat,
            });
          }
        } else {
          if (val.length < UserRequirements.MinNameLength) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: messages.usernameMinLength,
            });
          }

          if (!LatinUsernamePattern.test(val)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: messages.loginInvalidChars,
            });
          }
        }
      }),

    password: z
      .string()
      .min(1, messages.passwordRequired)
      .min(UserRequirements.MinPasswordLength, messages.passwordMinLength)
      .max(UserRequirements.MaxPasswordLength, messages.passwordMaxLength)
      .regex(LatinPasswordPattern, messages.passwordLatinOnly),
    code: codeIsRequired
      ? buildSixCodeSchema(messages.codeMessages)
      : z.union([buildSixCodeSchema(messages.codeMessages), z.literal('')]).optional(),
  });

export type LoginDto = z.infer<ReturnType<typeof buildLoginSchema>>;
