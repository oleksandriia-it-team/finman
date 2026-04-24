import { z } from 'zod';
import { UserRequirements } from '@common/constants/user-requirements.constant';

export const LoginSchema = z.object({
  login: z
    .string()
    .min(1, "Логін або email є обов'язковим")
    .max(
      UserRequirements.MaxLoginLength,
      'Логін не може бути довше ' + UserRequirements.MaxPasswordLength + ' символів',
    )
    .superRefine((val, ctx) => {
      if (val.includes('@')) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Неправильний формат email (відсутній домен, наприклад .com)',
          });
        }
      } else {
        if (val.length < UserRequirements.MinNameLength) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Ім'я користувача повинно бути не менше " + UserRequirements.MinNameLength + ' символів',
          });
        }

        const loginRegex = /^[a-zA-Z0-9._%+-]+$/;
        if (!loginRegex.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Логін містить недопустимі символи',
          });
        }
      }
    }),

  password: z
    .string()
    .min(1, "Пароль є обов'язковим")
    .min(
      UserRequirements.MinPasswordLength,
      'Пароль повинен бути не менше ' + UserRequirements.MinPasswordLength + ' символів',
    )
    .max(255, 'Пароль не може бути довше ' + UserRequirements.MaxPasswordLength + ' символів'),
});
export type LoginDto = z.infer<typeof LoginSchema>;
