import { createRoute } from '@backend/shared/utils/create-route.util';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { TypeEntry } from '@common/enums/entry.enum';
import { ExpenseCategories, IncomeCategories } from '@common/enums/categories.enum';
import { BudgetPlanSchema } from '@common/domains/budget-plan/budget-plan.schema';
import type { BudgetPlanOrm } from '@backend/entities/budget-plan/infrastructure/budget-plan.orm';
import { budgetPlanRepository } from '@backend/entities/budget-plan/infrastructure/budget-plan.repository';
import { ExistBudgetPlanGuard } from '@backend/entities/budget-plan/application/exist-budget-plan.guard';
import { updateBudgetPlanApiUseCase } from '@backend/features/budget-plan/update-budget-plan.api.use-case';
import { getCurrentMonthDate } from '@common/domains/budget-plan/get-current-month-date-util';
import type { BudgetPlanContext } from '../current-month-context.model';

export const PUT = createRoute({
  schema: BudgetPlanSchema,
  contextFn: async (request): Promise<BudgetPlanContext> => {
    const userId = await GetUserIdTransformer(request);

    const date = getCurrentMonthDate();

    if (!userId) {
      return {
        ...date,
        userId,
        budgetPlan: null,
      };
    }

    const budgetPlan = await budgetPlanRepository.getItem(date, userId);

    return {
      ...date,
      userId,
      budgetPlan,
    };
  },
  guards: [AuthGuard, ({ context: { budgetPlan } }) => ExistBudgetPlanGuard(budgetPlan)],
  execute: async ({ context, body }) => {
    const userId = context.userId as number;
    const budgetPlan = context.budgetPlan as BudgetPlanOrm;

    const result = await updateBudgetPlanApiUseCase.execute({
      ...body,
      id: budgetPlan.id,
      otherEntries: body.otherEntries.map((entry) => {
        const defCategory =
          'type' in entry && entry.type === TypeEntry.Income ? IncomeCategories.Misc : ExpenseCategories.Misc;

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
