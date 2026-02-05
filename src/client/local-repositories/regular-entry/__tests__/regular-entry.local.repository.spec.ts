import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DatabaseLocalService } from '../../../database/database.local.service';
import { RegularEntryLocalRepository } from '../regular-entry.local.repository';
import { TypeEntry } from '../../../../common/enums/entry.enum';
import { RegularEntry } from '../../../../common/records/regular-entry.record';

describe('RegularEntryLocalRepository', () => {
  let dbService: DatabaseLocalService;
  let service: RegularEntryLocalRepository;

  const data: Omit<RegularEntry, 'id' | 'softDeleted'> = {
    type: TypeEntry.Income,
    description: 'Salary',
    delayed: true,
    sum: 50000,
  };

  beforeEach(() => {
    dbService = new DatabaseLocalService('UNIT_TESTS', [], 1);

    service = new RegularEntryLocalRepository(dbService);
  });

  it('should create a regular entry', async () => {
    vi.spyOn(dbService, 'updateOrCreateItem').mockReturnValue(Promise.resolve(1));

    const result = await service.createItem(data);

    expect(result).toBe(1);

    expect(dbService.updateOrCreateItem).toHaveBeenCalledExactlyOnceWith(service.tableName, data);
  });

  it('should update a regular entry with id = 1', async () => {
    vi.spyOn(dbService, 'updateOrCreateItem').mockReturnValue(Promise.resolve(1));

    const result = await service.updateItem(1, data);

    expect(result).toBe(true);

    expect(dbService.updateOrCreateItem).toHaveBeenCalledExactlyOnceWith(service.tableName, { ...data, id: 1 });
  });

  it('should delete a regular entry with id = 1 with softDeleted = true', async () => {
    vi.spyOn(dbService, 'deleteItem').mockReturnValue(Promise.resolve(true));

    const result = await service.deleteItem(1);

    expect(result).toBe(true);

    expect(dbService.deleteItem).toHaveBeenCalledExactlyOnceWith(service.tableName, 1, true);
  });

  it('should get 5 items including softDeleted', async () => {
    const data = Array.from({ length: 5 }).map(
      (_, index) =>
        ({
          id: index + 1,
          softDeleted: index % 2 === 0 ? 1 : 0,
          // eslint-disable-next-line
          // @ts-ignore
          type: (TypeEntry as never)[index % 3],
          description: `Description ${index}`,
          regular: true,
          sum: index * 100,
        }) satisfies RegularEntry,
    );

    vi.spyOn(dbService, 'getItems').mockReturnValue(Promise.resolve(data));

    const result = await service.getItemsWithSoftDeleted(1, 5);

    expect(JSON.stringify(result)).toBe(JSON.stringify(data));
    expect(dbService.getItems).toHaveBeenCalledWith(service.tableName, 1, 5, true);
  });
});
