import { CrudLocalService } from '@frontend/database/crud/crud.local.service';
import type { UnregularEntry } from '@common/records/unregular-entry.record';
import { databaseLocalService, type DatabaseLocalService } from '@frontend/database/database.local.service';
import { Tables } from '@frontend/shared/constants/database.constants';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';

export class UnregularEntryLocalRepository extends CrudLocalService<UnregularEntry, never> {
  constructor(databaseLocalService: DatabaseLocalService) {
    super(databaseLocalService, Tables.UnregularEntries);
  }

  createItem(data: Omit<UnregularEntry, DefaultColumnKeys>): Promise<number> {
    return this.databaseLocalService.updateOrCreateItem(Tables.UnregularEntries, data);
  }

  updateItem(id: number, data: Omit<UnregularEntry, DefaultColumnKeys>): Promise<true> {
    return this.databaseLocalService
      .updateOrCreateItem(Tables.UnregularEntries, { id, ...data })
      .then(() => true as const);
  }

  deleteItem(id: number): Promise<true> {
    return this.databaseLocalService.deleteItem(this.tableName, id, false);
  }
}

export const unregularEntryLocalRepository = new UnregularEntryLocalRepository(databaseLocalService);
