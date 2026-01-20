import { DatabaseService } from '../database.service';
import { DatabaseResultOperationSuccess } from '../../../common/models/database-result-operation.model';
import { ICrudService } from '../models/crud-service.model';
import { RecordModel } from '../../shared/models/record.model';
import { DefaultTableColumns } from '../models/default-table-columns.model';

/**
 * Abstract base class for CRUD operations on a specific IndexedDB table.
 *
 * @template T - The full shape of the table's records, extending DefaultTableColumns (must include `id` and `softDeleted`).
 * @template DTO - The Data Transfer Object used for creating/updating records. Defaults to all controlled-fields in T except `id`.
 *
 * @remarks
 * This class provides base implementations for common operations like retrieving items by ID,
 * paginated item retrieval, and total item count. It delegates actual database work to the
 * `DatabaseService` and expects the child class to implement `createItem`, `updateItem`, and `deleteItem`.
 *
 * @example
 * class UserService extends CrudService<UserRecord> {
 *   async createItem(data: UserDTO) { ... }
 *   async updateItem(id: number, data: UserDTO) { ... }
 *   async deleteItem(id: number) { ... }
 * }
 */
export abstract class CrudService<T extends DefaultTableColumns, DTO extends RecordModel = Omit<T, 'id' | 'softDeleted'>> implements ICrudService<T, DTO> {

  protected constructor(protected readonly databaseService: DatabaseService, readonly tableName: string) {
  }

  getItemById(id: number): Promise<DatabaseResultOperationSuccess<T | null>> {
    return this.databaseService.getItemById(this.tableName, id, false);
  }

  async getItems(first: number, last: number): Promise<DatabaseResultOperationSuccess<T[]>> {
    return this.databaseService.getItems(this.tableName, first, last, false);
  }

  abstract createItem(data: DTO): Promise<DatabaseResultOperationSuccess<number>>;

  abstract updateItem(id: number, data: DTO): Promise<DatabaseResultOperationSuccess<true>>;

  abstract deleteItem(id: number): Promise<DatabaseResultOperationSuccess<true>>;

  getTotalCount(): Promise<DatabaseResultOperationSuccess<number>> {
    return this.databaseService.getTotalCount(this.tableName, false);
  }
}