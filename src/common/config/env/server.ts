import 'server-only';
import { z } from 'zod';

export const serverSchema = z.object({
  DB_HOST: z.string().min(1, "Адреса хоста є обов'язковою (наприклад, localhost або 127.0.0.1)"),

  DB_PORT: z
    .string()
    .regex(/^\d+$/, 'Порт має бути числовим рядком')
    .transform(Number)
    .refine((port) => port > 0 && port <= 65535, {
      message: 'Порт має бути в діапазоні від 1 до 65535',
    }),
  DB_USERNAME: z.string().min(1, "Ім'я користувача бази даних є обов'язковим"),
  DB_PASSWORD: z.string().min(1, 'Пароль бази даних не може бути порожнім'),
  DB_DATABASE: z.string().min(1, "Ім'я бази даних є обов'язковим"),
  JWT_SECRET: z
    .string()
    .min(32, 'Ризик безпеки: JWT_SECRET має містити щонайменше 32 символи')
    .refine((s) => !s.includes('secret') && !s.includes('password'), {
      message: "JWT_SECRET занадто слабкий: уникайте використання поширених слів, таких як 'secret' або 'password'",
    }),
});
