import { AppError } from '@common/classes/api-error.class';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';

export function checkIsApiErrorObj(error: unknown): error is ApiResultOperationError {
  if (error instanceof AppError) {
    return true;
  } else if (typeof error === 'object' && error !== null) {
    return (
      'message' in error &&
      'status' in error &&
      typeof (error as ApiResultOperationError).message === 'string' &&
      typeof (error as ApiResultOperationError).status === 'number'
    );
  }
  return false;
}
