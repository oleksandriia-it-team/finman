import { getErrorMessage } from '../../../common/utils/get-error-message.util';
import { DatabaseResultOperationError } from '../../../common/models/database-result-operation.model';
import { ErrorTexts } from '../../../common/constants/error-texts.contant';

export function getApiErrorMessage(error: unknown): DatabaseResultOperationError {
  const errorMessage = getErrorMessage(error);

  return {
    status: errorMessage === ErrorTexts.UnknownError ? 500 : 400,
    message: errorMessage,
  };
}
