import type { ApiResultOperationError } from '@common/models/api-result-operation.model';
import { getSafeAppError } from '@common/utils/get-safe-app-error.util';
import { checkIsAppErrorObj } from '@common/utils/check-is-api-error.util';

export function getFirstAppError(...errors: unknown[]): ApiResultOperationError | null {
  let firstUnknownError: unknown = null;

  for (const err of errors) {
    if (!err) continue;
    if (checkIsAppErrorObj(err)) return getSafeAppError(err);
    if (!firstUnknownError) firstUnknownError = err;
  }

  return firstUnknownError ? getSafeAppError(firstUnknownError) : null;
}
