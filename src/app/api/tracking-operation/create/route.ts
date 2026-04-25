import { TrackingOperationSchema } from '@common/domains/tracking-operation/schema/tracking-operation.schema';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { createRoute } from '@backend/shared/utils/create-route.util';
import { trackingOperationRepository } from '@backend/entities/tracking-operation/infrastructure/tracking-operation.repository';

export const POST = createRoute({
  schema: TrackingOperationSchema.omit({ id: true }),
  contextFn: GetUserIdTransformer,
  guards: [AuthGuard],
  execute: async ({ context, body }) => {
    const userId = context as number;

    const { description, ...restBody } = body;

    const id = await trackingOperationRepository.createItem({
      ...restBody,
      description: description ?? null,
      userId,
    });

    return { status: 200, data: id };
  },
  filter: getDefaultApiErrorFilter,
});
