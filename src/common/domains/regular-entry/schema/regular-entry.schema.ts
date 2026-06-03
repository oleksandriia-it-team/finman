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
  frequencyInvalid: 'regular.validation.frequencyInvalid',
  dayInteger: 'regular.validation.dayInteger',
  dayMin: 'regular.validation.dayMin',
  dayMax: 'regular.validation.dayMax',
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
  type: z.enum(RegularEntryTypes, { message: 'admin.validation.invalidStatus' }).optional(),
  softDeleted: z
    .int({ message: 'admin.validation.fieldMustBeNumber' })
    .min(0, { message: 'admin.validation.invalidRange' })
    .max(1, { message: 'admin.validation.invalidRange' })
    .optional(),
});

export const RegularEntryPaginationSchema = createPaginatedSchema(RegularEntryFilterSchema);
