import { createRoute } from '@backend/shared/utils/create-route.util';
import { TrackingOperationPaginationSchema } from '@common/domains/lookups/schemas/tracking-operation.schema';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { trackingOperationRepository } from '@backend/entities/tracking-operation/infrastructure/tracking-operation.repository';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';

export const POST = createRoute({
  schema: TrackingOperationPaginationSchema.totalCountSchema,
  contextFn: GetUserIdTransformer,
  guards: [AuthGuard],
  execute: async ({ context, body: { filters } }) => {
    const userId = context as number;
    const count = await trackingOperationRepository.getTotalCount({
      ...filters,
      softDeleted: filters?.softDeleted,
      userId,
    });
    return {
      status: 200,
      data: count,
    };
  },
  filter: getDefaultApiErrorFilter,
});
