import { z } from 'zod';
import { UserRequirements } from '@common/domains/user/constants/user-requirements.constant';
import { RoleEnum } from '@common/domains/user/enums/role.enum';

export const CreateUserSchema = z.object({
  email: z
    .string()
    .min(1, "Email є обов'язковим")
    .max(UserRequirements.MaxEmailLength, 'Email не може бути довше ' + UserRequirements.MaxEmailLength + ' символів')
    .superRefine((val, ctx) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Неправильний формат email (відсутній домен, наприклад .com)',
        });
      }
    }),

  name: z
    .string()
    .min(1, "Ім'я є обов'язковим")
    .min(UserRequirements.MinNameLength, "Ім'я повинно бути не менше " + UserRequirements.MinNameLength + ' символів')
    .max(UserRequirements.MaxLoginLength, "Ім'я не може бути довше " + UserRequirements.MaxLoginLength + ' символів')
    .superRefine((val, ctx) => {
      const nameRegex = /^[a-zA-Z0-9._%+-]+$/;
      if (!nameRegex.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Ім'я містить недопустимі символи",
        });
      }
    }),

  password: z
    .string()
    .min(1, "Пароль є обов'язковим")
    .min(
      UserRequirements.MinPasswordLength,
      'Пароль повинен бути не менше ' + UserRequirements.MinPasswordLength + ' символів',
    )
    .max(
      UserRequirements.MaxPasswordLength,
      'Пароль не може бути довше ' + UserRequirements.MaxPasswordLength + ' символів',
    ),

  role: z.enum(Object.values(RoleEnum) as [string, ...string[]]).optional(),

  locale: z
    .string()
    .min(1, "Локаль є обов'язковою")
    .regex(/^[a-z]{2}(-[A-Z]{2})?$/, 'Невірний формат локалі (наприклад: uk, en, en-US)'),

  currencyCode: z
    .string()
    .min(1, "Код валюти є обов'язковим")
    .length(3, 'Код валюти повинен складатися з 3 символів (наприклад: UAH, USD, EUR)')
    .regex(/^[A-Z]{3}$/, 'Код валюти повинен містити лише великі латинські літери (наприклад: UAH, USD)'),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
