import { z } from 'zod';
import { RoleEnum } from '@common/domains/user/enums/role.enum';
import { UserRequirements } from '@common/constants/user-requirements.constant';
import { CurrencyRequirements } from '@common/constants/currency-requirements.constant';
import { LatinPasswordPattern, LatinUsernamePattern } from '@common/constants/latin-pattern.constant';
import { SupportLanguages } from '@common/enums/support-languages.enum';

export interface CreateUserValidationMessages {
  emailRequired: string;
  emailMaxLength: string;
  emailInvalidFormat: string;
  nameRequired: string;
  nameMinLength: string;
  nameMaxLength: string;
  nameInvalidChars: string;
  passwordRequired: string;
  passwordMinLength: string;
  passwordMaxLength: string;
  passwordLatinOnly: string;
  localeRequired: string;
  localeFormat: string;
  currencyRequired: string;
  currencyCodeLength: string;
  currencyCodeFormat: string;
}

export const DEFAULT_CREATE_USER_MESSAGES: CreateUserValidationMessages = {
  emailRequired: 'auth.user.validation.emailRequired',
  emailMaxLength: 'auth.user.validation.emailMaxLength',
  emailInvalidFormat: 'auth.user.validation.emailInvalidFormat',
  nameRequired: 'auth.user.validation.nameRequired',
  nameMinLength: 'auth.user.validation.nameMinLength',
  nameMaxLength: 'auth.user.validation.nameMaxLength',
  nameInvalidChars: 'auth.user.validation.nameInvalidChars',
  passwordRequired: 'auth.user.validation.passwordRequired',
  passwordMinLength: 'auth.user.validation.passwordMinLength',
  passwordMaxLength: 'auth.user.validation.passwordMaxLength',
  passwordLatinOnly: 'auth.user.validation.passwordLatinOnly',
  localeRequired: 'auth.user.validation.localeRequired',
  localeFormat: 'auth.user.validation.localeFormat',
  currencyRequired: 'auth.user.validation.currencyRequired',
  currencyCodeLength: 'auth.user.validation.currencyCodeLength',
  currencyCodeFormat: 'auth.user.validation.currencyCodeFormat',
};

export function createCreateUserSchema(messages: CreateUserValidationMessages = DEFAULT_CREATE_USER_MESSAGES) {
  return z.object({
    email: z
      .string()
      .min(1, messages.emailRequired)
      .max(UserRequirements.MaxEmailLength, messages.emailMaxLength)
      .superRefine((val, ctx) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: messages.emailInvalidFormat,
          });
        }
      }),

    name: z
      .string()
      .min(1, messages.nameRequired)
      .min(UserRequirements.MinNameLength, messages.nameMinLength)
      .max(UserRequirements.MaxLoginLength, messages.nameMaxLength)
      .superRefine((val, ctx) => {
        if (!LatinUsernamePattern.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: messages.nameInvalidChars,
          });
        }
      }),

    password: z
      .string()
      .min(1, messages.passwordRequired)
      .min(UserRequirements.MinPasswordLength, messages.passwordMinLength)
      .max(UserRequirements.MaxPasswordLength, messages.passwordMaxLength)
      .regex(LatinPasswordPattern, messages.passwordLatinOnly),

    role: z.enum(Object.values(RoleEnum) as [string, ...string[]]).optional(),

    locale: z
      .string()
      .min(1, messages.localeRequired)
      .regex(/^[a-z]{2}(-[A-Z]{2})?$/, messages.localeFormat),

    currencyCode: z
      .string({ error: messages.currencyRequired })
      .min(1, messages.currencyRequired)
      .length(CurrencyRequirements.MaxCurrencyCodeLength, messages.currencyCodeLength)
      .regex(/^[A-Z]{3}$/, messages.currencyCodeFormat),

    language: z.nativeEnum(SupportLanguages).optional(),
  });
}

// Backward-compatible export with English defaults (used server-side)
export const CreateUserSchema = createCreateUserSchema();
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
