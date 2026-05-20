import { checkIsAppErrorObj } from '@common/utils/check-is-api-error.util';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';

export function getFirstAppError(...errors: unknown[]): ApiResultOperationError | null {
  for (const err of errors) {
    if (checkIsAppErrorObj(err)) return err;
  }

  return null;
}
