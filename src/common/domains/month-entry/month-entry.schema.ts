import z from 'zod';
import {
  createEntrySchema,
  type EntryBaseValidationMessages,
  DEFAULT_ENTRY_BASE_MESSAGES,
} from '@common/domains/entry-base/entry-base.schema';

export interface MonthEntryValidationMessages extends EntryBaseValidationMessages {
  selectedBoolean: string;
  priorityInteger: string;
  priorityMin: string;
  priorityMax: string;
  idInteger: string;
  idMin: string;
}

export const DEFAULT_MONTH_ENTRY_MESSAGES: MonthEntryValidationMessages = {
  ...DEFAULT_ENTRY_BASE_MESSAGES,
  selectedBoolean: 'budgetPlan.validation.selectedBoolean',
  priorityInteger: 'budgetPlan.validation.priorityInteger',
  priorityMin: 'budgetPlan.validation.priorityMin',
  priorityMax: 'budgetPlan.validation.priorityMax',
  idInteger: 'budgetPlan.validation.idInteger',
  idMin: 'budgetPlan.validation.idMin',
};

export function createMonthEntrySchema(messages: MonthEntryValidationMessages = DEFAULT_MONTH_ENTRY_MESSAGES) {
  return createEntrySchema(
    {
      selected: z.boolean({ error: messages.selectedBoolean }),
      priority: z
        .int({ error: messages.priorityInteger })
        .min(1, { error: messages.priorityMin })
        .max(10, { error: messages.priorityMax }),
    },
    messages,
  );
}

export function createMonthEntryWithIdSchema(messages: MonthEntryValidationMessages = DEFAULT_MONTH_ENTRY_MESSAGES) {
  return createEntrySchema(
    {
      id: z.int({ error: messages.idInteger }).min(1, { error: messages.idMin }).optional(),
      selected: z.boolean({ error: messages.selectedBoolean }),
      priority: z
        .int({ error: messages.priorityInteger })
        .min(1, { error: messages.priorityMin })
        .max(10, { error: messages.priorityMax }),
    },
    messages,
  );
}

// Server-side schemas with English defaults
export const MonthEntrySchema = createMonthEntrySchema();
export const MonthEntryWithIdSchema = createMonthEntryWithIdSchema();
