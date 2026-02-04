import { IDBPDatabase, IDBPTransaction, openDB } from 'idb';
import { getErrorMessage } from '../../common/utils/get-error-message.util';
import { RecordModel } from '../shared/models/record.model';
import { DefaultTableColumns } from './models/default-table-columns.model';
import { isEmpty } from '../../common/utils/is-empty.util';
import { ErrorDataBaseConnection, ErrorTexts } from '../../common/constants/error-texts.contant';
import { DatabaseName, Tables } from '../shared/constants/database.constants';

/**
 * Service for interacting with an IndexedDB database using the `idb` library.
 *
 * @remarks
 * Provides generic methods to perform CRUD operations on any table in the database.
 * Supports soft deletion through the `softDeleted` flag and uses an index to filter out
 * logically deleted records when needed.
 *
 * @example
 * const dbService = new DatabaseService('AppDB', ['users', 'posts'], 1);
 * const user = await dbService.getItemById<User>('users', 1, false);
 *
 * @constructor
 * @param databaseName - Name of the IndexedDB database to connect to.
 * @param tables - Array of table (object store) names to be created if they do not exist.
 * @param version - Version of the database, used for schema upgrades.
 */
export class DatabaseService {
  #db!: IDBPDatabase<unknown>;

  // eslint-disable-next-line
  #tx: IDBPTransaction<unknown, string | string[], any> | null = null;

  constructor(
    private databaseName: string,
    private tables: string[],
    private version: number,
  ) {
    if (!global.indexedDB) {
      return;
    }
  }

  get db() {
    return this.#db;
  }

  static initDB(databaseName: string, tables: string[], version: number): Promise<DatabaseService> {
    const instance = new this(databaseName, tables, version);

    return instance
      .connect()
      .then(() => {
        console.log('DB connection created');

        return instance;
      })
      .catch(() => {
        throw new Error(ErrorDataBaseConnection);
      });
  }

