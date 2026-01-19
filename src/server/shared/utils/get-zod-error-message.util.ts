import { ZodSafeParseResult } from 'zod';
import { ErrorTexts } from '../../../common/constants/error-texts.contant';
import { DatabaseResultOperationError } from '../../../common/models/database-result-operation.model';

export function getZodErrorMessage(result: ZodSafeParseResult<unknown>): DatabaseResultOperationError {
  const error = result.error?.issues.at(0)?.message;

  return {
    status: error ? 400 : 500,
    message: error ?? ErrorTexts.UnknownError
  };
}