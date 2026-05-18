import { type DatabaseLocalService } from '../database.local.service';
import { type ICrudService } from '@common/models/crud-service.model';
import { type RecordModel } from '@common/models/record.model';
import { type DefaultColumnKeys, type DefaultTableColumns } from '@common/models/default-table-columns.model';
import type { DeepPartial } from '@common/models/deep-partial.model';
import type { FilterPredicate } from '@frontend/shared/models/local-filter.model';
import type { OrderByLocalModel } from '@frontend/shared/models/order-by.local.model';

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
export abstract class CrudLocalRepository<
  T extends DefaultTableColumns,
  F extends object,
  DTO extends RecordModel = Omit<T, DefaultColumnKeys>,
> implements ICrudService<T, DTO> {
  protected constructor(
    protected readonly databaseLocalService: DatabaseLocalService,
    readonly tableName: string,
  ) {}

  get table() {
    return this.databaseLocalService.table<T>(this.tableName);
  }

  getItemById(id: number): Promise<T | null> {
    return this.databaseLocalService.getItemById(this.tableName, id, false);
  }

  async getItems(
    from: number,
    to: number,
    filters?: DeepPartial<F> | undefined,
    orderBy?: OrderByLocalModel,
  ): Promise<T[]> {
    return this.databaseLocalService.getItems(this.tableName, from, to, false, this.mapFilters(filters), orderBy);
  }

  abstract createItem(data: DTO): Promise<number>;

  abstract updateItem(id: number, data: DTO): Promise<void>;

  abstract deleteItem(id: number, softDeleted?: boolean): Promise<void>;

  getTotalCount(filters?: DeepPartial<F> | undefined): Promise<number> {
    return this.databaseLocalService.getTotalCount(this.tableName, false, this.mapFilters(filters));
  }

  protected mapFilters(_: DeepPartial<F> | undefined): FilterPredicate<T>[] {
    return [];
  }
}
