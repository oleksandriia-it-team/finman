import type { GetBudgetPlanDto } from '@common/domains/budget-plan/get-budget-plan.schema';
import type { Month } from 'date-fns';
import { z } from 'zod';

export const getBudgetPlanParamSchema = z
  .string()
  .regex(/^(0[1-9]|1[0-2])-\d{4}$/)
  .transform((val) => {
    const [mm, yyyy] = val.split('-');
    return {
      month: (Number.parseInt(mm, 10) - 1) as Month,
      year: Number.parseInt(yyyy, 10),
    };
  });

export function parseBudgetPlanDateParam(raw: string): { success: true; data: GetBudgetPlanDto } | { success: false } {
  const result = getBudgetPlanParamSchema.safeParse(raw);
  return result.success ? { success: true, data: result.data } : { success: false };
}
