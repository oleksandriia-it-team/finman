import { z } from 'zod';
import { createPaginatedSchema } from '@common/utils/create-paginated-schema.util';
import { RegularPaymentFrequency } from '@common/enums/regular-freequency.enum';
import { TypeEntry } from '@common/enums/entry.enum';
import { createEntrySchema } from '@common/domains/entry-base/entry-base.schema';

const RegularEntryTypes = [TypeEntry.Income, TypeEntry.Expense] as const;

export const RegularEntrySchema = createEntrySchema({
  frequency: z.enum(RegularPaymentFrequency, { error: 'Введіть коректну частоту' }),
  dayOfMonth: z
    .int({ error: 'День місяця має бути числом' })
    .min(1, { error: 'День місяця має бути мінімум першого числа' })
    .max(31, { error: 'День місяця має бути максимум 31 числа' }),
});

export const RegularEntryFilterSchema = z.object({
  type: z.enum(RegularEntryTypes, { message: 'Оберіть коректний тип операції (дохід або витрата)' }).optional(),
  softDeleted: z
    .int({ message: 'Поле softDeleted має бути числом' })
    .min(0, { message: 'Поле softDeleted має бути 0 або 1' })
    .max(1, { message: 'Поле softDeleted має бути 0 або 1' })
    .optional(),
});

export const RegularEntryPaginationSchema = createPaginatedSchema(RegularEntryFilterSchema);
