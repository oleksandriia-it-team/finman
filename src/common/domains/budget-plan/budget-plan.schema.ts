import z from 'zod';
import { MonthEntrySchema, MonthEntryWithIdSchema } from '@common/domains/month-entry/month-entry.schema';

export const CreateBudgetPlanSchema = z.object({
  otherEntries: z.array(MonthEntrySchema, { error: 'budgetPlan.validation.invalidEntriesFormat' }),
  plannedRegularEntryIds: z.array(z.int({ error: 'budgetPlan.validation.entryIdInteger' }).min(1), {
    error: 'budgetPlan.validation.invalidRegularEntriesFormat',
  }),
});

export const UpdateBudgetPlanSchema = z.object({
  otherEntries: z.array(MonthEntryWithIdSchema, { error: 'budgetPlan.validation.invalidEntriesFormat' }),
  plannedRegularEntryIds: z.array(z.int({ error: 'budgetPlan.validation.entryIdInteger' }).min(1), {
    error: 'budgetPlan.validation.invalidRegularEntriesFormat',
  }),
});

export type CreateBudgetPlanDto = z.infer<typeof CreateBudgetPlanSchema>;
export type UpdateBudgetPlanDto = z.infer<typeof UpdateBudgetPlanSchema>;
