import z from 'zod';
import { createEntrySchema } from '@common/domains/entry-base/entry-base.schema';

export const MonthEntrySchema = createEntrySchema({
  selected: z.boolean({ error: 'Поле selected має бути булевим' }),
});

export const MonthEntryWithIdSchema = createEntrySchema({
  id: z.int({ error: 'Id має бути числом' }).min(1, { error: 'Id має бути позитивним числом' }).optional(),
  selected: z.boolean({ error: 'Поле selected має бути булевим' }),
});
