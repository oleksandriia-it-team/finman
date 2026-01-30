import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CrudService } from '../crud.service';
import { DefaultTableColumns } from '../../models/default-table-columns.model';
import { DatabaseResultOperationSuccess } from '../../../../common/models/database-result-operation.model';
import { DatabaseService } from '../../database.service';

const tableName = 'TEST';

class CrudServiceForUnitTest extends CrudService<DefaultTableColumns> {
  constructor(databaseService: DatabaseService) {
    super(databaseService, tableName);
  }

  // eslint-disable-next-line
  // @ts-ignore
  // eslint-disable-next-line
  createItem(data: Omit<DefaultTableColumns, 'id' | 'softDeleted'>): Promise<DatabaseResultOperationSuccess<number>> {
    return Promise.resolve({ status: 200, data: 1 });
  }

  // eslint-disable-next-line
  // @ts-ignore

  updateItem(
    id: number,
    data: Omit<DefaultTableColumns, 'id' | 'softDeleted'>,
  ): Promise<DatabaseResultOperationSuccess<true>> {
    return Promise.resolve({ status: 200, data: true });
  }

  // eslint-disable-next-line
  // @ts-ignore
  // eslint-disable-next-line
  deleteItem(id: number): Promise<DatabaseResultOperationSuccess<true>> {
    return Promise.resolve({ status: 200, data: true });
  }
}

describe('CrudService', () => {
  let dbService: DatabaseService;
  let service: CrudServiceForUnitTest;

  beforeEach(() => {
    dbService = new DatabaseService('UNIT_TESTS', [], 1);

    service = new CrudServiceForUnitTest(dbService);
  });

  it('should return null when try to retrieve item with id = 1', async () => {
    vi.spyOn(dbService, 'getItemById').mockReturnValue(
      Promise.resolve({
        status: 200,
        data: null,
      } satisfies DatabaseResultOperationSuccess<null>),
    );

    const result = await service.getItemById(1);

    expect(result.status).toBe(200);
    expect(result.data).toBe(null);

    expect(dbService.getItemById).toHaveBeenCalledExactlyOnceWith(tableName, 1, false);
  });

  it('should return totalCount = 0', async () => {
    vi.spyOn(dbService, 'getTotalCount').mockReturnValue(
      Promise.resolve({
        status: 200,
        data: 0,
      } satisfies DatabaseResultOperationSuccess<number>),
    );

    const result = await service.getTotalCount();

    expect(result.status).toBe(200);
    expect(result.data).toBe(0);

    expect(dbService.getTotalCount).toHaveBeenCalledExactlyOnceWith(tableName, false);
  });

  it('should call getItems from 1 to 12 indexes and return []', async () => {
    vi.spyOn(dbService, 'getItems').mockReturnValue(
      Promise.resolve({
        status: 200,
        data: [],
      } satisfies DatabaseResultOperationSuccess<DefaultTableColumns[]>),
    );

    const result = await service.getItems(1, 12);

    expect(result.status).toBe(200);
    expect(result.data.length).toBe(0);

    expect(dbService.getItems).toHaveBeenCalledExactlyOnceWith(tableName, 1, 12, false);
  });
});
