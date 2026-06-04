import { CrudLocalRepository } from '@frontend/database/crud/crud.local.repository';
import { databaseLocalService, type DatabaseLocalService } from '@frontend/database/database.local.service';
import { Tables } from '@frontend/shared/constants/database.constants';
import type { PlannedRegOpsBudgetRecord } from '@common/records/planned-reg-ops-budget.record';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';

export class PlannedRegOpsBudgetLocalRepository extends CrudLocalRepository<PlannedRegOpsBudgetRecord, never> {
  constructor(databaseLocalService: DatabaseLocalService) {
    super(databaseLocalService, Tables.PlannedRegOpsBudgetTable.name);
  }

  createItem(data: Omit<PlannedRegOpsBudgetRecord, DefaultColumnKeys>): Promise<number> {
    return this.databaseLocalService.updateOrCreateItem(this.tableName, data);
  }

  updateItem(id: number, data: Omit<PlannedRegOpsBudgetRecord, DefaultColumnKeys>): Promise<true> {
    return this.databaseLocalService.updateOrCreateItem(this.tableName, { id, ...data }).then(() => true as const);
  }

  deleteItem(id: number): Promise<true> {
    return this.databaseLocalService.deleteItem(this.tableName, id, false);
  }

  async getByBudgetPlanId(budgetPlanId: number): Promise<PlannedRegOpsBudgetRecord[]> {
    return this.table.where('budgetPlanId').equals(budgetPlanId).toArray();
  }

  async existsByRegularOperationAndBudgetPlan(regularOperationId: number, budgetPlanId: number): Promise<boolean> {
    const record = await this.table
      .where('regularOperationId')
      .equals(regularOperationId)
      .and((item) => item.budgetPlanId === budgetPlanId)
      .first();

    return record !== undefined;
  }

  async deleteByBudgetPlanId(budgetPlanId: number): Promise<void> {
    await this.table.where('budgetPlanId').equals(budgetPlanId).delete();
  }
}

export const plannedRegOpsBudgetLocalRepository = new PlannedRegOpsBudgetLocalRepository(databaseLocalService);
