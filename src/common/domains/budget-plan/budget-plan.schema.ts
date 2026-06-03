import z from 'zod';
import { MonthEntrySchema, MonthEntryWithIdSchema } from '@common/domains/month-entry/month-entry.schema';

export const CreateBudgetPlanSchema = z.object({
  otherEntries: z.array(MonthEntrySchema, { error: 'Invalid entries format' }),
  plannedRegularEntryIds: z.array(z.int({ error: 'Id must be a number' }).min(1), {
    error: 'Invalid regular entries format',
  }),
});

export const UpdateBudgetPlanSchema = z.object({
  otherEntries: z.array(MonthEntryWithIdSchema, { error: 'Invalid entries format' }),
  plannedRegularEntryIds: z.array(z.int({ error: 'Id must be a number' }).min(1), {
    error: 'Invalid regular entries format',
  }),
});

export type CreateBudgetPlanDto = z.infer<typeof CreateBudgetPlanSchema>;
export type UpdateBudgetPlanDto = z.infer<typeof UpdateBudgetPlanSchema>;
