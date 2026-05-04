import { CrudApiRepository } from '@backend/database/crud.api.repository';
import { MonthEntryOrm } from '@backend/entities/month-entry/infrastructure/month-entry.orm';

export class MonthEntryRepository extends CrudApiRepository<MonthEntryOrm, never> {}

export const monthEntryRepository = new MonthEntryRepository(MonthEntryOrm);
