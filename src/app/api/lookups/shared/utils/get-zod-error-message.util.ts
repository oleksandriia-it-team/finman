import { ZodSafeParseResult } from 'zod';
import { ErrorTexts } from '../../../../../shared/constants/error-texts.contant';
import { DatabaseResultOperationError } from '../../../../../shared/models/database-result-operation.model';

export function getZodErrorMessage(result: ZodSafeParseResult<unknown>): DatabaseResultOperationError {
  const error = result.error?.issues.at(0)?.message;

  return {
    status: error ? 400 : 500,
    message: error ?? ErrorTexts.UnknownError
  };
}