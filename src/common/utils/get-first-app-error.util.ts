import type { ApiResultOperationError } from '@common/models/api-result-operation.model';
import { getSafeAppError } from '@common/utils/get-safe-app-error.util';

export function getFirstAppError(...errors: unknown[]): ApiResultOperationError | null {
  for (const err of errors) {
    if (err) return getSafeAppError(err);
  }

  return null;
}
