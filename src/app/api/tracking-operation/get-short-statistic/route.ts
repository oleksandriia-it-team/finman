import { createRoute } from '@backend/shared/utils/create-route.util';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { trackingOperationRepository } from '@backend/entities/tracking-operation/infrastructure/tracking-operation.repository';
import { getDefaultApiErrorFilter } from '../../shared/get-api-error-filter.util';

export const GET = createRoute({
  contextFn: GetUserIdTransformer,
  guards: [AuthGuard],
  execute: async ({ context }) => {
    const userId = context as number;

    const data = await trackingOperationRepository.getShortStatistic({ userId });

    return {
      status: 200,
      data,
    };
  },
  filter: getDefaultApiErrorFilter,
});
