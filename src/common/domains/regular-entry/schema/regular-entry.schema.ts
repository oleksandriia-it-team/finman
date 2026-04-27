import { z } from 'zod';
import { TypeEntry } from '@common/enums/entry.enum';
import { createPaginatedSchema } from '@common/utils/create-paginated-schema.util';
import { RegularPaymentFrequency } from '@common/enums/regular-freequency.enum';
import { MonthEntryRequirements } from '@common/domains/basic-entry/constants/basic-entry.constant';
import { ExpenseCategories, IncomeCategories } from '@common/enums/categories.enum';

const RegularEntryTypes = [TypeEntry.Income, TypeEntry.Expense] as const;

const BaseEntry = z.object({
  title: z.string({ error: 'Введіть назву' }).trim().min(1).max(MonthEntryRequirements.MaxTitleLength),
  description: z.string().trim().min(1).max(MonthEntryRequirements.MaxDescriptionLength),
  sum: z.coerce.number({ error: 'Введіть суму' }).min(MonthEntryRequirements.MinSumValue),
  frequency: z.enum(RegularPaymentFrequency),
  dayOfMonth: z.number().min(1).max(31),
});

export const RegularEntrySchema = z.discriminatedUnion('type', [
  BaseEntry.extend({
    type: z.literal(TypeEntry.Income),
    category: z
      .enum(Object.values(IncomeCategories), {
        error: 'Оберіть коректну категорію доходів',
      })
      .optional(),
  }),
  BaseEntry.extend({
    type: z.literal(TypeEntry.Expense),
    category: z
      .enum(Object.values(ExpenseCategories), {
        error: 'Оберіть коректну категорію витрат',
      })
      .optional(),
  }),
]);

export const RegularEntryFilterSchema = z.object({
  type: z.enum(RegularEntryTypes, { message: 'Оберіть коректний тип операції (дохід або витрата)' }).optional(),
  softDeleted: z
    .number({ message: 'Поле softDeleted має бути числом' })
    .min(0, { message: 'Поле softDeleted має бути 0 або 1' })
    .max(1, { message: 'Поле softDeleted має бути 0 або 1' })
    .optional(),
});

export const RegularEntryPaginationSchema = createPaginatedSchema(RegularEntryFilterSchema);
