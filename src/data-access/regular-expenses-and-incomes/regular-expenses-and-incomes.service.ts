import { CrudService } from '../../shared/classes/crud-service.class';
import { RegularEntry } from '../budget-plan/models/entry.model';
import { DatabaseResultOperationSuccess } from '../../shared/models/database-result-operation.model';
import { DatabaseService } from '../database/database.service';
import { Tables } from '../database/constants/database.constants';
import { IRegularExpensesAndIncomesService } from './models/regular-expenses-and-incomes.model';
import { InjectToken } from '../../shared/classes/inject-token.class';

export class RegularExpensesAndIncomesService extends CrudService<RegularEntry> implements IRegularExpensesAndIncomesService {
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

export const regularExpensesAndIncomesServiceProvider = new InjectToken<IRegularExpensesAndIncomesService>('RegularExpensesAndIncomesService');
