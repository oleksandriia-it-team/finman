import { CrudService } from '../../database/crud/crud.service';
import { BudgetPlan, BudgetPlanDto } from './models/budget-plan.model';
import { DatabaseService } from '../../database/database.service';
import { Tables } from '../../shared/constants/database.constants';
import { DelayedExpense } from './models/entry.model';
import { isEmpty } from '../../../common/utils/is-empty.util';
import { DatabaseResultOperationSuccess } from '../../../common/models/database-result-operation.model';
import { DelayedExpensesService } from '../delayes-expenses/delayed-expenses.service';

/**
 * Service for managing monthly budget plans.
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
 * - `DatabaseService` for CRUD operations.
 * - `DelayedExpensesService` for managing delayed expenses.
 */
export class BudgetPlanService extends CrudService<BudgetPlan, BudgetPlanDto> {
  constructor(
    databaseService: DatabaseService,
    private readonly delayedExpensesService: DelayedExpensesService
  ) {
    super(databaseService, Tables.BudgetPlanTable);
  }

  override async createItem(data: BudgetPlanDto) {
    try {
      const plannedDelayedExpenses = data.plannedDelayedExpenses as DelayedExpense[];

      this.databaseService.runBatch([ this.tableName, this.delayedExpensesService.tableName ]);

      const plannedDelayedExpenseRequests = plannedDelayedExpenses.map(plannedDelayedExpense => this.delayedExpensesService.createItem(plannedDelayedExpense));

      const delayedExpenses = await Promise.all(plannedDelayedExpenseRequests);

      const dto: Omit<BudgetPlan, 'id' | 'softDeleted'> = {
        month: data.month,
        year: data.year,
        otherEntries: data.otherEntries,
        plannedOtherEntryIndexes: data.plannedOtherEntryIndexes,
        plannedRegularEntryIds: data.plannedRegularEntryIds,
        plannedDelayedExpenseIds: delayedExpenses.map(expense => expense.data),
      };

      const result = await this.databaseService.updateOrCreateItem(this.tableName, dto);

      await this.databaseService.doneBatch();

      return result;
    } catch ( err: unknown ) {
      await this.databaseService.revertBatch();

      throw err;
    }
  }

  override async updateItem(id: number, newData: BudgetPlanDto): Promise<DatabaseResultOperationSuccess<true>> {
    try {

      this.databaseService.runBatch([ this.tableName, this.delayedExpensesService.tableName ]);

      const prevPlannedDelayedExpenseIds: number[] = (await this.getItemById(id)).data?.plannedDelayedExpenseIds ?? [];

      const needCreateDelayedExpenses: DelayedExpense[] = newData.plannedDelayedExpenses.filter(({ id }) => isEmpty(id)) as DelayedExpense[];

      const savedDelayedExpenses: number[] = newData.plannedDelayedExpenses.reduce((acc, { id }) => isEmpty(id) ? acc : [ ...acc, id ], [] as number[]) ?? [];

      const needDeleteDelayedExpenses: number[] = prevPlannedDelayedExpenseIds.filter((id => !savedDelayedExpenses.includes(id)));

      const createDelayedExpenseRequests = needCreateDelayedExpenses.map((dto) => this.delayedExpensesService.createItem(dto));

      const deleteDelayedExpenseRequests = needDeleteDelayedExpenses.map((id) => this.delayedExpensesService.deleteItem(id));

      await Promise.all(deleteDelayedExpenseRequests);

      const createdDelayedExpenses = await Promise.all(createDelayedExpenseRequests);

      const dto: Omit<BudgetPlan, 'id' | 'softDeleted'> = {
        month: newData.month,
        year: newData.year,
        otherEntries: newData.otherEntries,
        plannedOtherEntryIndexes: newData.plannedOtherEntryIndexes,
        plannedRegularEntryIds: newData.plannedRegularEntryIds,
        plannedDelayedExpenseIds: [ ...savedDelayedExpenses, ...createdDelayedExpenses.map(expense => expense.data) ],
      };

      await this.databaseService.updateOrCreateItem(this.tableName, dto);

      await this.databaseService.doneBatch();

      return {
        status: 200,
        data: true
      } satisfies DatabaseResultOperationSuccess<true>;
    } catch ( err: unknown ) {
      await this.databaseService.revertBatch();

      throw err;
    }
  }

  async deleteItem(id: number): Promise<DatabaseResultOperationSuccess<true>> {
    try {
      this.databaseService.runBatch([ this.tableName, this.delayedExpensesService.tableName ]);

      const delayedExpenseIds: number[] = (await this.getItemById(id)).data?.plannedDelayedExpenseIds ?? [];

      const deleteDelayedExpenseRequests = delayedExpenseIds.map(id => this.delayedExpensesService.deleteItem(id));

      await Promise.all(deleteDelayedExpenseRequests);

      const result = await this.databaseService.deleteItem(this.tableName, id, false);

      await this.databaseService.doneBatch();

      return result;
    } catch ( err: unknown ) {
      await this.databaseService.revertBatch();

      throw err;
    }
  }
}