import { type ApiResultOperationError } from '@common/models/api-result-operation.model';
import { ErrorTexts } from '@common/constants/error-texts.constant';
import { checkIsAppErrorObj } from '@common/utils/check-is-api-error.util';

export function getSafeAppError(error: unknown): ApiResultOperationError {
  if (checkIsAppErrorObj(error)) {
    const result: ApiResultOperationError = {
      message: error.message,
      status: error.status as ApiResultOperationError['status'],
    };
    if (error.messageParams) result.messageParams = error.messageParams;
    return result;
  }

  return {
    status: 500,
    message: ErrorTexts.UnknownError,
  };
}
