import z from 'zod';
import { MonthEntrySchema, MonthEntryWithIdSchema } from '@common/domains/month-entry/month-entry.schema';

export const CreateBudgetPlanSchema = z.object({
  otherEntries: z.array(MonthEntrySchema, { error: 'Невірний формат записів' }),
  plannedRegularEntryIds: z.array(z.int({ error: 'Id має бути числом' }).min(1), {
    error: 'Невірний формат регулярних записів',
  }),
});

export const UpdateBudgetPlanSchema = z.object({
  otherEntries: z.array(MonthEntryWithIdSchema, { error: 'Невірний формат записів' }),
  plannedRegularEntryIds: z.array(z.int({ error: 'Id має бути числом' }).min(1), {
    error: 'Невірний формат регулярних записів',
  }),
});

export type CreateBudgetPlanModel = z.infer<typeof CreateBudgetPlanSchema>;
export type UpdateBudgetPlanModel = z.infer<typeof UpdateBudgetPlanSchema>;
