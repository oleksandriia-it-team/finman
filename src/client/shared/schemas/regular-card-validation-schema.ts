import { z } from 'zod';
import { RegularPaymentFrequency } from '@common/enums/regular-freequency.enum';
import { TypeEntry } from '@common/enums/entry.enum';
import { AllCategoryValues } from '@common/enums/categories.enum';

export const RegularPaymentFormSchema = z.object({
  title: z.string('Назва має бути рядком').trim().min(1, 'Назва обовʼязкова').max(20, 'Максимум 20 символів'),

  description: z
    .string('Опис має бути рядком')
    .trim()
    .max(100, 'Опис має містити не більше 100 символів')
    .optional()
    .or(z.literal('')),

  category: z
    .enum(AllCategoryValues, {
      error: () => ({ message: 'Оберіть категорію' }),
    })
    .default('expense-misc'),

  type: z.enum([TypeEntry.Income, TypeEntry.Expense], {
    error: () => ({ message: 'Оберіть тип платежу' }),
  }),

  sum: z.coerce
    .number({
      message: 'Сума має бути числом',
    })
    .min(1, 'Мінімальна сума — 1'),

  frequency: z.nativeEnum(RegularPaymentFrequency, {
    error: 'Оберіть частоту',
  }),

  dayOfMonth: z.coerce.number().min(1).max(31),
});

export type RegularPaymentFormData = z.infer<typeof RegularPaymentFormSchema>;
