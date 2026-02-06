import { DatabaseLocalService } from '../database.local.service';
import { ICrudService } from '../../../common/models/crud-service.model';
import { RecordModel } from '../../../common/models/record.model';
import { DefaultTableColumns } from '../../../common/models/default-table-columns.model';

/**
 * Abstract base class for CRUD operations on a specific IndexedDB table.
 *
 * @template T - The full shape of the table's records, extending DefaultTableColumns (must include `id` and `softDeleted`).
 * @template DTO - The Data Transfer Object used for creating/updating records. Defaults to all controlled-fields in T except `id`.
 *
 * @remarks
 * This class provides base implementations for common operations like retrieving items by ID,
 * paginated item retrieval, and total item count. It delegates actual database work to the
 * `DatabaseLocalService` and expects the child class to implement `createItem`, `updateItem`, and `deleteItem`.
 *
 * @example
 * class UserService extends CrudLocalService<UserRecord> {
 *   async createItem(data: UserDTO) { ... }
 *   async updateItem(id: number, data: UserDTO) { ... }
 *   async deleteItem(id: number) { ... }
 * }
 */
export abstract class CrudLocalService<
  T extends DefaultTableColumns,
  DTO extends RecordModel = Omit<T, 'id' | 'softDeleted'>,
> implements ICrudService<T, DTO> {
  protected constructor(
    protected readonly databaseService: DatabaseLocalService,
    readonly tableName: string,
  ) {}

  getItemById(id: number): Promise<T | null> {
    return this.databaseService.getItemById(this.tableName, id, false);
  }

  async getItems(first: number, last: number): Promise<T[]> {
    return this.databaseService.getItems(this.tableName, first, last, false);
  }

  abstract createItem(data: DTO): Promise<number>;

  abstract updateItem(id: number, data: DTO): Promise<true>;

  abstract deleteItem(id: number): Promise<true>;

  getTotalCount(): Promise<number> {
    return this.databaseService.getTotalCount(this.tableName, false);
  }
}
