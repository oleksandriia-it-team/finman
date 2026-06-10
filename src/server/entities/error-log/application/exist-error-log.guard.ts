import { ErrorTexts } from '@common/constants/error-texts.constant';
import type { ErrorLogOrm } from '@backend/entities/error-log/infrastructure/error-log.orm';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';

export function ExistErrorLogGuard(errorLog: ErrorLogOrm | null | undefined): ApiResultOperationError | null {
  if (!errorLog || !!errorLog.softDeleted) {
    return { status: 404, message: ErrorTexts.ErrorLogNotFound };
  }

  return null;
}
