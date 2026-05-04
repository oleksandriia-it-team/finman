import { z } from 'zod';
import { Month } from '@common/enums/month.enum';

export const GetBudgetPlanSchema = z.object({
  year: z.int({ error: 'Рік має бути числом' }).min(2000, { error: 'Рік має бути не раніше 2000' }),
  month: z.union(
    Object.values(Month).map((v) => z.literal(v)) as [z.ZodLiteral<Month>, ...z.ZodLiteral<Month>[]],
    'Невірний місяць',
  ),
});

export type GetBudgetPlanModel = z.infer<typeof GetBudgetPlanSchema>;
