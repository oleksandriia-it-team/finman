import { createRoute } from '@backend/shared/utils/create-route.util';
import { TrackingOperationSchema } from '@common/domains/lookups/schemas/tracking-operation.schema';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { GetIntegerParamPipe } from '@backend/shared/pipes/get-integer-param.pipe';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { trackingOperationRepository } from '@backend/entities/tracking-operation/infrastructure/tracking-operation.repository';
import { ExistTrackingOperationGuard } from '@backend/entities/tracking-operation/application/exist-tracking-operation.guard';
import { OwnsTrackingOperationGuard } from '@backend/entities/tracking-operation/application/owns-tracking-operation.guard';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import type { TrackingOperationOrm } from '@backend/entities/tracking-operation/infrastructure/tracking-operation.orm';

export const PUT = createRoute({
  schema: TrackingOperationSchema.omit({ id: true }),
  paramsFn: (context) => ({
    id: GetIntegerParamPipe(context.id, 1),
  }),
  contextFn: async (request, params) => ({
    userId: await GetUserIdTransformer(request),
    op: await trackingOperationRepository.getItemById(params.id),
  }),
  guards: [
    AuthGuard,
    ({ context }) => ExistTrackingOperationGuard((context as { op: TrackingOperationOrm | null }).op),
    ({ context }) => {
      const { userId, op } = context as { userId: number; op: TrackingOperationOrm | null };
      return OwnsTrackingOperationGuard(userId, op);
    },
  ],
  execute: async ({ context, body, params: { id } }) => {
    const userId = context.userId as number;
    await trackingOperationRepository.updateItem(id, { ...body, userId });
    return { status: 200, data: true };
  },
  filter: getDefaultApiErrorFilter,
});
