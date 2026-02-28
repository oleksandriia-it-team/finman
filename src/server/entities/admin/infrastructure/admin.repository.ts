import { CrudApiRepository } from '../../../shared/infrastructure/crud.api.repository';
import { AdminOrm } from './admin.orm';

export class AdminApiRepository extends CrudApiRepository<AdminOrm> {}

export const adminApiRepository = new AdminApiRepository(AdminOrm);
