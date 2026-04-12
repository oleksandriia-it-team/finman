import { CrudApiRepository } from '@backend/shared/infrastructure/crud.api.repository';
import { RegularEntryOrm } from '@backend/entities/regular-entry/infrastructure/regular-entry.orm';

export class RegularEntryApiRepository extends CrudApiRepository<RegularEntryOrm, never> {}

export const regularEntryApiRepository = new RegularEntryApiRepository(RegularEntryOrm);
