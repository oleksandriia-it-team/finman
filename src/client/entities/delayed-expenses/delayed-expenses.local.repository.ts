import { CrudLocalService } from '../../database/crud/crud.local.service';
import { DatabaseLocalService, databaseService } from '../../database/database.local.service';
import { Tables } from '../../shared/constants/database.constants';
import { DelayedExpense } from '../../../common/records/delayed-expenses.record';

export class DelayedExpensesLocalRepository extends CrudLocalService<DelayedExpense> {
  constructor(databaseService: DatabaseLocalService) {
    super(databaseService, Tables.DelayedExpensesTable);
  }

  createItem(data: Omit<DelayedExpense, 'id' | 'softDeleted'>): Promise<number> {
    return this.databaseService.updateOrCreateItem(this.tableName, data);
  }

  async updateItem(id: number, data: Omit<DelayedExpense, 'id' | 'softDeleted'>): Promise<true> {
    return this.databaseService.updateOrCreateItem(this.tableName, { ...data, id }).then(() => true as const);
  }

  deleteItem(id: number): Promise<true> {
    return this.databaseService.deleteItem(this.tableName, id, false);
  }
}

export const delayedExpensesLocalRepository = new DelayedExpensesLocalRepository(databaseService);
