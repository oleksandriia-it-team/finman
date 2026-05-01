import { ErrorTexts } from '../constants/error-texts.contant';
import { checkIsApiError } from '@common/utils/check-is-api-error.util';

// This function is used to safely extract the error message from an unknown error object.
// Otherwise, repository errors can be shown in the frontend side, which is not desired
export function getSafeErrorMessage(error: unknown): string {
  const isApiError = checkIsApiError(error);

  if (!isApiError) {
    return ErrorTexts.UnknownError;
  }

  return error.message;
}
