import { TrackingOperationSchema } from '@common/domains/tracking-operation/schema/tracking-operation.schema';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { getDefaultApiErrorFilter } from '../../shared/get-api-error-filter.util';
import { createRoute } from '@backend/shared/utils/create-route.util';
import { trackingOperationRepository } from '@backend/entities/tracking-operation/infrastructure/tracking-operation.repository';
import { assertFitAttachConditions } from '../utils/assert-fit-attach-conditions.util';

export const POST = createRoute({
  schema: TrackingOperationSchema,
  contextFn: GetUserIdTransformer,
  guards: [AuthGuard],
  execute: async ({ context, body }) => {
    const userId = context as number;

    const { description, attachedPlannedMonthEntryId, attachedPlannedRegEntryId, ...restBody } = body;

    await assertFitAttachConditions({
      attachedPlannedMonthEntryId: attachedPlannedMonthEntryId ?? null,
      attachedPlannedRegEntryId: attachedPlannedRegEntryId ?? null,
      userId,
      date: restBody.date,
    });

    const id = await trackingOperationRepository.createItem({
      ...restBody,
      description: description ?? null,
      attachedPlannedMonthEntryId: attachedPlannedMonthEntryId ?? null,
      attachedPlannedRegEntryId: attachedPlannedRegEntryId ?? null,
      userId,
    });

    return { status: 200, data: id };
  },
  filter: getDefaultApiErrorFilter,
});
