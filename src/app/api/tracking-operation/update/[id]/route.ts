import { createRoute } from '@backend/shared/utils/create-route.util';
import { TrackingOperationSchema } from '@common/domains/tracking-operation/schema/tracking-operation.schema';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { GetIntegerParamPipe } from '@backend/shared/pipes/get-integer-param.pipe';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { trackingOperationRepository } from '@backend/entities/tracking-operation/infrastructure/tracking-operation.repository';
import { ExistTrackingOperationGuard } from '@backend/entities/tracking-operation/application/exist-tracking-operation.guard';
import { OwnsTrackingOperationGuard } from '@backend/entities/tracking-operation/application/owns-tracking-operation.guard';
import { getDefaultApiErrorFilter } from '../../../shared/get-api-error-filter.util';
import { assertFitAttachConditions } from '../../utils/assert-fit-attach-conditions.util';

export const PUT = createRoute({
  schema: TrackingOperationSchema.omit({ id: true }),
  paramsFn: (context) => ({
    id: GetIntegerParamPipe(context.id, 1),
  }),
  contextFn: GetUserIdTransformer,
  guards: [AuthGuard],
  execute: async ({ context, body, params: { id } }) => {
    const userId = context as number;
    const op = await trackingOperationRepository.getItemById(id);

    const existError = ExistTrackingOperationGuard(op);
    if (existError) return existError;

    const ownsError = OwnsTrackingOperationGuard(userId as number, op);
    if (ownsError) return ownsError;

    const { description, attachedPlannedMonthEntryId, attachedPlannedRegEntryId, ...restBody } = body;

    await assertFitAttachConditions({
      attachedPlannedMonthEntryId: attachedPlannedMonthEntryId ?? null,
      attachedPlannedRegEntryId: attachedPlannedRegEntryId ?? null,
      userId,
      date: restBody.date,
    });

    await trackingOperationRepository.updateItem(id, {
      ...restBody,
      description: description ?? null,
      attachedPlannedMonthEntryId: attachedPlannedMonthEntryId ?? null,
      attachedPlannedRegEntryId: attachedPlannedRegEntryId ?? null,
      userId,
    });

    return { status: 200, data: true };
  },
  filter: getDefaultApiErrorFilter,
});
