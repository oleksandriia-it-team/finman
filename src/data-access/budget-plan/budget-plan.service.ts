import { CrudService } from '../../shared/classes/crud-service.class';
import { BudgetPlan, BudgetPlanDto, IBudgetPlanService } from './models/budget-plan.model';
import { DatabaseService } from '../database/database.service';
import { Tables } from '../database/constants/database.constants';
import { DelayedExpense } from './models/entry.model';
import { isEmpty } from '../../shared/utils/is-empty.util';
import { DatabaseResultOperationSuccess } from '../../shared/models/database-result-operation.model';
import { IDelayedExpensesService } from '../delayes-expenses/models/delayed-expenses.model';
import { InjectToken } from '../../shared/classes/inject-token.class';

export class BudgetPlanService extends CrudService<BudgetPlan, BudgetPlanDto> implements IBudgetPlanService {
  constructor(
    databaseService: DatabaseService,
    private readonly delayedExpensesService: IDelayedExpensesService
  ) {
    super(databaseService, Tables.BudgetPlanTable);
  }

  override async createItem(data: Omit<BudgetPlanDto, 'id'>) {
    const plannedDelayedExpenses = data.plannedDelayedExpenses as DelayedExpense[];

    const plannedDelayedExpenseRequests = plannedDelayedExpenses.map(plannedDelayedExpense => this.delayedExpensesService.createItem(plannedDelayedExpense));

    const delayedExpenses = await Promise.all(plannedDelayedExpenseRequests);

    const dto: Omit<BudgetPlan, 'id' | 'softDeleted'> = {
      month: data.month,
      year: data.year,
      otherEntries: data.otherEntries,
      plannedOtherEntries: data.plannedOtherEntries,
      plannedRegularEntryIds: data.plannedRegularEntryIds,
      plannedDelayedExpenseIds: delayedExpenses.map(expense => expense.data),
    };

    return this.databaseService.updateOrCreateItem(this.tableName, dto);
  }

  override async updateItem(id: number, newData: BudgetPlanDto): Promise<DatabaseResultOperationSuccess<true>> {
    try {

      this.databaseService.runBatch([ this.tableName, this.delayedExpensesService.tableName ]);

      const prevPlannedDelayedExpenseIds: number[] = (await this.getItemById(id)).data?.plannedDelayedExpenseIds ?? [];

      const needCreateDelayedExpenses: DelayedExpense[] = newData.plannedDelayedExpenses.filter(({ id }) => !isEmpty(id)) as DelayedExpense[];

      const savedDelayedExpenses: number[] = newData.plannedDelayedExpenses.map(({ id }) => id as number) ?? [];

      const needDeleteDelayedExpenses: number[] = prevPlannedDelayedExpenseIds.filter((id => !savedDelayedExpenses.includes(id)));

      const createDelayedExpenseRequests = needCreateDelayedExpenses.map((dto) => this.delayedExpensesService.createItem(dto));

      const deleteDelayedExpenseRequests = needDeleteDelayedExpenses.map((id) => this.delayedExpensesService.deleteItem(id));

      await Promise.all(deleteDelayedExpenseRequests);

      const createdDelayedExpenses = await Promise.all(createDelayedExpenseRequests);

      const dto: BudgetPlan = {
        id,
        softDeleted: 0,
        month: newData.month,
        year: newData.month,
        otherEntries: newData.otherEntries,
        plannedOtherEntries: newData.plannedOtherEntries,
        plannedRegularEntryIds: newData.plannedRegularEntryIds,
        plannedDelayedExpenseIds: [ ...savedDelayedExpenses, ...createdDelayedExpenses.map(expense => expense.data) ],
      };

      return await Promise.all([ this.databaseService.updateOrCreateItem(this.tableName, dto), this.databaseService.doneBatch() ]).then(() => ({
        status: 200,
        data: true
      } satisfies DatabaseResultOperationSuccess<true>));
    } catch ( err: unknown ) {
      this.databaseService.revertBatch();

      throw err;
    }
  }

  async deleteItem(id: number): Promise<DatabaseResultOperationSuccess<true>> {
    const delayedExpenseIds: number[] = (await this.getItemById(id)).data?.plannedDelayedExpenseIds ?? [];

    const deleteDelayedExpenseRequests = delayedExpenseIds.map(id => this.delayedExpensesService.deleteItem(id));

    await Promise.all(deleteDelayedExpenseRequests);

    return super.databaseService.deleteItem(this.tableName, id, false);
  }
}

export const budgetPlanServiceProvider = new InjectToken<IBudgetPlanService>('BudgetPlanService');
