import { CrudLocalService } from '../../database/crud/crud.local.service';
import { type DatabaseLocalService, databaseLocalService } from '../../database/database.local.service';
import { Tables } from '../../shared/constants/database.constants';
import { type DelayedExpense } from '@common/records/delayed-expenses.record';
import { type DefaultColumnKeys } from '@common/models/default-table-columns.model';

export class DelayedExpensesLocalRepository extends CrudLocalService<DelayedExpense, never> {
  constructor(databaseLocalService: DatabaseLocalService) {
    super(databaseLocalService, Tables.DelayedExpensesTable);
  }

  createItem(data: Omit<DelayedExpense, DefaultColumnKeys>): Promise<number> {
    return this.databaseLocalService.updateOrCreateItem(this.tableName, data);
  }

  async updateItem(id: number, data: Omit<DelayedExpense, DefaultColumnKeys>): Promise<true> {
    return this.databaseLocalService.updateOrCreateItem(this.tableName, { ...data, id }).then(() => true as const);
  }

  deleteItem(id: number): Promise<true> {
    return this.databaseLocalService.deleteItem(this.tableName, id, false);
  }
}

export const delayedExpensesLocalRepository = new DelayedExpensesLocalRepository(databaseLocalService);
