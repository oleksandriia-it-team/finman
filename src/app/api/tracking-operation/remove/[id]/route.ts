import { createRoute } from '@backend/shared/utils/create-route.util';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { GetIntegerParamPipe } from '@backend/shared/pipes/get-integer-param.pipe';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { trackingOperationRepository } from '@backend/entities/tracking-operation/infrastructure/tracking-operation.repository';
import { ExistTrackingOperationGuard } from '@backend/entities/tracking-operation/application/exist-tracking-operation.guard';
import { OwnsTrackingOperationGuard } from '@backend/entities/tracking-operation/application/owns-tracking-operation.guard';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';

export const DELETE = createRoute({
  paramsFn: (context) => ({
    id: GetIntegerParamPipe(context.id, 1),
  }),
  contextFn: async (request, { id }) => ({
    userId: await GetUserIdTransformer(request),
    op: await trackingOperationRepository.getItemById(id),
  }),
  guards: [
    AuthGuard,
    ({ context: { op } }) => ExistTrackingOperationGuard(op),
    ({ context: { op, userId } }) => OwnsTrackingOperationGuard(userId as number, op),
  ],
  execute: async ({ params: { id } }) => {
    await trackingOperationRepository.deleteItem(id, true);
    return { status: 200, data: true };
  },
  filter: getDefaultApiErrorFilter,
});
