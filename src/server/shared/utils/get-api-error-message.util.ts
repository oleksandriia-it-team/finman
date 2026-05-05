import { type ApiResultOperationError } from '@common/models/api-result-operation.model';
import { ErrorTexts } from '@common/constants/error-texts.contant';
import { checkIsAppErrorObj } from '@common/utils/check-is-api-error.util';

export function getApiErrorMessage(error: unknown): ApiResultOperationError {
  const isAppError = checkIsAppErrorObj(error);

  if (isAppError) {
    return {
      message: error.message,
      status: error.status as ApiResultOperationError['status'],
    };
  }

  return {
    status: 500,
    message: ErrorTexts.UnknownError,
  };
}
