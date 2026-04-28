import z from 'zod';
import { createEntrySchema } from '@common/domains/entry-base/entry-base.schema';

export const MonthEntrySchema = createEntrySchema({
  selected: z.boolean({ error: 'Поле selected має бути булевим' }),
});
