import { CrudLocalService } from '@frontend/database/crud/crud.local.service';
import type { UnregularEntry } from '@common/records/unregular-entry.record';
import type { DatabaseLocalService } from '@frontend/database/database.local.service';
import { Tables } from '@frontend/shared/constants/database.constants';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';

export class UnregularEntryLocalRepository extends CrudLocalService<UnregularEntry> {
  constructor(databaseService: DatabaseLocalService) {
    super(databaseService, Tables.UnregularEntries);
  }

  createItem(data: Omit<UnregularEntry, DefaultColumnKeys>): Promise<number> {
    return this.databaseService.updateOrCreateItem(Tables.UnregularEntries, data);
  }

  updateItem(id: number, data: Omit<UnregularEntry, DefaultColumnKeys>): Promise<true> {
    return this.databaseService.updateOrCreateItem(Tables.UnregularEntries, { id, ...data }).then(() => true as const);
  }

  deleteItem(id: number): Promise<true> {
    return this.databaseService.deleteItem(this.tableName, id, false);
  }
}
