import { getErrorMessage } from '@common/utils/get-error-message.util';
import { isEmpty } from '@common/utils/is-empty.util';
import { ErrorDataBaseConnection, ErrorTexts } from '@common/constants/error-texts.contant';
import { DatabaseName, Tables } from '../shared/constants/database.constants';
import { type DefaultTableColumns } from '@common/models/default-table-columns.model';
import { type RecordModel } from '@common/models/record.model';
import { DexieService } from '@frontend/database/dexie.service';
import { type Table, type Transaction } from 'dexie';
import type { DeepPartial } from '@common/models/deep-partial.model';
import type { FilterPredicate, LocalFilter } from '@frontend/shared/models/local-filter.model';

/**
 * Service for interacting with an IndexedDB database via **Dexie**.
 *
 * @remarks
 * Drop-in replacement for the previous `idb`-based implementation.
 * Public API is identical; the internals are much simpler.
 *
 * New capabilities compared to the original:
 * - `getItems` and `getTotalCount` now accept an optional `filters` argument
 *   that is translated by `mapFilters` into a Dexie `Collection` filter.
 * - `mapFilters` is a protected hook — override it in subclasses (or in
 *   concrete repositories) to add domain-specific filtering logic, exactly
 *   like `CrudApiRepository.mapFilters`.
 *
 * @example
 * const dbService = new DatabaseLocalService('AppDB', ['users'], 1);
 * await dbService.connect();
 * const user = await dbService.getItemById<User>('users', 1, false);
 */
export class DatabaseLocalService {
  protected db!: DexieService;

  /** Active Dexie transaction scope (null when no batch is running). */
  #tx: Transaction | null = null;

  constructor(
    private readonly databaseName: string,
    private readonly tables: string[],
    private readonly version: number,
  ) {}

  // -------------------------------------------------------------------------
  // Static factory
  // -------------------------------------------------------------------------

  static async initDB(databaseName: string, tables: string[], version: number): Promise<DatabaseLocalService> {
    const instance = new this(databaseName, tables, version);
    try {
      await instance.connect();
      console.log('DB connection created');
      return instance;
    } catch {
      throw new Error(ErrorDataBaseConnection);
    }
  }

  // -------------------------------------------------------------------------
  // Connection
  // -------------------------------------------------------------------------

  async connect(): Promise<void> {
    this.db = new DexieService(this.databaseName, this.tables);
    // Dexie opens the connection lazily on first operation; calling open()
    // here ensures errors surface early.
    await this.db.open();
  }

  close(): void {
    this.db?.close();
  }

  // -------------------------------------------------------------------------
  // Filter hook  (override in subclasses / repositories)
  // -------------------------------------------------------------------------

  /**
   * Translates a domain filter object into a predicate that Dexie's
   * `.filter()` can consume.
   *
   * The default implementation handles only the `softDeleted` flag that every
   * table shares.  Override this method in a concrete repository to add
   * domain-specific conditions:
   *
   * @example
   * // In RegularEntryLocalRepository:
   * protected override mapFilters(filters: DeepPartial<RegularEntryFilter>) {
   *   return (item: RegularEntry) => {
   *     if (filters.type !== undefined && item.type !== filters.type) return false;
   *     if (filters.softDeleted !== undefined && item.softDeleted !== filters.softDeleted) return false;
   *     return true;
   *   };
   * }
   */
  protected mapFilters<T extends DefaultTableColumns>(filters: DeepPartial<LocalFilter>): FilterPredicate<T> {
    return (item: T) => {
      if (filters.softDeleted !== undefined && item.softDeleted !== filters.softDeleted) {
        return false;
      }
      return true;
    };
  }

  // -------------------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------------------

  private table<T extends DefaultTableColumns>(name: string): Table<T, number> {
    return this.db.table<T, number>(name);
  }

  // -------------------------------------------------------------------------
  // CRUD
  // -------------------------------------------------------------------------

