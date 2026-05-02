import { createRoute } from '@backend/shared/utils/create-route.util';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { UpdateBudgetPlanSchema } from '@common/domains/budget-plan/budget-plan.schema';
import type { BudgetPlanOrm } from '@backend/entities/budget-plan/infrastructure/budget-plan.orm';
import { ExistBudgetPlanGuard } from '@backend/entities/budget-plan/application/exist-budget-plan.guard';
import { updateBudgetPlanApiUseCase } from '@backend/features/budget-plan/update-budget-plan.api.use-case';
import { getDefaultCategory } from '@common/domains/budget-plan/get-default-category.util';
import { getCurrentMonthBudgetPlanContext } from '../current-month-context.util';

export const PUT = createRoute({
  schema: UpdateBudgetPlanSchema,
  contextFn: getCurrentMonthBudgetPlanContext,
  guards: [AuthGuard, ({ context: { budgetPlan } }) => ExistBudgetPlanGuard(budgetPlan)],
  execute: async ({ context, body }) => {
    const userId = context.userId as number;
    const budgetPlan = context.budgetPlan as BudgetPlanOrm;

    const result = await updateBudgetPlanApiUseCase.execute({
      month: context.month,
      year: context.year,
      currentOtherEntries: budgetPlan.otherEntries,
      ...body,
      id: budgetPlan.id,
      otherEntries: body.otherEntries.map((entry) => {
        const defCategory = getDefaultCategory(entry.type);

        return {
          ...entry,
          category: entry.category ?? defCategory,
        };
      }),
      userId,
    });
    return {
      status: 200,
      data: result,
    };
  },
  filter: getDefaultApiErrorFilter,
});
