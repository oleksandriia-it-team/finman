import { type TrackingOperationOrm } from '../infrastructure/tracking-operation.orm';
import { type ApiResultOperationError } from '@common/models/api-result-operation.model';

export function ExistTrackingOperationGuard(op: TrackingOperationOrm | null): ApiResultOperationError | null {
  if (!op || !!op.softDeleted) {
    return { status: 404, message: 'Операцію не знайдено' };
  }
  return null;
}
