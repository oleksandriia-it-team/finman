import { createRoute } from '@backend/shared/utils/create-route.util';
import { TrackingOperationStatisticSchema } from '@common/domains/tracking-operation/schema/tracking-operation.schema';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { trackingOperationRepository } from '@backend/entities/tracking-operation/infrastructure/tracking-operation.repository';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';

export const POST = createRoute({
  schema: TrackingOperationStatisticSchema,
  contextFn: GetUserIdTransformer,
  guards: [AuthGuard],
  execute: async ({ context, body }) => {
    const userId = context as number;
    const data = await trackingOperationRepository.getBasicInformation({
      ...body,
      userId,
    });

    return {
      status: 200,
      data,
    };
  },
  filter: getDefaultApiErrorFilter,
});
