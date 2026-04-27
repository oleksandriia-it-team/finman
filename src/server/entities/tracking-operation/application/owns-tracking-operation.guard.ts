import type { TrackingOperationOrm } from '@backend/entities/tracking-operation/infrastructure/tracking-operation.orm';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';

export function OwnsTrackingOperationGuard(
  userId: number,
  op: TrackingOperationOrm | null,
): ApiResultOperationError | null {
  if (op?.userId !== userId) {
    return { status: 403, message: 'Ця операція вам не належить!' };
  }
  return null;
}
