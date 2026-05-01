import { type ApiResultOperationError } from '@common/models/api-result-operation.model';
import { ErrorTexts } from '@common/constants/error-texts.contant';
import { checkIsApiError } from '@common/utils/check-is-api-error.util';

export function getApiErrorMessage(error: unknown): ApiResultOperationError {
  const isApiError = checkIsApiError(error);

  if (isApiError) {
    return {
      message: error.message,
      status: error.status as ApiResultOperationError['status'],
    };
  }

  return {
    status: 400,
    message: ErrorTexts.UnknownError,
  };
}
