import { CrudApiRepository } from '@backend/database/crud.api.repository';
import { ErrorLogOrm } from '@backend/entities/error-log/infrastructure/error-log.orm';
import type { ErrorLogFilter } from '@common/domains/lookups/filters/error-log.filter';

export class ErrorLogApiRepository extends CrudApiRepository<ErrorLogOrm, ErrorLogFilter, never> {
  constructor() {
    super(ErrorLogOrm);
  }
}

export const errorLogApiRepository = new ErrorLogApiRepository();
