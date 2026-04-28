import { z } from 'zod';
import { MonthEntryRequirements } from '@common/domains/basic-entry/constants/basic-entry.constant';
import { TypeEntry } from '@common/enums/entry.enum';
import { ExpenseCategories, IncomeCategories } from '@common/enums/categories.enum';

const EntryBaseSchemaFirstPart = z.object({
  title: z
    .string({ error: 'Введіть назву' })
    .trim()
    .min(1)
    .max(MonthEntryRequirements.MaxTitleLength, {
      error: `Максимальна довжина заголовку: ${MonthEntryRequirements.MaxTitleLength} символів`,
    }),
  description: z
    .string()
    .trim()
    .min(1)
    .max(MonthEntryRequirements.MaxDescriptionLength, {
      error: `Максимальна довжина опису: ${MonthEntryRequirements.MaxDescriptionLength} символів`,
    }),
  sum: z.coerce.number({ error: 'Введіть суму' }).min(MonthEntryRequirements.MinSumValue, {
    error: `Мінімальна довжина суми: ${MonthEntryRequirements.MinSumValue}`,
  }),
});

export const createEntrySchema = <T extends z.ZodRawShape>(extraFields: T) =>
  z.discriminatedUnion('type', [
    EntryBaseSchemaFirstPart.extend({
      type: z.literal(TypeEntry.Income),
      category: z
        .enum(Object.values(IncomeCategories), {
          error: 'Оберіть коректну категорію доходів',
        })
        .optional(),
      ...extraFields,
    }),
    EntryBaseSchemaFirstPart.extend({
      type: z.literal(TypeEntry.Expense),
      category: z
        .enum(Object.values(ExpenseCategories), {
          error: 'Оберіть коректну категорію витрат',
        })
        .optional(),
      ...extraFields,
    }),
  ]);
