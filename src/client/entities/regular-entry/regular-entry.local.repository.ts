import { CrudLocalService } from '../../database/crud/crud.local.service';
import { DatabaseLocalService, databaseService } from '../../database/database.local.service';
import { Tables } from '../../shared/constants/database.constants';
import { RegularEntry } from '../../../common/records/regular-entry.record';
import { DefaultColumnKeys } from '../../../common/models/default-table-columns.model';

export class RegularEntryLocalRepository extends CrudLocalService<RegularEntry> {
  constructor(databaseService: DatabaseLocalService) {
    super(databaseService, Tables.RegularExpensesAndIncomesTable);
  }

  createItem(data: Omit<RegularEntry, DefaultColumnKeys>): Promise<number> {
    return this.databaseService.updateOrCreateItem(this.tableName, data);
  }

  async updateItem(id: number, data: Omit<RegularEntry, DefaultColumnKeys>): Promise<true> {
    return this.databaseService.updateOrCreateItem(this.tableName, { ...data, id }).then(() => true as const);
  }

  deleteItem(id: number): Promise<true> {
    return this.databaseService.deleteItem(this.tableName, id, true);
  }

  getItemsWithSoftDeleted(first: number, last: number): Promise<RegularEntry[]> {
    return this.databaseService.getItems(this.tableName, first, last, true);
  }
}

export const regularEntryLocalRepository = new RegularEntryLocalRepository(databaseService);
