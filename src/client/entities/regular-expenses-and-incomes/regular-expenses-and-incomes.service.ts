import { CrudService } from '../../database/crud/crud.service';
import { RegularEntry } from '../budget-plan/models/entry.model';
import { DatabaseResultOperationSuccess } from '../../../common/models/database-result-operation.model';
import { DatabaseService } from '../../database/database.service';
import { Tables } from '../../shared/constants/database.constants';

export class RegularExpensesAndIncomesService extends CrudService<RegularEntry> {
  constructor(databaseService: DatabaseService) {
    super(databaseService, Tables.RegularExpensesAndIncomesTable);
  }

  createItem(data: Omit<RegularEntry, 'id' | 'softDeleted'>): Promise<DatabaseResultOperationSuccess<number>> {
    return this.databaseService.updateOrCreateItem(this.tableName, data);
  }

  async updateItem(id: number, data: Omit<RegularEntry, 'id' | 'softDeleted'>): Promise<DatabaseResultOperationSuccess<true>> {
    return this.databaseService.updateOrCreateItem(this.tableName, { ...data, id })
      .then((result) => ({ ...result, data: true }) satisfies DatabaseResultOperationSuccess<boolean>);
  }

  deleteItem(id: number): Promise<DatabaseResultOperationSuccess<true>> {
    return this.databaseService.deleteItem(this.tableName, id, true);
  }

  getItemsWithSoftDeleted(first: number, last: number): Promise<DatabaseResultOperationSuccess<RegularEntry[]>> {
    return this.databaseService.getItems(this.tableName, first, last, true);
  }
}