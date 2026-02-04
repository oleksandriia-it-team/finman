import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DelayedExpensesService } from '../delayed-expenses.service';
import { DatabaseService } from '../../../database/database.service';
import { TypeEntry } from '../../../shared/enums/entry.enum';
import { DelayedExpense } from '../../budget-plan/models/entry.model';
import { Month } from '../../../shared/enums/month.enum';

describe('DelayedExpensesService', () => {
  let dbService: DatabaseService;
  let service: DelayedExpensesService;

  const data: Omit<DelayedExpense, 'id' | 'softDeleted'> = {
    type: TypeEntry.Expense,
    description: 'Buy outfit',
    delayed: true,
    delayedMonth: Month.August,
    delayedYear: 2025,
    sum: 200,
  };

  beforeEach(() => {
    dbService = new DatabaseService('UNIT_TESTS', [], 1);

    service = new DelayedExpensesService(dbService);
  });

  it('should create a delayed expense', async () => {
    vi.spyOn(dbService, 'updateOrCreateItem').mockReturnValue(Promise.resolve(1));

    const result = await service.createItem(data);

    expect(result).toBe(1);

    expect(dbService.updateOrCreateItem).toHaveBeenCalledExactlyOnceWith(service.tableName, data);
  });

  it('should update a delayed expense with id = 1', async () => {
    vi.spyOn(dbService, 'updateOrCreateItem').mockReturnValue(Promise.resolve(1));

    const result = await service.updateItem(1, data);

    expect(result).toBe(true);

    expect(dbService.updateOrCreateItem).toHaveBeenCalledExactlyOnceWith(service.tableName, { ...data, id: 1 });
  });

  it('should delete a delayed expense with id = 1 with softDeleted = false', async () => {
    vi.spyOn(dbService, 'deleteItem').mockReturnValue(Promise.resolve(true));

    const result = await service.deleteItem(1);

    expect(result).toBe(true);

    expect(dbService.deleteItem).toHaveBeenCalledExactlyOnceWith(service.tableName, 1, false);
  });
});
