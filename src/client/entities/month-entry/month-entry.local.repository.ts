import { CrudLocalRepository } from '@frontend/database/crud/crud.local.repository';
import type { MonthEntry } from '@common/records/month-entry.record';
import { databaseLocalService, type DatabaseLocalService } from '@frontend/database/database.local.service';
import { Tables } from '@frontend/shared/constants/database.constants';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';

export class MonthEntryLocalRepository extends CrudLocalRepository<MonthEntry, never> {
  constructor(databaseLocalService: DatabaseLocalService) {
    super(databaseLocalService, Tables.UnregularEntries.name);
  }

  createItem(data: Omit<MonthEntry, DefaultColumnKeys>): Promise<number> {
    return this.databaseLocalService.updateOrCreateItem(this.tableName, data);
  }

  updateItem(id: number, data: Omit<MonthEntry, DefaultColumnKeys>): Promise<void> {
    return this.databaseLocalService.updateOrCreateItem(this.tableName, { id, ...data }).then(() => undefined);
  }

  deleteItem(id: number): Promise<void> {
    return this.databaseLocalService.deleteItem(this.tableName, id, false);
  }
}

export const monthEntryLocalRepository = new MonthEntryLocalRepository(databaseLocalService);
