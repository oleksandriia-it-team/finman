import { createRoute } from '@backend/shared/utils/create-route.util';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { CreateBudgetPlanSchema } from '@common/domains/budget-plan/budget-plan.schema';
import { NotExistBudgetPlanGuard } from '@backend/entities/budget-plan/application/not-exist-budget-plan.guard';
import { createBudgetPlanApiUseCase } from '@backend/features/budget-plan/create-budget-plan.api.use-case';
import { getDefaultCategory } from '@common/domains/budget-plan/get-default-category.util';
import { getCurrentMonthBudgetPlanContext } from '../current-month-context.util';

export const POST = createRoute({
  schema: CreateBudgetPlanSchema,
  contextFn: getCurrentMonthBudgetPlanContext,
  guards: [AuthGuard, ({ context: { budgetPlan } }) => NotExistBudgetPlanGuard(budgetPlan)],
  execute: async ({ context, body }) => {
    const userId = context.userId as number;

    const result = await createBudgetPlanApiUseCase.execute({
      month: context.month,
      year: context.year,
      ...body,
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
