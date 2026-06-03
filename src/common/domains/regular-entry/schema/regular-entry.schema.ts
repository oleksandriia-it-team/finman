import { z } from 'zod';
import { createPaginatedSchema } from '@common/utils/create-paginated-schema.util';
import { RegularPaymentFrequency } from '@common/enums/regular-freequency.enum';
import { TypeEntry } from '@common/enums/entry.enum';
import {
  createEntrySchema,
  createUpdateEntrySchema,
  type EntryBaseValidationMessages,
  DEFAULT_ENTRY_BASE_MESSAGES,
} from '@common/domains/entry-base/entry-base.schema';

const RegularEntryTypes = [TypeEntry.Income, TypeEntry.Expense] as const;

export interface RegularEntryValidationMessages extends EntryBaseValidationMessages {
  frequencyInvalid: string;
  dayInteger: string;
  dayMin: string;
  dayMax: string;
}

export const DEFAULT_REGULAR_ENTRY_MESSAGES: RegularEntryValidationMessages = {
  ...DEFAULT_ENTRY_BASE_MESSAGES,
  frequencyInvalid: 'Enter a valid frequency',
  dayInteger: 'Day of month must be a number',
  dayMin: 'Day of month must be at least 1',
  dayMax: 'Day of month must be at most 31',
};

function buildRegularEntryExtraFields(messages: RegularEntryValidationMessages) {
  return {
    frequency: z.enum(RegularPaymentFrequency, { error: messages.frequencyInvalid }),
    dayOfMonth: z
      .int({ error: messages.dayInteger })
      .min(1, { error: messages.dayMin })
      .max(31, { error: messages.dayMax }),
  };
}

export function createRegularEntrySchemas(messages: RegularEntryValidationMessages = DEFAULT_REGULAR_ENTRY_MESSAGES) {
  const extraFields = buildRegularEntryExtraFields(messages);
  return {
    RegularEntrySchema: createEntrySchema(extraFields, messages),
    UpdateRegularEntrySchema: createUpdateEntrySchema(extraFields, messages),
  };
}

// Server-side schemas with English defaults
const _defaultSchemas = createRegularEntrySchemas();
export const RegularEntrySchema = _defaultSchemas.RegularEntrySchema;
export const UpdateRegularEntrySchema = _defaultSchemas.UpdateRegularEntrySchema;

export const RegularEntryFilterSchema = z.object({
  type: z.enum(RegularEntryTypes, { message: 'Select a valid operation type (income or expense)' }).optional(),
  softDeleted: z
    .int({ message: 'Field softDeleted must be a number' })
    .min(0, { message: 'Field softDeleted must be 0 or 1' })
    .max(1, { message: 'Field softDeleted must be 0 or 1' })
    .optional(),
});

export const RegularEntryPaginationSchema = createPaginatedSchema(RegularEntryFilterSchema);