  async getItemById<T extends DefaultTableColumns>(
    tableName: string,
    id: number,
    includeSoftDeleted: boolean,
  ): Promise<T | null> {
    try {
      const store = this.#tx?.objectStore(tableName);
      const getFn = store ? store.get.bind(store) : this.#db.get.bind(this.#db, tableName);

      const item = (await getFn(id)) ?? null;
      if (!includeSoftDeleted && item && item.softDeleted) {
        return null;
      }
      return item as T;
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getItems<T extends DefaultTableColumns>(
    tableName: string,
    start: number,
    end: number,
    includeSoftDeleted: boolean,
  ): Promise<T[]> {
    const limit = end - start + 1;

    const tx = this.#db.transaction(tableName);

    try {
      const store = tx.objectStore(tableName);

      const results: T[] = [];
      let skipped = 0;
      let cursor = await store.openCursor();

      while (cursor && results.length < limit) {
        if (includeSoftDeleted || cursor.value.softDeleted === 0) {
          if (skipped >= start) {
            results.push(cursor.value);
          } else {
            skipped++;
          }
        }
        cursor = await cursor.continue();
      }

      await tx.done;

      return results;
    } catch (error: unknown) {
      tx.abort();

      throw new Error(getErrorMessage(error));
    }
  }

  /**
   * Retrieves the previous or next item relative to the given ID in the specified table.
   *
   * Iterates through the object store in the direction specified by `next` starting from the given `id`.
   * Skips items marked as soft deleted if `includeSoftDeleted` is false.
   *
   * @template T The type of items stored in the object store.
   * @param {boolean} next - If true, fetch the next item; if false, fetch the previous item.
   * @param {string} tableName - The name of the object store (table) to query.
   * @param {number} id - The key from which to start searching.
   * @param {boolean} includeSoftDeleted - Whether to include items marked as soft deleted.
   * @returns {Promise<T | null>}
   *          A promise resolving with the found item or null if none found.
   *
   * @throws {Error} Throws if an error occurs during the transaction.
   *
   * @example
   * ```ts
   * // Get the next item after id 5, excluding soft deleted items
   * const result = await getPrevOrNextItem(true, 'users', 5, false);
   * if(result) {
   *   console.log('Next item:', result);
   * } else {
   *   console.log('No next item found');
   * }
   * ```
   */
  async getPrevOrNextItem<T extends DefaultTableColumns>(
    next: boolean,
    tableName: string,
    id: number,
    includeSoftDeleted: boolean,
  ): Promise<T | null> {
    const tx = this.#db.transaction(tableName, 'readonly');
    const store = tx.objectStore(tableName);

    try {
      let cursor = await store.openCursor(
        next ? IDBKeyRange.lowerBound(id) : IDBKeyRange.upperBound(id),
        next ? 'next' : 'prev',
      );

      if (cursor && cursor.key === id) {
        cursor = await cursor.continue();
      }

      while (cursor) {
        if (includeSoftDeleted || cursor.value?.softDeleted === 0) {
          await tx.done;
          return (cursor.value as T) ?? null;
        }
        cursor = await cursor.continue();
      }

      await tx.done;
      return null;
    } catch (error: unknown) {
      tx.abort();
      throw new Error(getErrorMessage(error));
    }
  }

  async getFirstElement<T extends DefaultTableColumns>(
    tableName: string,
    includeSoftDeleted: boolean,
  ): Promise<T | null> {
    const tx = this.#db.transaction(tableName, 'readonly');
    const store = tx.objectStore(tableName);

    let cursor = await store.openCursor();

    while (!includeSoftDeleted && cursor?.value.softDeleted === 1) {
      cursor = await cursor.continue();
    }

    await tx.done;

    return (cursor?.value as T) ?? null;
  }

  async updateOrCreateItem(tableName: string, data: RecordModel): Promise<number> {
    if (typeof data !== 'object' || isEmpty(data)) {
      throw new Error(ErrorTexts.IncorrectTypeData);
    }

    if (data.softDeleted !== 0 && data.softDeleted !== 1) {
      data.softDeleted = 0;
    }

    if (typeof data.id !== 'number') {
      throw new Error(ErrorTexts.IncorrectIdProvided);
    }

    const store = this.#tx?.objectStore(tableName);

    // eslint-disable-next-line
    const putFn = store ? (store.put as any).bind(store) : this.#db.put.bind(this.#db, tableName);

    return putFn(data)
      .then((id: number) => id)
      .catch((error: unknown) => {
        throw new Error(getErrorMessage(error));
      });
  }

  async deleteItem(tableName: string, id: number, softDelete: boolean): Promise<true> {
    const store = this.#tx?.objectStore(tableName);
    const getFn = store ? store.get.bind(store) : this.#db.get.bind(this.#db, tableName);

    const item = await getFn(id);

    if (!item) {
      throw new Error(ErrorTexts.RecordDoesNotExist);
    }

    if (softDelete) {
      item.softDeleted = 1;

      const store = this.#tx?.objectStore(tableName);

      // eslint-disable-next-line
      const putFn = store ? (store.put as any).bind(store) : this.#db.put.bind(this.#db, tableName);

      return putFn(item)
        .then(() => true as const)
        .catch((error: unknown) => {
          throw new Error(getErrorMessage(error));
        });
    } else {
      const store = this.#tx?.objectStore(tableName);

      // eslint-disable-next-line
      const deleteFn = store ? (store.delete as any).bind(store) : this.#db.delete.bind(this.#db, tableName);

      return deleteFn(id)
        .then(() => true as const)
        .catch((error: unknown) => {
          throw new Error(getErrorMessage(error));
        });
    }
  }

  async getTotalCount(tableName: string, includeSoftDeleted: boolean): Promise<number> {
    const store = this.#db.transaction(tableName, 'readonly').objectStore(tableName);

    try {
      if (includeSoftDeleted) {
        return await store.count();
      } else {
        const index = store.index('softDeleted');

        return await index.count(IDBKeyRange.only(0));
      }
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error));
    }
  }

