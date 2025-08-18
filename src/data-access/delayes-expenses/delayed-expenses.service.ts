import { CrudService } from '../../shared/classes/crud-service.class';
import { DelayedExpense } from '../budget-plan/models/entry.model';
import { DatabaseService } from '../database/database.service';
import { Tables } from '../database/constants/database.constants';
import { DatabaseResultOperationSuccess } from '../../shared/models/database-result-operation.model';
import { IDelayedExpensesService } from './models/delayed-expenses.model';
import { InjectToken } from '../../shared/classes/inject-token.class';

export class DelayedExpensesService extends CrudService<DelayedExpense> implements IDelayedExpensesService {
  constructor(databaseService: DatabaseService) {
    super(databaseService, Tables.DelayedExpensesTable);
  }

  createItem(data: Omit<DelayedExpense, 'id' | 'softDeleted'>): Promise<DatabaseResultOperationSuccess<number>> {
    return this.databaseService.updateOrCreateItem(this.tableName, data);
  }

  async updateItem(id: number, data: Omit<DelayedExpense, 'id' | 'softDeleted'>): Promise<DatabaseResultOperationSuccess<true>> {
    return this.databaseService.updateOrCreateItem(this.tableName, { ...data, id })
      .then((result) => ({ ...result, data: true }) satisfies DatabaseResultOperationSuccess<boolean>);
  }

  deleteItem(id: number): Promise<DatabaseResultOperationSuccess<true>> {
    return this.databaseService.deleteItem(this.tableName, id, false);
  }
}

export const delayedExpensesServiceProvider = new InjectToken<IDelayedExpensesService>('DelayedExpensesService');
