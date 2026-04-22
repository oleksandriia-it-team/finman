import { z } from 'zod';
import { CreateUserSchema } from '@common/domains/user/schema/user.schema';
import { WorkMode } from '@common/enums/work-mode.enum';

export const GlobalRegisterSchema = CreateUserSchema.omit({ role: true })
  .extend({
    email: z.string().email('Неправильний формат email').optional().or(z.literal('')),

    password: z.string().optional().or(z.literal('')),

    passwordConfirm: z.string().optional().or(z.literal('')),
    workMode: z.nativeEnum(WorkMode).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.workMode) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Будь ласка, оберіть режим роботи',
        path: ['workMode'],
      });
      return;
    }
    if (data.workMode === WorkMode.Online) {
      if (!data.email || data.email.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email обов'язковий для онлайн-режиму",
          path: ['email'],
        });
      }
      if (!data.password || data.password.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Пароль має бути не менше 8 символів',
          path: ['password'],
        });
      }
      if (data.password !== data.passwordConfirm) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Паролі не збігаються',
          path: ['passwordConfirm'],
        });
      }
    }
  });

export type GlobalRegisterDto = z.infer<typeof GlobalRegisterSchema>;
