import type { ErrorLogOrm } from '@backend/entities/error-log/infrastructure/error-log.orm';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';

export function ExistErrorLogGuard(errorLog: ErrorLogOrm | null | undefined): ApiResultOperationError | null {
  if (!errorLog || !!errorLog.softDeleted) {
    return { status: 404, message: 'Лог помилки не знайдено' };
  }

  return null;
}
