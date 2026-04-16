import { z } from 'zod';
import { RegularPaymentFrequency } from '@frontend/shared/enums/regular-freequency.enum';

export const RegularPaymentFormSchema = z.object({
  subtitle: z.string().min(1, 'Опис обовʼязковий').max(100, 'Максимум 100 символів'),
  type: z.enum(['income', 'expense', 'credit', 'savings'], {
    required_error: 'Оберіть тип платежу',
  }),
  category: z.string().min(1, 'Оберіть категорію'),
  amount: z
    .string()
    .min(1, 'Сума обовʼязкова')
    .refine((val) => Number(val) >= 1, { message: 'Мінімальна сума — 1' }),
  frequency: z.nativeEnum(RegularPaymentFrequency, {
    required_error: 'Оберіть частоту',
  }),
  dayOfMonth: z.coerce.number().min(1).max(31),
});

export type RegularPaymentFormData = z.infer<typeof RegularPaymentFormSchema>;
