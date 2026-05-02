import { AppError } from '@common/classes/app-error.class';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';

const AllowedApiStatuses = new Set<ApiResultOperationError['status']>([400, 401, 403, 404, 409, 500, 503]);

export function checkIsAppErrorObj(error: unknown): error is ApiResultOperationError {
  if (error instanceof AppError) {
    return true;
  } else if (typeof error === 'object' && error !== null) {
    const status = (error as { status?: unknown }).status;
    return (
      'message' in error &&
      'status' in error &&
      typeof (error as ApiResultOperationError).message === 'string' &&
      typeof status === 'number' &&
      AllowedApiStatuses.has(status as ApiResultOperationError['status'])
    );
  }
  return false;
}
