import { CrudApiRepository } from '@backend/database/crud.api.repository';
import type { ErrorLogOrm } from '@backend/entities/error-log/infrastructure/error-log.orm';
import { UserOrm } from '@backend/entities/user/infrastructure/user.orm';

export class ErrorLogApiRepository extends CrudApiRepository<ErrorLogOrm, never, never> {
  constructor() {
    super(UserOrm);
  }
}

export const errorLogApiRepository = new ErrorLogApiRepository();