  async getItemById<T extends DefaultTableColumns>(
    tableName: string,
    id: number,
    includeSoftDeleted: boolean,
  ): Promise<T | null> {
    try {
      const run = async () => {
        const item = (await this.table<T>(tableName).get(id)) ?? null;
        if (!includeSoftDeleted && item?.softDeleted) return null;
        return item;
      };

      return this.#tx
        ? await this.#tx.db
            .table<T, number>(tableName)
            .get(id)
            .then((item) => {
              if (!item) return null;
              if (!includeSoftDeleted && item.softDeleted) return null;
              return item;
            })
        : await run();
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  /**
   * Returns a paginated slice of records.
   *
   * @param tableName  - target object store
   * @param start      - zero-based offset of the first record to return
   * @param end        - zero-based offset of the last record to return (inclusive)
   * @param includeSoftDeleted - when false, soft-deleted rows are skipped
   * @param filters    - optional domain filter; translated via `mapFilters`
   */
  async getItems<T extends DefaultTableColumns, F extends LocalFilter = LocalFilter>(
    tableName: string,
    start: number,
    end: number,
    includeSoftDeleted: boolean,
    filters?: DeepPartial<F>,
  ): Promise<T[]> {
    try {
      const limit = end - start + 1;

      let collection = this.table<T>(tableName).toCollection();

      // Apply softDeleted guard
      if (!includeSoftDeleted) {
        collection = collection.filter((item) => item.softDeleted === 0);
      }

      // Apply domain filters if provided
      if (filters && !isEmpty(filters)) {
        const predicate = this.mapFilters<T>(filters);
        collection = collection.filter(predicate);
      }

      return await collection.offset(start).limit(limit).toArray();
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  /**
   * Returns the total number of records (optionally filtered).
   *
   * @param tableName          - target object store
   * @param includeSoftDeleted - when false, soft-deleted rows are excluded
   * @param filters            - optional domain filter; translated via `mapFilters`
   */
  async getTotalCount<F extends LocalFilter = LocalFilter>(
    tableName: string,
    includeSoftDeleted: boolean,
    filters?: DeepPartial<F>,
  ): Promise<number> {
    try {
      const hasExtraFilters = filters && !isEmpty(filters);

      // Fast path — no extra filters, use Dexie index
      if (!hasExtraFilters) {
        if (includeSoftDeleted) {
          return await this.table(tableName).count();
        }
        return await this.table(tableName).where('softDeleted').equals(0).count();
      }

      // Slow path — need in-memory filtering
      let collection = this.table(tableName).toCollection();

      if (!includeSoftDeleted) {
        collection = collection.filter((item) => item.softDeleted === 0);
      }

      const predicate = this.mapFilters(filters!);
      collection = collection.filter(predicate);

      return await collection.count();
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getPrevOrNextItem<T extends DefaultTableColumns>(
    next: boolean,
    tableName: string,
    id: number,
    includeSoftDeleted: boolean,
  ): Promise<T | null> {
    try {
      // Dexie's .where().above/.below gives us a sorted cursor cheaply
      const collection = next
        ? this.table<T>(tableName).where('id').above(id)
        : this.table<T>(tableName).where('id').below(id).reverse();

      if (includeSoftDeleted) {
        return (await collection.first()) ?? null;
      }

      return (await collection.filter((item) => item.softDeleted === 0).first()) ?? null;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getFirstElement<T extends DefaultTableColumns>(
    tableName: string,
    includeSoftDeleted: boolean,
  ): Promise<T | null> {
    try {
      if (includeSoftDeleted) {
        return (await this.table<T>(tableName).toCollection().first()) ?? null;
      }
      return (await this.table<T>(tableName).where('softDeleted').equals(0).first()) ?? null;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async updateOrCreateItem(tableName: string, data: RecordModel): Promise<number> {
    if (typeof data !== 'object' || isEmpty(data)) {
      throw new Error(ErrorTexts.IncorrectTypeData);
    }

    if (!('softDeleted' in data) || (data.softDeleted !== 0 && data.softDeleted !== 1)) {
      (data as Record<string, unknown>).softDeleted = 0;
    }

    if (!('id' in data) || typeof data.id !== 'number') {
      throw new Error(ErrorTexts.IncorrectIdProvided);
    }

    try {
      const table = this.table(tableName);
      // `put` inside an active transaction automatically uses it
      return await table.put(data as DefaultTableColumns & RecordModel);
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async deleteItem(tableName: string, id: number, softDelete: boolean): Promise<true> {
    try {
      const table = this.table(tableName);
      const item = await table.get(id);

      if (!item) throw new Error(ErrorTexts.RecordDoesNotExist);

      if (softDelete) {
        await table.update(id, { softDeleted: 1 });
      } else {
        await table.delete(id);
      }

      return true;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  // -------------------------------------------------------------------------
  // Batch transactions
  // -------------------------------------------------------------------------

  /**
   * Starts a read/write batch transaction covering the specified table(s).
   *
   * While the batch is active every Dexie operation **inside the same
   * transaction scope** participates in the same atomic unit.  Use
   * `doneBatch()` to commit and `revertBatch()` to roll back.
   *
   * @example
   * await dbService.runBatch(['budgetPlans', 'delayedExpenses'], async () => {
   *   await dbService.updateOrCreateItem('budgetPlans', plan);
   *   await dbService.updateOrCreateItem('delayedExpenses', expense);
   * });
   *
   * @remarks
   * Unlike the old idb implementation that stored `#tx` as a field and
   * required manual `doneBatch()` calls, this version wraps the callback in
   * `Dexie.transaction()` so the transaction lifecycle is managed
   * automatically.  The `#tx` field is kept for compatibility checks only.
   */
  async runBatch<T>(tableNames: string | string[], work: () => Promise<T>): Promise<T> {
    if (this.#tx) {
      throw new Error(ErrorTexts.PrevBatchIsNotDone);
    }

    const names = Array.isArray(tableNames) ? tableNames : [tableNames];

    return this.db.transaction(
      'rw',
      names.map((n) => this.db.table(n)),
      // eslint-disable-next-line
      // @ts-ignore
      async (tx) => {
        this.#tx = tx;
        try {
          return await work();
        } finally {
          this.#tx = null;
        }
      },
    );
  }

  // -------------------------------------------------------------------------
  // Utilities
  // -------------------------------------------------------------------------

  async clearDatabase(): Promise<void> {
    try {
      await this.db.transaction(
        'rw',
        this.tables.map((t) => this.db.table(t)),
        async () => {
          await Promise.all(this.tables.map((t) => this.db.table(t).clear()));
        },
      );
    } catch (error) {
      throw error;
    }
  }
}
export const databaseService = new DatabaseLocalService(DatabaseName, Object.values(Tables), 1);
