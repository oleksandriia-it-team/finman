import { createRoute } from '@backend/shared/utils/create-route.util';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { budgetPlanRepository } from '@backend/entities/budget-plan/infrastructure/budget-plan.repository';
import type { Month } from '@common/enums/month.enum';
import { BudgetPlanSchema } from '@common/domains/budget-plan/budget-plan.schema';
import { NotExistBudgetPlanGuard } from '@backend/entities/budget-plan/application/not-exist-budget-plan.guard';
import type { BudgetPlanOrm } from '@backend/entities/budget-plan/infrastructure/budget-plan.orm';
import { createBudgetPlanApiUseCase } from '@backend/features/budget-plan/create-budget-plan.api.use-case';
import { TypeEntry } from '@common/enums/entry.enum';
import { ExpenseCategories, IncomeCategories } from '@common/enums/categories.enum';

export const POST = createRoute({
  schema: BudgetPlanSchema,
  contextFn: async (request): Promise<{ userId: number | null; budgetPlan: BudgetPlanOrm | null }> => {
    const userId = await GetUserIdTransformer(request);

    if (!userId) {
      return {
        userId,
        budgetPlan: null,
      };
    }

    const budgetPlan = await budgetPlanRepository.getItem(
      new Date().getUTCMonth() as unknown as Month,
      new Date().getUTCFullYear(),
      userId,
    );

    return {
      userId,
      budgetPlan,
    };
  },
  guards: [AuthGuard, ({ context: { budgetPlan } }) => NotExistBudgetPlanGuard(budgetPlan)],
  execute: async ({ context, body }) => {
    const userId = context.userId as number;

    const id = await createBudgetPlanApiUseCase.execute({
      ...body,
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
      data: id,
    };
  },
  filter: getDefaultApiErrorFilter,
});
