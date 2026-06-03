import { z } from 'zod';
import { MonthEntryRequirements } from '@common/domains/basic-entry/constants/basic-entry.constant';
import { TypeEntry } from '@common/enums/entry.enum';
import { ExpenseCategories, IncomeCategories } from '@common/enums/categories.enum';

export interface EntryBaseValidationMessages {
  titleRequired: string;
  titleMaxLength: string;
  descriptionMaxLength: string;
  sumRequired: string;
  sumMin: string;
  incomeCategoryInvalid: string;
  expenseCategoryInvalid: string;
}

export const DEFAULT_ENTRY_BASE_MESSAGES: EntryBaseValidationMessages = {
  titleRequired: 'Title is required',
  titleMaxLength: `Title max length: ${MonthEntryRequirements.MaxTitleLength} characters`,
  descriptionMaxLength: `Description max length: ${MonthEntryRequirements.MaxDescriptionLength} characters`,
  sumRequired: 'Enter amount',
  sumMin: `Amount must be at least ${MonthEntryRequirements.MinSumValue}`,
  incomeCategoryInvalid: 'Select a valid income category',
  expenseCategoryInvalid: 'Select a valid expense category',
};

function buildEntryFirstPart(messages: EntryBaseValidationMessages) {
  return z.object({
    title: z
      .string({ error: messages.titleRequired })
      .trim()
      .min(1, { error: messages.titleRequired })
      .max(MonthEntryRequirements.MaxTitleLength, { error: messages.titleMaxLength }),
    description: z
      .string()
      .trim()
      .max(MonthEntryRequirements.MaxDescriptionLength, { error: messages.descriptionMaxLength })
      .default(''),
    sum: z.coerce.number({ error: messages.sumRequired }).min(MonthEntryRequirements.MinSumValue, {
      error: messages.sumMin,
    }),
  });
}

export const createEntrySchema = <T extends z.ZodRawShape>(
  extraFields: T,
  messages: EntryBaseValidationMessages = DEFAULT_ENTRY_BASE_MESSAGES,
) => {
  const EntryBaseSchemaFirstPart = buildEntryFirstPart(messages);
  return z.discriminatedUnion('type', [
    EntryBaseSchemaFirstPart.extend({
      type: z.literal(TypeEntry.Income),
      category: z
        .enum(Object.values(IncomeCategories), {
          error: messages.incomeCategoryInvalid,
        })
        .optional(),
      ...extraFields,
    }),
    EntryBaseSchemaFirstPart.extend({
      type: z.literal(TypeEntry.Expense),
      category: z
        .enum(Object.values(ExpenseCategories), {
          error: messages.expenseCategoryInvalid,
        })
        .optional(),
      ...extraFields,
    }),
  ]);
};

export const createUpdateEntrySchema = <T extends z.ZodRawShape>(
  extraFields: T,
  messages: EntryBaseValidationMessages = DEFAULT_ENTRY_BASE_MESSAGES,
) => {
  const EntryBaseSchemaFirstPart = buildEntryFirstPart(messages);
  const EntryBaseSchemaWithoutSum = EntryBaseSchemaFirstPart.omit({ sum: true });
  return z.discriminatedUnion('type', [
    EntryBaseSchemaWithoutSum.extend({
      type: z.literal(TypeEntry.Income),
      category: z
        .enum(Object.values(IncomeCategories), {
          error: messages.incomeCategoryInvalid,
        })
        .optional(),
      ...extraFields,
    }),
    EntryBaseSchemaWithoutSum.extend({
      type: z.literal(TypeEntry.Expense),
      category: z
        .enum(Object.values(ExpenseCategories), {
          error: messages.expenseCategoryInvalid,
        })
        .optional(),
      ...extraFields,
    }),
  ]);
};
