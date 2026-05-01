import { type ApiResultOperationError } from '@common/models/api-result-operation.model';

export function checkIsApiError(error: unknown): error is ApiResultOperationError {
  if (typeof error === 'object' && error !== null) {
    return (
      'status' in error && typeof error.status === 'number' && 'message' in error && typeof error.message === 'string'
    );
  }

  return false;
}
