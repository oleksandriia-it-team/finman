import z from 'zod';
import { MonthEntrySchema } from '@common/domains/month-entry/month-entry.schema';
import { GetBudgetPlanSchema } from '@common/domains/budget-plan/get-budget-plan.schema';

export const BudgetPlanSchema = GetBudgetPlanSchema.extend({
  otherEntries: z.array(MonthEntrySchema, { error: 'Невірний формат записів' }),
  plannedRegularEntryIds: z.array(z.int({ error: 'Id має бути числом' }).min(1), {
    error: 'Невірний формат регулярних записів',
  }),
});
