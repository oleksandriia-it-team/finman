import { z } from 'zod';
import {
  createCreateUserSchema,
  type CreateUserValidationMessages,
  DEFAULT_CREATE_USER_MESSAGES,
} from '@common/domains/user/schema/user.schema';
import { WorkMode } from '@common/enums/work-mode.enum';
import { UserRequirements } from '@common/constants/user-requirements.constant';

export interface SignUpFormValidationMessages {
  invalidEmail: string;
  workModeRequired: string;
  currencyRequired: string;
  emailRequiredOnline: string;
  passwordMinLength: string;
  passwordsDoNotMatch: string;
}

export const DEFAULT_SIGNUP_FORM_MESSAGES: SignUpFormValidationMessages = {
  invalidEmail: 'auth.signup.validation.invalidEmail',
  workModeRequired: 'auth.signup.validation.workModeRequired',
  currencyRequired: 'auth.signup.validation.currencyRequired',
  emailRequiredOnline: 'auth.signup.validation.emailRequiredOnline',
  passwordMinLength: 'auth.signup.validation.passwordMinLength',
  passwordsDoNotMatch: 'auth.signup.validation.passwordsDoNotMatch',
};

export function createSignUpFormSchema(
  userMessages: CreateUserValidationMessages = DEFAULT_CREATE_USER_MESSAGES,
  signupMessages: SignUpFormValidationMessages = DEFAULT_SIGNUP_FORM_MESSAGES,
) {
  return createCreateUserSchema(userMessages)
    .omit({ role: true })
    .extend({
      email: z
        .string()
        .email(signupMessages.invalidEmail)
        .max(UserRequirements.MaxEmailLength)
        .optional()
        .or(z.literal('')),

      password: z.string().max(UserRequirements.MaxPasswordLength).optional().or(z.literal('')),

      passwordConfirm: z.string().optional().or(z.literal('')),

      locale: z.string().optional().or(z.literal('')),

      workMode: z.nativeEnum(WorkMode, { message: signupMessages.workModeRequired }).optional(),

      currencyCode: createCreateUserSchema(userMessages).shape.currencyCode.optional().or(z.literal('')),
    })
    .superRefine((data, ctx) => {
      if (!data.workMode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: signupMessages.workModeRequired,
          path: ['workMode'],
        });
        return;
      }
      if (!data.currencyCode || data.currencyCode.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: signupMessages.currencyRequired,
          path: ['currencyCode'],
        });
      }

      if (data.workMode === WorkMode.Online) {
        if (!data.email || data.email.trim() === '') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: signupMessages.emailRequiredOnline,
            path: ['email'],
          });
        }
        if (!data.password || data.password.length < UserRequirements.MinPasswordLength) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: signupMessages.passwordMinLength,
            path: ['password'],
          });
        }
        if (data.password !== data.passwordConfirm) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: signupMessages.passwordsDoNotMatch,
            path: ['passwordConfirm'],
          });
        }
      }
    });
}

// Backward-compatible export with English defaults
export const SignUpFormSchema = createSignUpFormSchema();
export type SignUpFormInput = z.infer<typeof SignUpFormSchema>;
