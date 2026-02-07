import { CrudApiRepository } from '../../../shared/infrastructure/crud.api.repository';
import { AdminOrm } from './admin.orm';

export class AdminRepository extends CrudApiRepository<AdminOrm> {}

export const adminRepository = new AdminRepository(AdminOrm);
