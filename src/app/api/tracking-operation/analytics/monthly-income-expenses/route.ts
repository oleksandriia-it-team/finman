import { createRoute } from '@backend/shared/utils/create-route.util';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { trackingOperationRepository } from '@backend/entities/tracking-operation/infrastructure/tracking-operation.repository';
import { MonthlyIncomeExpensesFilterSchema } from '@common/domains/analytics/analytics.schema';
import { getDefaultApiErrorFilter } from '../../../shared/get-api-error-filter.util';

export const POST = createRoute({
  schema: MonthlyIncomeExpensesFilterSchema,
  contextFn: GetUserIdTransformer,
  guards: [AuthGuard],
  execute: async ({ context, body }) => {
    const userId = context as number;
    const data = await trackingOperationRepository.getMonthlyIncomeExpenses(userId, body);

    return { status: 200, data };
  },
  filter: getDefaultApiErrorFilter,
});
