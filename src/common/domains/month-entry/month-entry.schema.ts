import z from 'zod';
import { createEntrySchema } from '@common/domains/entry-base/entry-base.schema';

export const MonthEntrySchema = createEntrySchema({
  selected: z.boolean({ error: 'Поле selected має бути булевим' }),
  priority: z
    .int({ error: 'Поле пріоритету має бути числом' })
    .min(1, { error: 'Поле пріоритету має бути мінімум 1' })
    .max(10, { error: 'Поле пріоритету має бути максимум 10' }),
});

export const MonthEntryWithIdSchema = createEntrySchema({
  id: z.int({ error: 'Id має бути числом' }).min(1, { error: 'Id має бути позитивним числом' }).optional(),
  selected: z.boolean({ error: 'Поле selected має бути булевим' }),
});
