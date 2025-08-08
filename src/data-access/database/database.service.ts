import { IDBPDatabase, openDB } from 'idb';
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

    return instance.connect(tables, databaseName, version)
      .then(() => {
        console.log('DB connection created');

        return instance;
      })
      .catch(() => {
        throw ErrorDataBaseConnection;
      });
  }

  async getItemById<T>(tableName: string, id: number, includeDeleted: boolean): Promise<DatabaseResultOperationSuccess<T | null>> {
    try {
      const item = await this.#db.get(tableName, id);
      if (!includeDeleted && item && item.softDeleted) {
        return null;
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
        const range = IDBKeyRange.only(false);
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

  async updateOrCreateItem(tableName: string, data: Record<string, unknown>): Promise<DatabaseResultOperationSuccess<number>> {
    if (!('softDeleted' in data)) {
      data.softDeleted = false;
    }

    return this.#db
      .put(tableName, data)
      .then((id) => ({ status: 200, data: id as number }) satisfies DatabaseResultOperation<number>)
      .catch((error) => {
        throw { status: 500, message: getErrorMessage(error) } satisfies DatabaseResultOperationError;
      });
  }

  async deleteItem(
    tableName: string,
    id: number,
    softDelete: boolean
  ): Promise<DatabaseResultOperationSuccess<true>> {
    const item = await this.#db.get(tableName, id);

    if (!item) {
      throw {
        status: 400,
        message: ErrorTexts.RecordDoesNotExist
      } satisfies DatabaseResultOperationError;
    }

    if (softDelete) {
      item.softDeleted = true;
      return this.#db
        .put(tableName, item)
        .then(() => ({ status: 200, data: true }) satisfies DatabaseResultOperation<true>)
        .catch((error) => {
          throw {
            status: 500,
            message: getErrorMessage(error)
          } satisfies DatabaseResultOperationError;
        });
    } else {
      return this.#db
        .delete(tableName, id)
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
        return store.count().then((count) => ({ status: 200, data: count }) satisfies DatabaseResultOperation<number>);
      } else {
        const index = store.index('softDeleted');
        return index.count(IDBKeyRange.only(false)).then((count) => ({
          status: 200,
          data: count
        }) satisfies DatabaseResultOperation<number>);
      }
    } catch ( error: unknown ) {
      throw { status: 500, message: getErrorMessage(error) } satisfies DatabaseResultOperationError;
    }
  }

  async connect(tables: string[], databaseName: string, version: number) {
    this.#db = await openDB(databaseName, version, {
      upgrade: (db) => {
        tables.forEach((table) => {
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
}
