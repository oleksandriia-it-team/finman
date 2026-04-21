import { z } from 'zod';
import { RegularPaymentFrequency } from '@common/enums/regular-freequency.enum';
import { TypeEntry } from '@common/enums/entry.enum';

export const RegularPaymentFormSchema = z.object({
  title: z.string().trim().min(1, 'Назва обовʼязкова').max(100, 'Максимум 100 символів'),

  description: z.string().trim().optional(),

  category: z.string().default('misc'),

  type: z.nativeEnum(TypeEntry, {
    error: () => ({ message: 'Оберіть тип платежу' }),
  }),

  sum: z.coerce
    .number({
      invalid_type_error: 'Сума має бути числом',
      required_error: 'Сума обовʼязкова',
    })
    .min(1, 'Мінімальна сума — 1'),

  frequency: z.nativeEnum(RegularPaymentFrequency, {
    error: 'Оберіть частоту',
  }),

  dayOfMonth: z.coerce.number().min(1).max(31),
});

export type RegularPaymentFormData = z.infer<typeof RegularPaymentFormSchema>;
