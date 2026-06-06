import { CrudApiRepository } from '@backend/database/crud.api.repository';
import { MonthEntryOrm } from '@backend/entities/month-entry/infrastructure/month-entry.orm';

export class MonthEntryRepository extends CrudApiRepository<MonthEntryOrm, never> {
  constructor() {
    super(MonthEntryOrm, 'month_entry_orm');
  }
}

export const monthEntryRepository = new MonthEntryRepository();
