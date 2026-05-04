import { z } from 'zod';
import { SupportLanguages, type SupportLanguages as SupportLanguage } from '@common/enums/support-languages.enum';
import { UserRequirements } from '@common/constants/user-requirements.constant';

const nameSchema = z
  .string()
  .trim()
  .min(1, "Ім'я користувача обов'язкове")
  .min(UserRequirements.MinNameLength, `Ім'я має містити щонайменше ${UserRequirements.MinNameLength} символи`)
  .max(UserRequirements.MaxLoginLength, `Ім'я не може бути довше ${UserRequirements.MaxLoginLength} символів`)
  .regex(/^[a-zA-Z0-9._%+-]+$/, "Ім'я містить недопустимі символи");

const localeSchema = z
  .string()
  .trim()
  .min(1, 'Локаль обов’язкова')
  .regex(/^[a-z]{2}(-[A-Z]{2})?$/, 'Невірний формат локалі');

const optionalPasswordSchema = z
  .string()
  .trim()
  .optional()
  .transform((value) => value || undefined);

const supportedLanguages = Object.values(SupportLanguages) as [SupportLanguage, ...SupportLanguage[]];

export const ProfileSettingsSchema = z
  .object({
    name: nameSchema,
    locale: localeSchema,
    language: z.enum(supportedLanguages, {
      message: 'Оберіть мову',
    }),
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
        message: 'Введіть поточний пароль',
      });
    }

    if (!data.newPassword || data.newPassword.length < UserRequirements.MinPasswordLength) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['newPassword'],
        message: `Пароль має містити щонайменше ${UserRequirements.MinPasswordLength} символів`,
      });
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(data.newPassword)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['newPassword'],
        message: 'Пароль має містити літери та цифри',
      });
    }

    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'Паролі не збігаються',
      });
    }
  });

export type ProfileSettingsFormData = z.input<typeof ProfileSettingsSchema>;
export type ProfileSettingsData = z.infer<typeof ProfileSettingsSchema>;
