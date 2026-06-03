import { z } from 'zod';
import { SupportLanguages } from '@common/enums/support-languages.enum';
import { UserRequirements } from '@common/constants/user-requirements.constant';
import { LatinPasswordPattern, LatinUsernamePattern } from '@common/constants/latin-pattern.constant';

export interface ProfileSettingsValidationMessages {
  nameRequired: string;
  nameMinLength: string;
  nameMaxLength: string;
  nameInvalidChars: string;
  localeRequired: string;
  localeFormat: string;
  languageRequired: string;
  currentPasswordRequired: string;
  newPasswordMinLength: string;
  newPasswordLatinOnly: string;
  newPasswordLettersAndDigits: string;
  passwordsDoNotMatch: string;
}

const DEFAULT_MESSAGES: ProfileSettingsValidationMessages = {
  nameRequired: 'userSettings.profileValidation.nameRequired',
  nameMinLength: 'userSettings.profileValidation.nameMinLength',
  nameMaxLength: 'userSettings.profileValidation.nameMaxLength',
  nameInvalidChars: 'userSettings.profileValidation.nameInvalidChars',
  localeRequired: 'userSettings.profileValidation.localeRequired',
  localeFormat: 'userSettings.profileValidation.localeFormat',
  languageRequired: 'userSettings.profileValidation.languageRequired',
  currentPasswordRequired: 'userSettings.profileValidation.currentPasswordRequired',
  newPasswordMinLength: 'userSettings.profileValidation.newPasswordMinLength',
  newPasswordLatinOnly: 'userSettings.profileValidation.newPasswordLatinOnly',
  newPasswordLettersAndDigits: 'userSettings.profileValidation.newPasswordLettersAndDigits',
  passwordsDoNotMatch: 'userSettings.profileValidation.passwordsDoNotMatch',
};

export function createProfileSettingsSchema(messages: ProfileSettingsValidationMessages = DEFAULT_MESSAGES) {
  const nameSchema = z
    .string()
    .trim()
    .min(1, messages.nameRequired)
    .min(UserRequirements.MinNameLength, messages.nameMinLength)
    .max(UserRequirements.MaxLoginLength, messages.nameMaxLength)
    .regex(LatinUsernamePattern, messages.nameInvalidChars);

  const localeSchema = z
    .string()
    .trim()
    .min(1, messages.localeRequired)
    .regex(/^[a-z]{2}(-[A-Z]{2})?$/, messages.localeFormat);

  const optionalPasswordSchema = z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? value : undefined));

  return z
    .object({
      name: nameSchema,
      locale: localeSchema,
      language: z.enum(SupportLanguages, { error: messages.languageRequired }),
      currentPassword: optionalPasswordSchema,
      newPassword: optionalPasswordSchema,
      confirmPassword: optionalPasswordSchema,
    })
    .superRefine((data, ctx) => {
      const hasPasswordChange = Boolean(data.currentPassword || data.newPassword || data.confirmPassword);

      if (!hasPasswordChange) {
        return;
      }

      if (!data.currentPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['currentPassword'],
          message: messages.currentPasswordRequired,
        });
      }

      if (!data.newPassword || data.newPassword.length < UserRequirements.MinPasswordLength) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['newPassword'],
          message: messages.newPasswordMinLength,
        });
      } else if (!LatinPasswordPattern.test(data.newPassword)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['newPassword'],
          message: messages.newPasswordLatinOnly,
        });
      } else if (!/^(?=.*[a-zA-Z])(?=.*\d)/.test(data.newPassword)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['newPassword'],
          message: messages.newPasswordLettersAndDigits,
        });
      }

      if (data.newPassword !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['confirmPassword'],
          message: messages.passwordsDoNotMatch,
        });
      }
    });
}

// Backward-compatible export with English defaults
export const ProfileSettingsSchema = createProfileSettingsSchema();
export type ProfileSettingsFormData = z.input<typeof ProfileSettingsSchema>;
export type ProfileSettingsData = z.infer<typeof ProfileSettingsSchema>;
