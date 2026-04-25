import { createRoute } from '@backend/shared/utils/create-route.util';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { GetIntegerParamPipe } from '@backend/shared/pipes/get-integer-param.pipe';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { trackingOperationRepository } from '@backend/entities/tracking-operation/infrastructure/tracking-operation.repository';
import { ExistTrackingOperationGuard } from '@backend/entities/tracking-operation/application/exist-tracking-operation.guard';
import { OwnsTrackingOperationGuard } from '@backend/entities/tracking-operation/application/owns-tracking-operation.guard';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import type { TrackingOperationOrm } from '@backend/entities/tracking-operation/infrastructure/tracking-operation.orm';

export const GET = createRoute({
  paramsFn: (context) => ({
    id: GetIntegerParamPipe(context.id, 1),
  }),
  contextFn: async (request, params) => ({
    userId: await GetUserIdTransformer(request),
    operationId: params.id, // Передаємо id через контекст
    op: null as TrackingOperationOrm | null,
  }),
  guards: [
    AuthGuard,
    async ({ context, params }) => {
      context.op = await trackingOperationRepository.getItemById(params.id);
      return null;
    },
    ({ context }) => ExistTrackingOperationGuard(context.op),
    ({ context }) => OwnsTrackingOperationGuard(context.userId as number, context.op),
  ],
  execute: async ({ context }) => ({
    status: 200,
    data: context.op,
  }),
  filter: getDefaultApiErrorFilter,
});
