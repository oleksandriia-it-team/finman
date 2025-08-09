import { IDBPDatabase, IDBPTransaction, openDB } from 'idb';
import {
  DatabaseResultOperation,
  DatabaseResultOperationError,
  DatabaseResultOperationSuccess
} from '../../shared/models/database-result-operation.model';
import { ErrorDataBaseConnection, ErrorTexts } from './constants/database.constants';
import { getErrorMessage } from './utils/get-error-message.util';

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
  #db: IDBPDatabase<unknown>;

  constructor(private databaseName: string, private tables: string[], private version: number) {
    if (!global.indexedDB) {
      return;
    }
  }

  get db() {
    return this.#db;
  }

  static initDB(databaseName: string, tables: string[], version: number) {
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

  async getItemById<T>(tableName: string, id: number, includeDeleted: boolean, tx?: IDBPTransaction): Promise<DatabaseResultOperationSuccess<T | null>> {
    try {
      const getFn = tx?.objectStore(tableName).get.bind(tx) ?? this.#db.get.bind(this.#db, tableName);

      const item = await getFn(id) ?? null;
      if (!includeDeleted && item && item.softDeleted) {
        return { status: 200, data: null } satisfies DatabaseResultOperationSuccess<null>;
      }
      return { status: 200, data: item as T } satisfies DatabaseResultOperation<T | null>;
    } catch ( error: unknown ) {
      throw { status: 500, message: getErrorMessage(error) } satisfies DatabaseResultOperationError;
    }
  }

  async getItems<T>(
    tableName: string,
    first: number,
    last: number,
    includeDeleted: boolean
  ): Promise<DatabaseResultOperationSuccess<T[]>> {
    try {
      const tx = this.#db.transaction(tableName);
      const store = tx.objectStore(tableName);

      const results: T[] = [];

      if (includeDeleted) {
        const range = IDBKeyRange.bound(first, last);
        let cursor = await store.openCursor(range);
        while (cursor) {
          results.push(cursor.value);
          cursor = await cursor.continue();
        }
      } else {
        const index = store.index('softDeleted');
        const range = IDBKeyRange.only(0);
        let cursor = await index.openCursor(range);

        while (cursor) {
          const id = cursor.primaryKey as number;
          if (id >= first && id <= last) {
            results.push(cursor.value);
          }
          cursor = await cursor.continue();
        }
      }

      return { status: 200, data: results } satisfies DatabaseResultOperation<T[]>;
    } catch ( error: unknown ) {
      throw { status: 500, message: getErrorMessage(error) } satisfies DatabaseResultOperationError;
    }
  }

  async updateOrCreateItem(tableName: string, data: Record<string, unknown>, tx?: IDBPTransaction): Promise<DatabaseResultOperationSuccess<number>> {
    if (data.softDeleted !== 0 && data.softDeleted !== 1) {
      data.softDeleted = 0;
    }

    const putFn = (tx?.objectStore(tableName).put as any)?.bind(tx) ?? this.#db.put.bind(this.#db, tableName);

    return putFn(data)
      .then((id) => ({ status: 200, data: id as number }) satisfies DatabaseResultOperation<number>)
      .catch((error) => {
        throw { status: 500, message: getErrorMessage(error) } satisfies DatabaseResultOperationError;
      });
  }

  async deleteItem(
    tableName: string,
    id: number,
    softDelete: boolean,
    tx?: IDBPTransaction
  ): Promise<DatabaseResultOperationSuccess<true>> {

    const getFn = tx?.objectStore(tableName).get.bind(tx) ?? this.#db.get.bind(this.#db, tableName);

    const item = await getFn(id);

    if (!item) {
      throw {
        status: 400,
        message: ErrorTexts.RecordDoesNotExist
      } satisfies DatabaseResultOperationError;
    }

    if (softDelete) {
      item.softDeleted = 1;

      const putFn = (tx?.objectStore(tableName).put as any)?.bind(tx) ?? this.#db.put.bind(this.#db, tableName);

      return putFn(item)
        .then(() => ({ status: 200, data: true }) satisfies DatabaseResultOperation<true>)
        .catch((error) => {
          throw {
            status: 500,
            message: getErrorMessage(error)
          } satisfies DatabaseResultOperationError;
        });
    } else {
      const deleteFn = (tx?.objectStore(tableName).delete as any)?.bind(tx) ?? this.#db.delete.bind(this.#db, tableName);

      return deleteFn(id)
        .then(() => ({ status: 200, data: true }) satisfies DatabaseResultOperation<true>)
        .catch((error) => {
          throw {
            status: 500,
            message: getErrorMessage(error)
          } satisfies DatabaseResultOperationError;
        });
    }
  }

  async getTotalCount(tableName: string, includeDeleted: boolean): Promise<DatabaseResultOperationSuccess<number>> {

    const store = this.#db.transaction(tableName, 'readonly').objectStore(tableName);

    try {
      if (includeDeleted) {
        return await store.count().then((count) => ({ status: 200, data: count }) satisfies DatabaseResultOperation<number>);
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

  async connect() {
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

  async clearDatabase(): Promise<void> {
    const tx = this.db.transaction(this.tables, 'readwrite');

    for (const table of this.tables) {
      if (this.db.objectStoreNames.contains(table)) {
        tx.objectStore(table).clear();
      }
    }
    await tx.done;
  }
}
