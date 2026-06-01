import { CrudLocalRepository } from '../../database/crud/crud.local.repository';
import { type BudgetPlan } from '@common/records/budget-plan.record';
import { type DatabaseLocalService, databaseLocalService } from '../../database/database.local.service';
import { Tables } from '../../shared/constants/database.constants';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';
import type { GetBudgetPlanDto } from '@common/domains/budget-plan/get-budget-plan.schema';
import { isCurrentMonth } from '@common/domains/budget-plan/is-current-month.util';

export class BudgetPlanLocalRepository extends CrudLocalRepository<BudgetPlan, never> {
  constructor(databaseLocalService: DatabaseLocalService) {
    super(databaseLocalService, Tables.BudgetPlanTable.name);
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

  async getItem({ month, year }: GetBudgetPlanDto): Promise<BudgetPlan | null> {
    return (
      (await this.table.filter((plan) => isCurrentMonth(plan, { year, month }) && !plan.softDeleted).first()) ?? null
    );
  }
}

export const budgetPlanLocalRepository = new BudgetPlanLocalRepository(databaseLocalService);
