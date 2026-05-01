import { getSafeErrorMessage } from '@common/utils/get-safe-error-message.util';
import { type ApiResultOperationError } from '@common/models/api-result-operation.model';
import { ErrorTexts } from '@common/constants/error-texts.contant';

export function getApiErrorMessage(error: unknown): ApiResultOperationError {
  const errorMessage = getSafeErrorMessage(error);

  return {
    status: errorMessage === ErrorTexts.UnknownError ? 500 : 400,
    message: errorMessage,
  };
}
