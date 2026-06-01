import { createRoute } from '@backend/shared/utils/create-route.util';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { getDefaultApiErrorFilter } from '../../../shared/get-api-error-filter.util';
import { GetBudgetPlanSchema } from '@common/domains/budget-plan/get-budget-plan.schema';
import { budgetPlanRepository } from '@backend/entities/budget-plan/infrastructure/budget-plan.repository';
import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import { mapBudgetPlanOrmToInterface } from '@backend/entities/budget-plan/application/map-orm-to-interface';

export const POST = createRoute({
  schema: GetBudgetPlanSchema,
  contextFn: GetUserIdTransformer,
  guards: [AuthGuard],
  execute: async ({ body, context }) => {
    const userId = context as number;

    const result = await budgetPlanRepository.getItem({ ...body, userId });

    return {
      status: 200,
      data: (result ? mapBudgetPlanOrmToInterface(result) : null) satisfies BudgetPlanDetailed | null,
    };
  },
  filter: getDefaultApiErrorFilter,
});
