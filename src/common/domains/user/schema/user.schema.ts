import { z } from 'zod';
import { RoleEnum } from '@common/domains/user/enums/role.enum';
import { UserRequirements } from '@common/constants/user-requirements.constant';
import { CurrencyRequirements } from '@common/constants/currency-requirements.constant';
import { LatinPasswordPattern, LatinUsernamePattern } from '@common/constants/latin-pattern.constant';

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
  emailRequired: 'Email is required',
  emailMaxLength: `Email cannot exceed ${UserRequirements.MaxEmailLength} characters`,
  emailInvalidFormat: 'Invalid email format (missing domain, e.g. .com)',
  nameRequired: 'Name is required',
  nameMinLength: `Name must be at least ${UserRequirements.MinNameLength} characters`,
  nameMaxLength: `Name cannot exceed ${UserRequirements.MaxLoginLength} characters`,
  nameInvalidChars: 'Name contains invalid characters',
  passwordRequired: 'Password is required',
  passwordMinLength: `Password must be at least ${UserRequirements.MinPasswordLength} characters`,
  passwordMaxLength: `Password cannot exceed ${UserRequirements.MaxPasswordLength} characters`,
  passwordLatinOnly: 'Password can only contain Latin characters and special symbols',
  localeRequired: 'Locale is required',
  localeFormat: 'Invalid locale format (e.g., uk, en, en-US)',
  currencyRequired: 'Please select a currency',
  currencyCodeLength: `Currency code must be ${CurrencyRequirements.MaxCurrencyCodeLength} characters (e.g., UAH, USD, EUR)`,
  currencyCodeFormat: 'Currency code must contain only uppercase Latin letters (e.g., UAH, USD)',
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
  });
}

// Backward-compatible export with English defaults (used server-side)
export const CreateUserSchema = createCreateUserSchema();
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
