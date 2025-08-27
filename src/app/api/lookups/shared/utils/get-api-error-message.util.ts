import { getErrorMessage } from '../../../../../shared/utils/get-error-message.util';
import { DatabaseResultOperationError } from '../../../../../shared/models/database-result-operation.model';
import { ErrorTexts } from '../../../../../shared/constants/error-texts.contant';

export function getApiErrorMessage(error: unknown): DatabaseResultOperationError {
  const errorMessage = getErrorMessage(error);

  return {
    status: errorMessage === ErrorTexts.UnknownError ? 500 : 400,
    message: errorMessage
  }
}