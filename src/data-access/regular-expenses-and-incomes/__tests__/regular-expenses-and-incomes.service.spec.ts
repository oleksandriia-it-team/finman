import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DatabaseService } from '../../database/database.service';
import { RegularExpensesAndIncomesService } from '../regular-expenses-and-incomes.service';
import { DatabaseResultOperationSuccess } from '../../../shared/models/database-result-operation.model';
import { RegularEntry } from '../../budget-plan/models/entry.model';
import { TypeEntry } from '../../budget-plan/enums/entry.enum';

describe('RegularExpensesAndIncomesService', () => {
  let dbService: DatabaseService;
  let service: RegularExpensesAndIncomesService;

  const data: Omit<RegularEntry, 'id' | 'softDeleted'> = {
    type: TypeEntry.Income,
    description: 'Salary',
    delayed: true,
    sum: 50000
  };

  beforeEach(() => {
    dbService = new DatabaseService('UNIT_TESTS', [], 1);

    service = new RegularExpensesAndIncomesService(dbService);
  });

  it('should create a regular entry', async () => {
    vi.spyOn(dbService, 'updateOrCreateItem').mockReturnValue(Promise.resolve({
      status: 200,
      data: 1
    } satisfies DatabaseResultOperationSuccess<number>));

    const result = await service.createItem(data);

    expect(result.status).toBe(200);

    expect(result.data).toBe(1);

    expect(dbService.updateOrCreateItem).toHaveBeenCalledExactlyOnceWith(service.tableName, data);
  });

  it('should update a regular entry with id = 1', async () => {
    vi.spyOn(dbService, 'updateOrCreateItem').mockReturnValue(Promise.resolve({
      status: 200,
      data: 1
    } satisfies DatabaseResultOperationSuccess<number>));

    const result = await service.updateItem(1, data);

    expect(result.status).toBe(200);

    expect(result.data).toBe(true);

    expect(dbService.updateOrCreateItem).toHaveBeenCalledExactlyOnceWith(service.tableName, { ...data, id: 1 });
  });

  it('should delete a regular entry with id = 1 with softDeleted = true', async () => {
    vi.spyOn(dbService, 'deleteItem').mockReturnValue(Promise.resolve({
      status: 200,
      data: true
    } satisfies DatabaseResultOperationSuccess<boolean>));

    const result = await service.deleteItem(1);

    expect(result.status).toBe(200);

    expect(result.data).toBe(true);

    expect(dbService.deleteItem).toHaveBeenCalledExactlyOnceWith(service.tableName, 1, true);
  });

  it('should get 5 items including softDeleted', async () => {
    const data = Array.from({ length: 5 }).map((_, index) => ({
      id: index + 1,
      softDeleted: index % 2 === 0 ? 1 : 0,
      // eslint-disable-next-line
      // @ts-ignore
      type: (TypeEntry as never)[index % 3],
      description: `Description ${index}`,
      regular: true,
      sum: index * 100
    }) satisfies RegularEntry)

    vi.spyOn(dbService, 'getItems').mockReturnValue(
      Promise.resolve({
        status: 200,
        data,
      } satisfies DatabaseResultOperationSuccess<RegularEntry[]>)
    );

    const result = await service.getItemsWithSoftDeleted(1, 5);

    expect(result.status).toBe(200);
    expect(JSON.stringify(result.data)).toBe(JSON.stringify(data));
    expect(dbService.getItems).toHaveBeenCalledWith(service.tableName, 1, 5, true);
  })
});