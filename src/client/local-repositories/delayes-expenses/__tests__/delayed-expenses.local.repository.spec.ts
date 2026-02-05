import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DelayedExpensesLocalRepository } from '../delayed-expenses.local.repository';
import { DatabaseLocalService } from '../../../database/database.local.service';
import { TypeEntry } from '../../../../common/enums/entry.enum';
import { Month } from '../../../../common/enums/month.enum';
import { DelayedExpense } from '../../../../common/records/delayed-expenses.record';

describe('DelayedExpensesLocalRepository', () => {
  let dbService: DatabaseLocalService;
  let service: DelayedExpensesLocalRepository;

  const data: Omit<DelayedExpense, 'id' | 'softDeleted'> = {
    type: TypeEntry.Expense,
    description: 'Buy outfit',
    delayed: true,
    delayedMonth: Month.August,
    delayedYear: 2025,
    sum: 200,
  };

  beforeEach(() => {
    dbService = new DatabaseLocalService('UNIT_TESTS', [], 1);

    service = new DelayedExpensesLocalRepository(dbService);
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
