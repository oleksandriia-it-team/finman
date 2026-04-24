import { getErrorMessage } from '@common/utils/get-error-message.util';
import { isEmpty } from '@common/utils/is-empty.util';
import { ErrorDataBaseConnection, ErrorTexts } from '@common/constants/error-texts.contant';
import { DatabaseName, Tables } from '../shared/constants/database.constants';
import { type DefaultTableColumns } from '@common/models/default-table-columns.model';
import { type RecordModel } from '@common/models/record.model';
import { DexieService } from '@frontend/database/dexie.service';
import Dexie, { type Table, type Transaction } from 'dexie';
import type { FilterPredicate } from '@frontend/shared/models/local-filter.model';

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
    this.db = new DexieService(this.databaseName, this.tables, this.version);
    // Dexie opens the connection lazily on first operation; calling open()
    // here ensures errors surface early.
    await this.db.open();
  }

  close(): void {
    this.db?.close();
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
      const item = (await this.table<T>(tableName).get(id)) ?? null;
      if (!includeSoftDeleted && item?.softDeleted) return null;
      return item;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  /**
   * Returns a paginated slice of records.
   *
   * @param tableName          - Target object store name.
   * @param start              - Zero-based offset of the first record to return.
   * @param end                - Zero-based offset of the last record to return (inclusive).
   * @param includeSoftDeleted - When false, records with `softDeleted: 1` are skipped.
   * @param mapFilters         - Optional array of predicate functions.
   * A record is included only if ALL predicates return true.
   * @returns                  - A promise that resolves to an array of filtered and paginated records.
   */
  async getItems<T extends DefaultTableColumns>(
    tableName: string,
    start: number,
    end: number,
    includeSoftDeleted: boolean,
    mapFilters?: FilterPredicate<T>[],
  ): Promise<T[]> {
    const predicateFn = mapFilters && mapFilters.length ? (item: T) => mapFilters?.every((fn) => fn(item)) : undefined;

    try {
      const limit = end - start + 1;

      let collection = this.table<T>(tableName).toCollection();

      // Apply softDeleted guard
      if (!includeSoftDeleted) {
        collection = collection.filter((item) => item.softDeleted === 0);
      }

      // Apply domain filters if provided
      if (predicateFn) {
        collection = collection.filter(predicateFn);
      }

      return await collection.offset(start).limit(limit).toArray();
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  /**
   * Returns the total number of records, optionally filtered.
   *
   * @param tableName          - Target object store name.
   * @param includeSoftDeleted - When false, records with `softDeleted: 1` are excluded from the count.
   * @param mapFilters         - Optional array of predicate functions.
   * If provided, triggers in-memory filtering (slower than indexed count).
   * @returns                  - A promise that resolves to the total number of matching records.
   */
  async getTotalCount<T extends DefaultTableColumns>(
    tableName: string,
    includeSoftDeleted: boolean,
    mapFilters?: FilterPredicate<T>[],
  ): Promise<number> {
    try {
      const predicateFn =
        mapFilters && mapFilters.length ? (item: T) => mapFilters?.every((fn) => fn(item)) : undefined;
      const hasExtraFilters = !!predicateFn;

      // Fast path — no extra filters, use Dexie index
      if (!hasExtraFilters) {
        if (includeSoftDeleted) {
          return await this.table(tableName).count();
        }
        return await this.table(tableName).where('softDeleted').equals(0).count();
      }

      // Slow path — need in-memory filtering
      let collection = this.table<T>(tableName).toCollection();

      if (!includeSoftDeleted) {
        collection = collection.filter((item) => item.softDeleted === 0);
      }

      if (predicateFn) {
        collection = collection.filter(predicateFn);
      }

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

    if (!('id' in data)) {
      (data as Record<string, unknown>).id = Date.now() * 1000 + Math.floor(Math.random() * 1000); // Generate a unique ID based on timestamp and random number
    } else if (typeof data.id !== 'number') {
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
   * @example
   * await dbService.runBatch(['budgetPlans', 'delayedExpenses'], async () => {
   *   await dbService.updateOrCreateItem('budgetPlans', plan);
   *   await dbService.updateOrCreateItem('delayedExpenses', expense);
   * });
   *
   */
  async runBatch<T>(tableNames: string | string[], work: () => Promise<T>): Promise<T> {
    if (this.#tx) {
      throw new Error(ErrorTexts.PrevBatchIsNotDone);
    }

    const names = Array.isArray(tableNames) ? tableNames : [tableNames];

    // Cast to base Dexie to avoid TS2589: the dynamic index signature on
    // DexieService causes TypeScript to recurse infinitely across all
    // transaction() overloads when resolving the table array element type.
    const dexie = this.db as unknown as Dexie;

    return dexie.transaction(
      'rw',
      names.map((n) => dexie.table(n)),
      async () => {
        this.#tx = Dexie.currentTransaction;
        try {
          return await work();
        } finally {
          this.#tx = null;
        }
      },
    ) as Promise<T>;
  }

  // -------------------------------------------------------------------------
  // Utilities
  // -------------------------------------------------------------------------

  async clearDatabase(): Promise<void> {
    try {
      // eslint-disable-next-line
      // @ts-ignore
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
export const databaseLocalService = new DatabaseLocalService(DatabaseName, Object.values(Tables), 1);
