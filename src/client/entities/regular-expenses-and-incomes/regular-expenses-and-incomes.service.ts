import { CrudService } from '../../database/crud/crud.service';
import { RegularEntry } from '../budget-plan/models/entry.model';
import { DatabaseService } from '../../database/database.service';
import { Tables } from '../../shared/constants/database.constants';

export class RegularExpensesAndIncomesService extends CrudService<RegularEntry> {
  constructor(databaseService: DatabaseService) {
    super(databaseService, Tables.RegularExpensesAndIncomesTable);
  }

  createItem(data: Omit<RegularEntry, 'id' | 'softDeleted'>): Promise<number> {
    return this.databaseService.updateOrCreateItem(this.tableName, data);
  }

  async updateItem(id: number, data: Omit<RegularEntry, 'id' | 'softDeleted'>): Promise<true> {
    return this.databaseService.updateOrCreateItem(this.tableName, { ...data, id }).then(() => true as const);
  }

  deleteItem(id: number): Promise<true> {
    return this.databaseService.deleteItem(this.tableName, id, true);
  }

  getItemsWithSoftDeleted(first: number, last: number): Promise<RegularEntry[]> {
    return this.databaseService.getItems(this.tableName, first, last, true);
  }
}
