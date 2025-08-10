import { IDBPDatabase, IDBPTransaction, openDB } from 'idb';
import {
  DatabaseResultOperation,
  DatabaseResultOperationError,
  DatabaseResultOperationSuccess
} from '../../shared/models/database-result-operation.model';
import { ErrorDataBaseConnection, ErrorTexts } from './constants/database.constants';
import { getErrorMessage } from './utils/get-error-message.util';
import { RecordModel } from '../../shared/models/record.model';
import { DefaultTableColumns } from '../../shared/models/default-table-columns.model';
import { isEmpty } from '../../shared/utils/is-empty.util';

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

  constructor(private databaseName: string, private tables: string[], private version: number) {
    if (!global.indexedDB) {
      return;
    }
  }

  get db() {
    return this.#db;
  }

  static initDB(databaseName: string, tables: string[], version: number): Promise<DatabaseService> {
    const instance = new this(databaseName, tables, version);

    return instance.connect()
      .then(() => {
        console.log('DB connection created');

        return instance;
      })
      .catch(() => {
        throw ErrorDataBaseConnection;
      });
  }

  async getItemById<T extends DefaultTableColumns>(tableName: string, id: number, includeSoftDeleted: boolean): Promise<DatabaseResultOperationSuccess<T | null>> {
    try {
      const store = this.#tx?.objectStore(tableName);
      const getFn = store ? store.get.bind(store) : this.#db.get.bind(this.#db, tableName);

      const item = await getFn(id) ?? null;
      if (!includeSoftDeleted && item && item.softDeleted) {
        return { status: 200, data: null } satisfies DatabaseResultOperationSuccess<null>;
      }
      return { status: 200, data: item as T } satisfies DatabaseResultOperation<T | null>;
    } catch ( error: unknown ) {
      throw { status: 500, message: getErrorMessage(error) } satisfies DatabaseResultOperationError;
    }
  }

  async getItems<T extends DefaultTableColumns>(
    tableName: string,
    start: number,
    end: number,
    includeSoftDeleted: boolean
  ): Promise<DatabaseResultOperationSuccess<T[]>> {
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

      return { status: 200, data: results } satisfies DatabaseResultOperation<T[]>;
    } catch ( error: unknown ) {
      tx.abort();

      throw { status: 500, message: getErrorMessage(error) } satisfies DatabaseResultOperationError;
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
   * @returns {Promise<DatabaseResultOperationSuccess<T | null>>}
   *          A promise resolving with the found item or null if none found.
   *
   * @throws {DatabaseResultOperationError} Throws if an error occurs during the transaction.
   *
   * @example
   * ```ts
   * // Get the next item after id 5, excluding soft deleted items
   * const result = await getPrevOrNextItem(true, 'users', 5, false);
   * if(result.data) {
   *   console.log('Next item:', result.data);
   * } else {
   *   console.log('No next item found');
   * }
   * ```
   */
  async getPrevOrNextItem<T extends DefaultTableColumns>(
    next: boolean,
    tableName: string,
    id: number,
    includeSoftDeleted: boolean
  ): Promise<DatabaseResultOperationSuccess<T | null>> {
    const tx = this.#db.transaction(tableName, 'readonly');
    const store = tx.objectStore(tableName);

    try {
      let cursor = await store.openCursor(
        next
          ? IDBKeyRange.lowerBound(id)
          : IDBKeyRange.upperBound(id),
        next ? 'next' : 'prev'
      );

      if (cursor && cursor.key === id) {
        cursor = await cursor.continue();
      }

      while (cursor) {
        if (includeSoftDeleted || cursor.value?.softDeleted === 0) {
          await tx.done;
          return {
            status: 200,
            data: cursor.value ?? null
          } satisfies DatabaseResultOperationSuccess<T | null>;
        }
        cursor = await cursor.continue();
      }

      await tx.done;
      return {
        status: 200,
        data: null
      } satisfies DatabaseResultOperationSuccess<null>;

    } catch ( error: unknown ) {
      tx.abort();
      throw {
        status: 500,
        message: getErrorMessage(error)
      } satisfies DatabaseResultOperationError;
    }
  }


  async getFirstElement<T extends DefaultTableColumns>(tableName: string, includeSoftDeleted: boolean): Promise<DatabaseResultOperationSuccess<T | null>> {
    const tx = this.#db.transaction(tableName, 'readonly');
    const store = tx.objectStore(tableName);

    let cursor = await store.openCursor();

    while (!includeSoftDeleted && cursor?.value.softDeleted === 1) {
      cursor = await cursor.continue();
    }

    await tx.done;

    return { status: 200, data: cursor?.value ?? null } satisfies DatabaseResultOperationSuccess<T | null>;
  }

  async updateOrCreateItem(tableName: string, data: RecordModel): Promise<DatabaseResultOperationSuccess<number>> {
    if (typeof data !== 'object' || isEmpty(data)) {
      throw { status: 400, message: ErrorTexts.IncorrectTypeData } satisfies DatabaseResultOperationError;
    }

    if (data.softDeleted !== 0 && data.softDeleted !== 1) {
      data.softDeleted = 0;
    }

    if (typeof data.id !== 'number') {
      throw { status: 400, message: ErrorTexts.IncorrectIdProvided } satisfies DatabaseResultOperationError;
    }

    const store = this.#tx?.objectStore(tableName);

    // eslint-disable-next-line
    const putFn = store ? (store.put as any).bind(store) : this.#db.put.bind(this.#db, tableName);

    return putFn(data)
      .then((id: number) => ({ status: 200, data: id as number }) satisfies DatabaseResultOperation<number>)
      .catch((error: unknown) => {
        throw { status: 500, message: getErrorMessage(error) } satisfies DatabaseResultOperationError;
      });
  }

  async deleteItem(
    tableName: string,
    id: number,
    softDelete: boolean,
  ): Promise<DatabaseResultOperationSuccess<true>> {

    const store = this.#tx?.objectStore(tableName);
    const getFn = store ? store.get.bind(store) : this.#db.get.bind(this.#db, tableName);

    const item = await getFn(id);

    if (!item) {
      throw {
        status: 400,
        message: ErrorTexts.RecordDoesNotExist
      } satisfies DatabaseResultOperationError;
    }

    if (softDelete) {
      item.softDeleted = 1;

      const store = this.#tx?.objectStore(tableName);

      // eslint-disable-next-line
      const putFn = store ? (store.put as any).bind(store) : this.#db.put.bind(this.#db, tableName);

      return putFn(item)
        .then(() => ({ status: 200, data: true }) satisfies DatabaseResultOperation<true>)
        .catch((error: unknown) => {
          throw {
            status: 500,
            message: getErrorMessage(error)
          } satisfies DatabaseResultOperationError;
        });
    } else {
      const store = this.#tx?.objectStore(tableName);

      // eslint-disable-next-line
      const deleteFn = store ? (store.delete as any).bind(store) : this.#db.delete.bind(this.#db, tableName);

      return deleteFn(id)
        .then(() => ({ status: 200, data: true }) satisfies DatabaseResultOperation<true>)
        .catch((error: unknown) => {
          throw {
            status: 500,
            message: getErrorMessage(error)
          } satisfies DatabaseResultOperationError;
        });
    }
  }

  async getTotalCount(tableName: string, includeSoftDeleted: boolean): Promise<DatabaseResultOperationSuccess<number>> {

    const store = this.#db.transaction(tableName, 'readonly').objectStore(tableName);

    try {
      if (includeSoftDeleted) {
        return await store.count().then((count) => ({
          status: 200,
          data: count
        }) satisfies DatabaseResultOperation<number>);
      } else {
        const index = store.index('softDeleted');

        return await index.count(IDBKeyRange.only(0)).then((count) => ({
          status: 200,
          data: count
        }) satisfies DatabaseResultOperation<number>);
      }
    } catch ( error: unknown ) {
      throw { status: 500, message: getErrorMessage(error) } satisfies DatabaseResultOperationError;
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
   * Opens a single transaction in 'readwrite' mode that includes all specified
   * object stores. All operations performed within this transaction will be atomic:
   * either all succeed, or all fail together.
   *
   * Throws an error if a batch transaction is already active to avoid overlapping transactions.
   *
   * Use {@link doneBatch} to commit the transaction or {@link revertBatch} to abort it.
   *
   * @param {string | string[]} tableNames - The name or an array of names of object stores
   *                                        to be included in the transaction.
   * @throws {Error} If there is already an active batch transaction.
   * @returns {void}
   *
   * @example
   * ```ts
   * db.runBatch(['users', 'orders']);
   * const usersStore = db.#tx.objectStore('users');
   * await usersStore.put({ id: 1, name: 'Alice' });
   * const ordersStore = db.#tx.objectStore('orders');
   * await ordersStore.put({ id: 10, userId: 1, total: 99.99 });
   * await db.doneBatch(); // commits changes atomically
   * ```
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
  revertBatch(): void {
    try {
      if (!this.#tx) {
        return;
      }

      this.#tx.abort();
      this.#tx = null;
    } catch {
      return;

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
    } catch ( err: unknown ) {
      tx.abort();

      throw err;
    }

  }
}
