import { CrudService } from '../../database/crud/crud.service';
import { DelayedExpense } from '../budget-plan/models/entry.model';
import { DatabaseService } from '../../database/database.service';
import { Tables } from '../../shared/constants/database.constants';
import { DatabaseResultOperationSuccess } from '../../../common/models/database-result-operation.model';

export class DelayedExpensesService extends CrudService<DelayedExpense> {
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