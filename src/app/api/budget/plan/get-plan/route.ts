import { createRoute } from '@backend/shared/utils/create-route.util';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { GetBudgetPlanSchema } from '@common/domains/budget-plan/get-budget-plan.schema';
import { budgetPlanRepository } from '@backend/entities/budget-plan/infrastructure/budget-plan.repository';

export const POST = createRoute({
  schema: GetBudgetPlanSchema,
  contextFn: GetUserIdTransformer,
  guards: [AuthGuard],
  execute: async ({ body, context }) => {
    const userId = context as number;

    return {
      status: 200,
      data: await budgetPlanRepository.getItem(body, userId),
    };
  },
  filter: getDefaultApiErrorFilter,
});
