import { CrudLocalService } from '../../database/crud/crud.local.service';
import { type BudgetPlan } from '@common/records/budget-plan.record';
import { type DatabaseLocalService, databaseLocalService } from '../../database/database.local.service';
import { Tables } from '../../shared/constants/database.constants';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';

export class BudgetPlanLocalRepository extends CrudLocalService<BudgetPlan, never> {
  constructor(databaseLocalService: DatabaseLocalService) {
    super(databaseLocalService, Tables.BudgetPlanTable);
  }

  override async createItem(data: Omit<BudgetPlan, DefaultColumnKeys>): Promise<number> {
    return await this.databaseLocalService.updateOrCreateItem(this.tableName, data);
  }

  override async updateItem(id: number, newData: Omit<BudgetPlan, DefaultColumnKeys>): Promise<true> {
    return await this.databaseLocalService.updateOrCreateItem(this.tableName, { id, ...newData }).then(() => true);
  }

  deleteItem(id: number): Promise<true> {
    return this.databaseLocalService.deleteItem(this.tableName, id, false);
  }
}

export const budgetPlanLocalRepository = new BudgetPlanLocalRepository(databaseLocalService);
