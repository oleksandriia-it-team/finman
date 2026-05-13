import { CrudApiRepository } from '@backend/database/crud.api.repository';
import { ErrorLogOrm } from '@backend/entities/error-log/infrastructure/error-log.orm';
import type { ErrorLogFilter } from '@common/domains/lookups/filters/error-log.filter';
import type { QueryDeepPartialEntity } from 'typeorm';

export class ErrorLogApiRepository extends CrudApiRepository<ErrorLogOrm, ErrorLogFilter> {
  constructor() {
    super(ErrorLogOrm);
  }
  override async updateItem(id: number, data: Pick<ErrorLogOrm, 'status'>): Promise<true> {
    await this.repository.update({ id }, data as QueryDeepPartialEntity<ErrorLogOrm>);

    return true;
  }
}

export const errorLogApiRepository = new ErrorLogApiRepository();
