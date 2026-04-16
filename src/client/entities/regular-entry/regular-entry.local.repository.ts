import { CrudLocalService } from '../../database/crud/crud.local.service';
import { type DatabaseLocalService, databaseLocalService } from '../../database/database.local.service';
import { Tables } from '../../shared/constants/database.constants';
import { type RegularEntry } from '@common/records/regular-entry.record';
import { type DefaultColumnKeys } from '@common/models/default-table-columns.model';

export class RegularEntryLocalRepository extends CrudLocalService<RegularEntry> {
  constructor(databaseLocalService: DatabaseLocalService) {
    super(databaseLocalService, Tables.RegularExpensesAndIncomesTable);
  }

  createItem(data: Omit<RegularEntry, DefaultColumnKeys>): Promise<number> {
    return this.databaseLocalService.updateOrCreateItem(this.tableName, data);
  }

  async updateItem(id: number, data: Omit<RegularEntry, DefaultColumnKeys>): Promise<true> {
    return this.databaseLocalService.updateOrCreateItem(this.tableName, { ...data, id }).then(() => true as const);
  }

  deleteItem(id: number): Promise<true> {
    return this.databaseLocalService.deleteItem(this.tableName, id, true);
  }

  getItemsWithSoftDeleted(first: number, last: number): Promise<RegularEntry[]> {
    return this.databaseLocalService.getItems(this.tableName, first, last, true);
  }
}

export const regularEntryLocalRepository = new RegularEntryLocalRepository(databaseLocalService);
