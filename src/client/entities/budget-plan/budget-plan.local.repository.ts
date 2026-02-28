import { CrudLocalService } from '../../database/crud/crud.local.service';
import { BudgetPlan, BudgetPlanDto } from '../../../common/records/budget-plan.record';
import { DatabaseLocalService, databaseService } from '../../database/database.local.service';
import { Tables } from '../../shared/constants/database.constants';
import { isEmpty } from '../../../common/utils/is-empty.util';
import {
  delayedExpensesLocalRepository,
  DelayedExpensesLocalRepository,
} from '../delayed-expenses/delayed-expenses.local.repository';
import { DelayedExpense } from '../../../common/records/delayed-expenses.record';
import { DefaultColumnKeys } from '../../../common/models/default-table-columns.model';

/**
 * Repository for managing monthly budget plans.
 *
 * This service handles the creation, updating, and deletion of monthly budget plans,
 * which include planned income, expenses, and other budget entries for a given month and year.
 *
 * Special focus is placed on handling delayed expenses:
 * - When creating a budget plan, any associated delayed expenses are created and linked to it.
 * - When updating a budget plan:
 *   - New delayed expenses are added.
 *   - Unused delayed expenses (no longer linked to the plan) are removed.
 *   - Existing delayed expenses are preserved.
 * - When deleting a budget plan, all its associated delayed expenses are also deleted.
 *
 * Operations are executed within database batches to ensure atomicity:
 * `runBatch` starts a batch affecting both the budget plan and delayed expenses tables,
 * `doneBatch` commits the changes, and `revertBatch` rolls back in case of errors.
 *
 * Depends on:
 * - `DatabaseLocalService` for CRUD operations.
 * - `DelayedExpensesLocalRepository` for managing delayed expenses.
 */
export class BudgetPlanLocalRepository extends CrudLocalService<BudgetPlan, BudgetPlanDto> {
  constructor(
    databaseService: DatabaseLocalService,
    private readonly delayedExpensesLocalRepository: DelayedExpensesLocalRepository,
  ) {
    super(databaseService, Tables.BudgetPlanTable);
  }

  override async createItem(data: BudgetPlanDto) {
    try {
      const plannedDelayedExpenses = data.plannedDelayedExpenses as DelayedExpense[];

      this.databaseService.runBatch([this.tableName, this.delayedExpensesLocalRepository.tableName]);

      const plannedDelayedExpenseRequests = plannedDelayedExpenses.map((plannedDelayedExpense) =>
        this.delayedExpensesLocalRepository.createItem(plannedDelayedExpense),
      );

      const delayedExpenses = await Promise.all(plannedDelayedExpenseRequests);

      const dto: Omit<BudgetPlan, DefaultColumnKeys> = {
        month: data.month,
        year: data.year,
        otherEntries: data.otherEntries,
        plannedOtherEntryIndexes: data.plannedOtherEntryIndexes,
        plannedRegularEntryIds: data.plannedRegularEntryIds,
        plannedDelayedExpenseIds: delayedExpenses,
      };

      const result = await this.databaseService.updateOrCreateItem(this.tableName, dto);

      await this.databaseService.doneBatch();

      return result;
    } catch (err: unknown) {
      await this.databaseService.revertBatch();

      throw err;
    }
  }

  override async updateItem(id: number, newData: BudgetPlanDto): Promise<true> {
    try {
      this.databaseService.runBatch([this.tableName, this.delayedExpensesLocalRepository.tableName]);

      const prevPlannedDelayedExpenseIds: number[] = (await this.getItemById(id))?.plannedDelayedExpenseIds ?? [];

      const needCreateDelayedExpenses: DelayedExpense[] = newData.plannedDelayedExpenses.filter(({ id }) =>
        isEmpty(id),
      ) as DelayedExpense[];

      const savedDelayedExpenses: number[] =
        newData.plannedDelayedExpenses.reduce((acc, { id }) => (isEmpty(id) ? acc : [...acc, id]), [] as number[]) ??
        [];

      const needDeleteDelayedExpenses: number[] = prevPlannedDelayedExpenseIds.filter(
        (id) => !savedDelayedExpenses.includes(id),
      );

      const createDelayedExpenseRequests = needCreateDelayedExpenses.map((dto) =>
        this.delayedExpensesLocalRepository.createItem(dto),
      );

      const deleteDelayedExpenseRequests = needDeleteDelayedExpenses.map((id) =>
        this.delayedExpensesLocalRepository.deleteItem(id),
      );

      await Promise.all(deleteDelayedExpenseRequests);

      const createdDelayedExpenses = await Promise.all(createDelayedExpenseRequests);

      const dto: Omit<BudgetPlan, DefaultColumnKeys> = {
        month: newData.month,
        year: newData.year,
        otherEntries: newData.otherEntries,
        plannedOtherEntryIndexes: newData.plannedOtherEntryIndexes,
        plannedRegularEntryIds: newData.plannedRegularEntryIds,
        plannedDelayedExpenseIds: [...savedDelayedExpenses, ...createdDelayedExpenses],
      };

      await this.databaseService.updateOrCreateItem(this.tableName, dto);

      await this.databaseService.doneBatch();

      return true;
    } catch (err: unknown) {
      await this.databaseService.revertBatch();

      throw err;
    }
  }

  async deleteItem(id: number): Promise<true> {
    try {
      this.databaseService.runBatch([this.tableName, this.delayedExpensesLocalRepository.tableName]);

      const delayedExpenseIds: number[] = (await this.getItemById(id))?.plannedDelayedExpenseIds ?? [];

      const deleteDelayedExpenseRequests = delayedExpenseIds.map((id) =>
        this.delayedExpensesLocalRepository.deleteItem(id),
      );

      await Promise.all(deleteDelayedExpenseRequests);

      const result = await this.databaseService.deleteItem(this.tableName, id, false);

      await this.databaseService.doneBatch();

      return result;
    } catch (err: unknown) {
      await this.databaseService.revertBatch();

      throw err;
    }
  }
}

export const budgetPlanLocalRepository = new BudgetPlanLocalRepository(databaseService, delayedExpensesLocalRepository);
