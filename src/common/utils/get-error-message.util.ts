import { isEmpty } from './is-empty.util';
import { ErrorTexts } from '../constants/error-texts.contant';

export function getErrorMessage(error: unknown): string {
  if (typeof error === 'object' && !isEmpty(error)) {
    return 'message' in error && typeof error.message === 'string' ? error.message : ErrorTexts.UnknownError;
  }

  return ErrorTexts.UnknownError;
}
