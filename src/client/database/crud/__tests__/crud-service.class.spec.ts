import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CrudLocalService } from '../crud.local.service';
import { DefaultColumnKeys, DefaultTableColumns } from '../../../../common/models/default-table-columns.model';
import { DatabaseLocalService } from '../../database.local.service';

const tableName = 'TEST';

class CrudServiceForUnitTest extends CrudLocalService<DefaultTableColumns> {
  constructor(databaseService: DatabaseLocalService) {
    super(databaseService, tableName);
  }

  // eslint-disable-next-line
  // @ts-ignore
  // eslint-disable-next-line
  createItem(data: Omit<DefaultTableColumns, DefaultColumnKeys>): Promise<number> {
    return Promise.resolve(1);
  }

  // eslint-disable-next-line
  // @ts-ignore

  updateItem(): Promise<true> {
    return Promise.resolve(true);
  }

  // eslint-disable-next-line
  // @ts-ignore
  // eslint-disable-next-line
  deleteItem(id: number): Promise<true> {
    return Promise.resolve(true);
  }
}

describe('CrudService', () => {
  let dbService: DatabaseLocalService;
  let service: CrudServiceForUnitTest;

  beforeEach(() => {
    dbService = new DatabaseLocalService('UNIT_TESTS', [], 1);

    service = new CrudServiceForUnitTest(dbService);
  });

  it('should return null when try to retrieve item with id = 1', async () => {
    vi.spyOn(dbService, 'getItemById').mockReturnValue(Promise.resolve(null));

    const result = await service.getItemById(1);

    expect(result).toBe(null);

    expect(dbService.getItemById).toHaveBeenCalledExactlyOnceWith(tableName, 1, false);
  });

  it('should return totalCount = 0', async () => {
    vi.spyOn(dbService, 'getTotalCount').mockReturnValue(Promise.resolve(0));

    const result = await service.getTotalCount();

    expect(result).toBe(0);

    expect(dbService.getTotalCount).toHaveBeenCalledExactlyOnceWith(tableName, false);
  });

  it('should call getItems from 1 to 12 indexes and return []', async () => {
    vi.spyOn(dbService, 'getItems').mockReturnValue(Promise.resolve([]));

    const result = await service.getItems(1, 12);

    expect(result.length).toBe(0);

    expect(dbService.getItems).toHaveBeenCalledExactlyOnceWith(tableName, 1, 12, false);
  });
});