  async connect(): Promise<void> {
    this.#db = await openDB(this.databaseName, this.version, {
      upgrade: (db) => {
        this.tables.forEach((table) => {
          if (!db.objectStoreNames.contains(table)) {
            const store = db.createObjectStore(table, {
              keyPath: 'id',
              autoIncrement: true,
            });
            store.createIndex('softDeleted', 'softDeleted', { unique: false });
          }
        });
      },
    });
  }

  /**
   * Starts a new read/write batch transaction covering one or more object stores.
   *
   * ### Transaction Handling and Batch Operations
   *
   * This service is designed to support both simple CRUD operations and complex
   * multi-step atomic transactions using IndexedDB.
   *
   * **Key Points:**
   *
   * 1. **Implicit Transactions for Individual CRUD Methods**
   *    - Each CRUD method internally uses either the current active transaction
   *      or the database instance directly.
   *    - When no batch transaction is active, operations are executed individually
   *      without requiring explicit transaction management from the caller.
   *
   * 2. **Explicit Batch Transactions for Atomic Multi-Operation Batches**
   *    - To perform multiple operations atomically, you can start a batch
   *      transaction with the `runBatch()` method, specifying one or more object stores.
   *    - While the batch is active, all CRUD operations use the same transaction context.
   *    - Changes within the batch can be either committed using `doneBatch()` or
   *      aborted with `revertBatch()`.
   *    - This pattern enables grouping related operations to succeed or fail together,
   *      ensuring data consistency.
   *
   * 3. **Usage Example:**
   * ```ts
   * dbService.runBatch(['users', 'orders']);
   *
   * await dbService.updateOrCreateItem('users', { id: 1, name: 'Alice' });
   * await dbService.updateOrCreateItem('orders', { id: 100, userId: 1, total: 250 });
   *
   * await dbService.doneBatch(); // commits both inserts atomically
   * ```
   *
   * 4. **Best Practices:**
   *    - Always finalize a batch transaction by calling either `doneBatch()` or `revertBatch()`.
   *    - Avoid overlapping batch transactions to prevent conflicts (an error is thrown if you try).
   *    - Use batch transactions when multiple related operations must be atomic,
   *      otherwise simple CRUD methods work fine standalone.
   *
   * 5. **Error Handling:**
   *    - If any operation inside a batch fails, you can call `revertBatch()` to
   *      abort all changes in the batch.
   *    - This rollback ensures the database remains in a consistent state.
   *
   * ---
   *
   * This design offers maximum flexibility by combining ease of use for simple cases
   * and powerful transactional control for complex workflows.
   */
  runBatch(tableNames: string | string[]): void {
    if (this.#tx) {
      throw new Error(getErrorMessage(this.#tx));
    }

    this.#tx = this.#db.transaction(tableNames, 'readwrite');
  }

  /**
   * Finalizes the currently open batch transaction.
   *
   * Awaits the completion of the transaction.
   * If any operation within the batch fails, the transaction will be rolled back automatically.
   *
   * After completion (either success or failure), the internal transaction reference is cleared.
   *
   * @throws {Error} If there is no active batch transaction.
   * @returns {Promise<void>} Resolves when the transaction has successfully committed.
   */
  async doneBatch(): Promise<void> {
    if (!this.#tx) {
      throw new Error(ErrorTexts.PrevBatchIsNotDone);
    }

    await this.#tx.done;
    this.#tx = null;
  }

  /**
   * Aborts the currently open batch transaction.
   *
   * All changes made during the batch will be discarded.
   *
   * @returns {void} Resolves when the transaction is aborted.
   */
  async revertBatch(): Promise<void> {
    try {
      if (!this.#tx) {
        return;
      }

      this.#tx.abort();
      await this.#tx.done;
    } catch (err) {
      if (err instanceof Object && 'name' in err && err.name !== ErrorTexts.AbortError) {
        throw err;
      }
    } finally {
      this.#tx = null;
    }
  }

  async clearDatabase(): Promise<void> {
    const tx = this.db.transaction(this.tables, 'readwrite');

    try {
      for (const table of this.tables) {
        if (this.db.objectStoreNames.contains(table)) {
          tx.objectStore(table).clear();
        }
      }
      await tx.done;
    } catch (err: unknown) {
      tx.abort();

      throw err;
    }
  }

  close(): void {
    if (this.#db) {
      this.#db.close();
    }
  }
}

export const databaseService = new DatabaseService(DatabaseName, Object.values(Tables), 1);
