import { z } from 'zod';
import { TypeEntry } from '@common/enums/entry.enum';
import { AllCategoryValues } from '@common/enums/categories.enum';
import { createPaginatedSchema } from '@common/utils/create-paginated-schema.util';
import { MonthEntryRequirements } from '@common/domains/basic-entry/constants/basic-entry.constant';
import { RegularPaymentFrequency } from '@common/enums/regular-freequency.enum';

const RegularEntryTypes = [TypeEntry.Income, TypeEntry.Expense] as const;

export const RegularEntrySchema = z.object({
  id: z.number().int({ message: 'ID має бути цілим числом' }).min(1, { message: 'ID не може бути менше 1' }),

  title: z
    .string('Назва має бути строкою')
    .trim()
    .min(1, { message: "Назва обов'язкова" })
    .max(MonthEntryRequirements.MaxTitleLength, {
      message: `Назва не може бути довшою за ${MonthEntryRequirements.MaxTitleLength} символів`,
    }),

  description: z
    .string('Опис має бути строкою')
    .trim()
    .min(1, { message: "Опис обов'язковий" })
    .max(MonthEntryRequirements.MaxDescriptionLength, {
      message: `Опис не може бути довшим за ${MonthEntryRequirements.MaxDescriptionLength} символів`,
    }),

  sum: z.number({ message: 'Сума має бути числом' }).min(MonthEntryRequirements.MinSumValue, {
    message: `Мінімальна сума: ${MonthEntryRequirements.MinSumValue}`,
  }),

  frequency: z.enum(RegularPaymentFrequency, {
    error: 'Оберіть частоту',
  }),

  type: z.enum(RegularEntryTypes, { message: 'Оберіть коректний тип операції (дохід або витрата)' }),

  category: z.enum(AllCategoryValues, { message: 'Оберіть коректну категорію' }),

  dayOfMonth: z.coerce
    .number({ message: 'День місяця має бути числом' })
    .int({ message: 'День місяця має бути цілим числом' })
    .min(1, { message: 'День місяця не може бути менше 1' })
    .max(31, { message: 'День місяця не може бути більше 31' }),
});

export const RegularEntryFilterSchema = z.object({
  type: z.enum(RegularEntryTypes, { message: 'Оберіть коректний тип операції (дохід або витрата)' }).optional(),
  softDeleted: z
    .number({ message: 'Поле softDeleted має бути числом' })
    .min(0, { message: 'Поле softDeleted має бути 0 або 1' })
    .max(1, { message: 'Поле softDeleted має бути 0 або 1' })
    .optional(),
});

export const RegularEntryPaginationSchema = createPaginatedSchema(RegularEntryFilterSchema);
