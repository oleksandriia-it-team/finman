import { createRoute } from '@backend/shared/utils/create-route.util';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { MonthlyIncomeExpensesFilterSchema } from '@common/domains/analytics/analytics.schema';
import { getMonthlyIncomeExpensesApiUseCase } from '@backend/features/analytics/get-monthly-income-expenses.api.use-case';
import { getDefaultApiErrorFilter } from '../../../shared/get-api-error-filter.util';

export const POST = createRoute({
  schema: MonthlyIncomeExpensesFilterSchema,
  contextFn: GetUserIdTransformer,
  guards: [AuthGuard],
  execute: async ({ context, body }) => {
    const userId = context as number;
    const data = await getMonthlyIncomeExpensesApiUseCase.execute({ ...body, userId });

    return { status: 200, data };
  },
  filter: getDefaultApiErrorFilter,
});
