import { z } from 'zod';
import { Month } from '@common/enums/month.enum';

export const GetBudgetPlanSchema = z.object({
  year: z.int({ error: 'budgetPlan.validation.yearInteger' }).min(2000, { error: 'budgetPlan.validation.yearMin' }),
  month: z.union(
    Object.values(Month).map((v) => z.literal(v)) as [z.ZodLiteral<Month>, ...z.ZodLiteral<Month>[]],
    'budgetPlan.validation.invalidMonth',
  ),
});

export type GetBudgetPlanDto = z.infer<typeof GetBudgetPlanSchema>;
