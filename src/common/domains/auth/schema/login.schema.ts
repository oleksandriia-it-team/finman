import { z } from 'zod';

export const LoginSchema = z.object({
  login: z
    .string()
    .min(1, "Логін або email є обов'язковим")
    .max(255, 'Логін не може бути довше 255 символів')
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
        if (val.length < 4) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Ім'я користувача повинно бути не менше 4 символів",
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
    .min(8, 'Пароль повинен бути не менше 8 символів')
    .max(255, 'Пароль не може бути довше 255 символів'),
});
export type LoginDto = z.infer<typeof LoginSchema>;
