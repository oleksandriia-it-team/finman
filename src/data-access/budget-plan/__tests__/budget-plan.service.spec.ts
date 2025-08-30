import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DatabaseService } from '../../database/database.service';
import { BudgetPlanService } from '../budget-plan.service';
import { DelayedExpensesService } from '../../delayes-expenses/delayed-expenses.service';
import { BudgetPlan, BudgetPlanDto, PlannedDelayedExpense } from '../models/budget-plan.model';
import { Month } from '../../../shared/enums/month.enum';
import { UnregularEntry } from '../models/entry.model';
import { TypeEntry } from '../enums/entry.enum';
import {
  DatabaseResultOperationError,
  DatabaseResultOperationSuccess
} from '../../../shared/models/database-result-operation.model';
import { ErrorTexts } from '../../../shared/constants/error-texts.contant';

describe('BudgetPlanService', () => {
  let dbService: DatabaseService;
  let delayedExpensesService: DelayedExpensesService;
  let budgetPlanService: BudgetPlanService;

  const otherEntries: UnregularEntry[] = [
    {
      type: TypeEntry.Expense,
      description: 'Attractions',
      sum: 3000,
      regular: false
    },
    {
      type: TypeEntry.Expense,
      description: 'Trip to Odesa',
      sum: 7000,
      regular: false
    }
  ];

  const getByIdPlan: BudgetPlan = {
    id: 1,
    month: Month.August,
    year: 2025,
    otherEntries,
    plannedOtherEntryIndexes: [ 0, 1 ],
    plannedRegularEntryIds: [],
    plannedDelayedExpenseIds: [ 1, 2 ],
    softDeleted: 0
  };

  beforeEach(() => {
    dbService = new DatabaseService('UNIT_TESTS', [], 1);

    delayedExpensesService = new DelayedExpensesService(dbService);

    budgetPlanService = new BudgetPlanService(dbService, delayedExpensesService);
  });

  it('should create a budget plan and 2 delayed expenses', async () => {
    let countDelayedExpenses = 0;
    vi.spyOn(dbService, 'updateOrCreateItem').mockReturnValue(Promise.resolve({
      status: 200,
      data: 1
    } satisfies DatabaseResultOperationSuccess<number>));
    vi.spyOn(dbService, 'doneBatch').mockReturnValue(Promise.resolve());
    vi.spyOn(dbService, 'runBatch').mockReturnValue();
    vi.spyOn(delayedExpensesService, 'createItem').mockImplementation(() => Promise.resolve({
      status: 200,
      data: ++countDelayedExpenses
    } satisfies DatabaseResultOperationSuccess<number>));
    vi.spyOn(delayedExpensesService, 'deleteItem').mockImplementation(() => Promise.resolve({
      status: 200,
      data: true
    } satisfies DatabaseResultOperationSuccess<boolean>));

    const plannedDelayedExpenses: PlannedDelayedExpense[] = [
      {
        type: TypeEntry.Expense,
        description: 'Buy PC',
        sum: 40000,
        delayed: true,
        delayedMonth: Month.December,
        delayedYear: 2025,
      },
    ];

    const dto: BudgetPlanDto = {
      month: Month.August,
      year: 2025,
      otherEntries,
      plannedOtherEntryIndexes: [ 0, 1 ],
      plannedRegularEntryIds: [],
      plannedDelayedExpenses,
    };

    const result = await budgetPlanService.createItem(dto);

    expect(result.status).toBe(200);
    expect(result.data).toBe(1);

    expect(delayedExpensesService.deleteItem).toHaveBeenCalledTimes(0);
    expect(delayedExpensesService.createItem).toHaveBeenCalledWith(plannedDelayedExpenses[0]);

    const sentBudgetPlanDtoInDb: Omit<BudgetPlan, 'id' | 'softDeleted'> = {
      month: Month.August,
      year: 2025,
      otherEntries,
      plannedOtherEntryIndexes: [ 0, 1 ],
      plannedRegularEntryIds: [],
      plannedDelayedExpenseIds: [ 1 ]
    };

    expect(dbService.updateOrCreateItem).toHaveBeenCalledWith(budgetPlanService.tableName, sentBudgetPlanDtoInDb);
    expect(dbService.runBatch).toHaveBeenCalledWith([ budgetPlanService.tableName, delayedExpensesService.tableName ]);
    expect(dbService.doneBatch).toHaveBeenCalled();
  });

  it('should revert creating a budget plan', async () => {
    vi.spyOn(dbService, 'doneBatch').mockReturnValue(Promise.resolve());
    vi.spyOn(dbService, 'runBatch').mockReturnValue();
    vi.spyOn(dbService, 'revertBatch').mockReturnValue(Promise.resolve());
    vi.spyOn(dbService, 'updateOrCreateItem').mockImplementation(() => {
      throw { status: 500, message: ErrorTexts.UnknownError } satisfies DatabaseResultOperationError;
    });

    const dto: BudgetPlanDto = {
      month: Month.August,
      year: 2025,
      otherEntries,
      plannedOtherEntryIndexes: [ 0, 1 ],
      plannedRegularEntryIds: [],
      plannedDelayedExpenses: [],
    };

    try {
      await budgetPlanService.createItem(dto);

      expect(dbService.doneBatch).toHaveBeenCalledTimes(0);
    } catch ( error: unknown ) {
      expect((error as DatabaseResultOperationError).status).toBe(500);
      expect((error as DatabaseResultOperationError).message).toBe(ErrorTexts.UnknownError);
      expect(dbService.runBatch).toHaveBeenCalledWith([ budgetPlanService.tableName, delayedExpensesService.tableName ]);
      expect(dbService.doneBatch).toHaveBeenCalledTimes(0);
      expect(dbService.revertBatch).toHaveBeenCalledTimes(1);
    }

  });

  it('should update a budget plan with deleting a delayed expense and creating a new one, before updating the plan has two delayed expenses', async () => {
    let countDelayedExpenses = 2;

    vi.spyOn(dbService, 'doneBatch').mockReturnValue(Promise.resolve());
    vi.spyOn(dbService, 'runBatch').mockReturnValue();
    vi.spyOn(dbService, 'updateOrCreateItem').mockReturnValue(Promise.resolve({
      status: 200,
      data: 1
    } satisfies DatabaseResultOperationSuccess<number>));
    vi.spyOn(delayedExpensesService, 'createItem').mockImplementation(() => Promise.resolve({
      status: 200,
      data: ++countDelayedExpenses
    } satisfies DatabaseResultOperationSuccess<number>));
    vi.spyOn(delayedExpensesService, 'deleteItem').mockReturnValue(Promise.resolve({
      status: 200,
      data: true
    } satisfies DatabaseResultOperationSuccess<boolean>));


    vi.spyOn(budgetPlanService, 'getItemById').mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: getByIdPlan
      } satisfies DatabaseResultOperationSuccess<BudgetPlan>);
    });

    const newPlannedDelayedExpenses: PlannedDelayedExpense[] = [
      {
        id: 1,
        type: TypeEntry.Expense,
        description: 'Buy PC',
        sum: 40000,
        delayed: true,
        delayedMonth: Month.December,
        delayedYear: 2025,
        softDeleted: 0,
      },
      {
        type: TypeEntry.Expense,
        description: 'Buy Apple watch',
        sum: 10000,
        delayed: true,
        delayedMonth: Month.January,
        delayedYear: 2026,
      }
    ];

    const dto: BudgetPlanDto = {
      month: Month.August,
      year: 2025,
      otherEntries,
      plannedOtherEntryIndexes: [ 0, 1 ],
      plannedRegularEntryIds: [],
      plannedDelayedExpenses: newPlannedDelayedExpenses,
    };

    const sentBudgetPlanDtoInDb: Omit<BudgetPlan, 'id' | 'softDeleted'> = {
      month: Month.August,
      year: 2025,
      otherEntries,
      plannedOtherEntryIndexes: [ 0, 1 ],
      plannedRegularEntryIds: [],
      plannedDelayedExpenseIds: [ 1, 3 ]
    };

    const result = await budgetPlanService.updateItem(1, dto);

    expect(result.status).toBe(200);
    expect(result.data).toBe(true);

    expect(delayedExpensesService.deleteItem).toHaveBeenCalledWith(2);
    expect(delayedExpensesService.createItem).toHaveBeenCalledWith(newPlannedDelayedExpenses[1]);

    expect(dbService.updateOrCreateItem).toHaveBeenCalledWith(budgetPlanService.tableName, sentBudgetPlanDtoInDb);
    expect(dbService.runBatch).toHaveBeenCalledWith([ budgetPlanService.tableName, delayedExpensesService.tableName ]);
    expect(dbService.doneBatch).toHaveBeenCalled();

  });

  it('should revert updating a budget plan', async () => {
    vi.spyOn(dbService, 'doneBatch').mockReturnValue(Promise.resolve());
    vi.spyOn(dbService, 'runBatch').mockReturnValue();
    vi.spyOn(dbService, 'revertBatch').mockReturnValue(Promise.resolve());
    vi.spyOn(dbService, 'updateOrCreateItem').mockImplementation(() => {
      throw { status: 500, message: ErrorTexts.UnknownError } satisfies DatabaseResultOperationError;
    });
    vi.spyOn(dbService, 'getItemById').mockImplementation(() => {
      throw { status: 500, message: ErrorTexts.UnknownError } satisfies DatabaseResultOperationError;
    });

    const dto: BudgetPlanDto = {
      month: Month.August,
      year: 2025,
      otherEntries,
      plannedOtherEntryIndexes: [ 0, 1 ],
      plannedRegularEntryIds: [],
      plannedDelayedExpenses: [],
    };

    try {
      await budgetPlanService.updateItem(1, dto);

      expect(dbService.doneBatch).toHaveBeenCalledTimes(0);
    } catch ( error: unknown ) {
      expect((error as DatabaseResultOperationError).status).toBe(500);
      expect((error as DatabaseResultOperationError).message).toBe(ErrorTexts.UnknownError);
      expect(dbService.runBatch).toHaveBeenCalledWith([ budgetPlanService.tableName, delayedExpensesService.tableName ]);
      expect(dbService.doneBatch).toHaveBeenCalledTimes(0);
      expect(dbService.revertBatch).toHaveBeenCalledTimes(1);
      expect(dbService.getItemById).toHaveBeenCalledWith(budgetPlanService.tableName, 1, false);
    }

  });

  it('should delete a budget plan with deleting related delayed expenses with softDelete = false', async () => {
    vi.spyOn(dbService, 'deleteItem').mockReturnValue(Promise.resolve({
      status: 200,
      data: true
    } satisfies DatabaseResultOperationSuccess<true>));
    vi.spyOn(dbService, 'doneBatch').mockReturnValue(Promise.resolve());
    vi.spyOn(dbService, 'runBatch').mockReturnValue();
    vi.spyOn(delayedExpensesService, 'deleteItem').mockReturnValue(Promise.resolve({
      status: 200,
      data: true
    } satisfies DatabaseResultOperationSuccess<boolean>));

    vi.spyOn(budgetPlanService, 'getItemById').mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: getByIdPlan
      } satisfies DatabaseResultOperationSuccess<BudgetPlan>);
    });

    const result = await budgetPlanService.deleteItem(1);

    expect(result.status).toBe(200);
    expect(result.data).toBe(true);
    expect(dbService.runBatch).toHaveBeenCalledWith([ budgetPlanService.tableName, delayedExpensesService.tableName ]);
    expect(dbService.doneBatch).toHaveBeenCalled();
    expect(delayedExpensesService.deleteItem).toHaveBeenNthCalledWith(1, 1);
    expect(delayedExpensesService.deleteItem).toHaveBeenNthCalledWith(2, 2);
  });

  it('should revert deleting a budget plan', async () => {
    vi.spyOn(dbService, 'doneBatch').mockReturnValue(Promise.resolve());
    vi.spyOn(dbService, 'runBatch').mockReturnValue();
    vi.spyOn(dbService, 'revertBatch').mockReturnValue(Promise.resolve());
    vi.spyOn(dbService, 'deleteItem').mockReturnValue(Promise.resolve({
      status: 200,
      data: true
    } satisfies DatabaseResultOperationSuccess<true>));
    vi.spyOn(delayedExpensesService, 'deleteItem').mockReturnValue(Promise.resolve({
      status: 200,
      data: true
    } satisfies DatabaseResultOperationSuccess<boolean>));
    vi.spyOn(dbService, 'getItemById').mockImplementation(() => {
      throw { status: 500, message: ErrorTexts.UnknownError } satisfies DatabaseResultOperationError;
    });

    try {
      await budgetPlanService.deleteItem(1);

      expect(dbService.doneBatch).toHaveBeenCalledTimes(0);
    } catch ( error: unknown ) {
      expect((error as DatabaseResultOperationError).status).toBe(500);
      expect((error as DatabaseResultOperationError).message).toBe(ErrorTexts.UnknownError);
      expect(dbService.runBatch).toHaveBeenCalledWith([ budgetPlanService.tableName, delayedExpensesService.tableName ]);
      expect(dbService.doneBatch).toHaveBeenCalledTimes(0);
      expect(dbService.revertBatch).toHaveBeenCalledTimes(1);
      expect(dbService.getItemById).toHaveBeenCalledWith(budgetPlanService.tableName, 1, false);
    }

  });

  it('should get by id = 1', async () => {
    vi.spyOn(dbService, 'getItemById').mockReturnValue(Promise.resolve({
      status: 200,
      data: getByIdPlan
    } satisfies DatabaseResultOperationSuccess<BudgetPlan>));

    const result = await budgetPlanService.getItemById(1);

    expect(result.status).toBe(200);
    expect(JSON.stringify(result.data)).toBe(JSON.stringify(getByIdPlan));

    expect(dbService.getItemById).toHaveBeenCalledWith(budgetPlanService.tableName, 1, false);
  });
});