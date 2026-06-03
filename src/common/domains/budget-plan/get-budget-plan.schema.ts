import { z } from 'zod';
import { Month } from '@common/enums/month.enum';

export const GetBudgetPlanSchema = z.object({
  year: z.int({ error: 'Year must be a number' }).min(2000, { error: 'Year must be 2000 or later' }),
  month: z.union(
    Object.values(Month).map((v) => z.literal(v)) as [z.ZodLiteral<Month>, ...z.ZodLiteral<Month>[]],
    'Invalid month',
  ),
});

export type GetBudgetPlanDto = z.infer<typeof GetBudgetPlanSchema>;
