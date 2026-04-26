import { CrudLocalService } from '@frontend/database/crud/crud.local.service';
import type { MonthEntry } from '@common/records/month-entry.record';
import { databaseLocalService, type DatabaseLocalService } from '@frontend/database/database.local.service';
import { Tables } from '@frontend/shared/constants/database.constants';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';

export class MonthEntryLocalRepository extends CrudLocalService<MonthEntry, never> {
  constructor(databaseLocalService: DatabaseLocalService) {
    super(databaseLocalService, Tables.UnregularEntries);
  }

  createItem(data: Omit<MonthEntry, DefaultColumnKeys>): Promise<number> {
    return this.databaseLocalService.updateOrCreateItem(this.tableName, data);
  }

  updateItem(id: number, data: Omit<MonthEntry, DefaultColumnKeys>): Promise<true> {
    return this.databaseLocalService.updateOrCreateItem(this.tableName, { id, ...data }).then(() => true as const);
  }

  deleteItem(id: number): Promise<true> {
    return this.databaseLocalService.deleteItem(this.tableName, id, false);
  }
}

export const monthEntryLocalRepository = new MonthEntryLocalRepository(databaseLocalService);
