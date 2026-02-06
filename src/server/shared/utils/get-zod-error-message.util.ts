import { ZodSafeParseResult } from 'zod';
import { ErrorTexts } from '../../../common/constants/error-texts.contant';
import { ApiResultOperationError } from '../../../common/models/api-result-operation.model';

export function getZodErrorMessage(result: ZodSafeParseResult<unknown>): ApiResultOperationError {
  const error = result.error?.issues.at(0)?.message;

  return {
    status: error ? 400 : 500,
    message: error ?? ErrorTexts.UnknownError,
  };
}
