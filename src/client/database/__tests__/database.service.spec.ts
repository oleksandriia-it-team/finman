import 'fake-indexeddb/auto';
import { indexedDB } from 'fake-indexeddb';

import { DatabaseLocalService } from '../database.local.service';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { type RecordModel } from '@common/models/record.model';
import { type DefaultTableColumns } from '@common/models/default-table-columns.model';
import { ErrorTexts } from '@common/constants/error-texts.contant';

interface UnitTestUser extends RecordModel {
  id: number;
  name: string;
  email: string;
  age: number;
  softDeleted?: 0 | 1;
}

interface UnitTestWithDelete {
  softDeleted: boolean;
  getSoftDeleted: boolean;
}

interface UnitTestWithCursor {
  id: number;
  expectedId: number;
  expectedNull: boolean;
  next: boolean;
  deleteUserId?: number;
}

type UnitTestWithCursorWithDelete = UnitTestWithDelete &
  UnitTestWithCursor & {
    deleteUserId: number;
  };

const dbName = 'UNIT_TESTS';
const tables = ['users'];

const testsWithDelete: UnitTestWithDelete[] = [
  { softDeleted: false, getSoftDeleted: false },
  { softDeleted: true, getSoftDeleted: false },
  { softDeleted: false, getSoftDeleted: true },
  { softDeleted: true, getSoftDeleted: true },
];

const testsWithCursor: UnitTestWithCursor[] = [
  { id: 1, expectedId: 2, expectedNull: false, next: true },
  { id: 5, expectedId: 5, expectedNull: true, next: true },
  { id: 4, expectedId: 3, expectedNull: false, next: false },
  { id: 1, expectedId: 0, expectedNull: true, next: false },
  { id: 1, expectedId: 2, expectedNull: false, next: true },
  { id: 4, expectedId: 5, expectedNull: false, next: true },
];

const testsWithCursorAndDelete: UnitTestWithCursorWithDelete[] = [
  { id: 4, expectedId: 5, deleteUserId: 5, expectedNull: false, softDeleted: true, getSoftDeleted: true, next: true },
  { id: 4, expectedId: 5, deleteUserId: 5, expectedNull: true, softDeleted: true, getSoftDeleted: false, next: true },
  { id: 1, expectedId: 3, deleteUserId: 2, expectedNull: false, softDeleted: true, getSoftDeleted: false, next: true },
];

const fiveUsers: UnitTestUser[] = [
  { id: 1, name: 'Dmytro', email: 'test1@email.com', age: 18 },
  { id: 2, name: 'Anna', email: 'anna@email.com', age: 22 },
  { id: 3, name: 'Ivan', email: 'ivan@email.com', age: 30 },
  { id: 4, name: 'Olena', email: 'olena@email.com', age: 27 },
  { id: 5, name: 'Serhii', email: 'serhii@email.com', age: 35 },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function seedUsers(db: DatabaseLocalService, users: UnitTestUser[]) {
  await Promise.all(users.map((u) => db.updateOrCreateItem('users', u)));
}

// ---------------------------------------------------------------------------
// Suite
// ---------------------------------------------------------------------------

describe('DatabaseService', () => {
  let databaseService: DatabaseLocalService;

  beforeEach(async () => {
    databaseService = await DatabaseLocalService.initDB(dbName, tables, 1);
  });

  afterEach(async () => {
    await databaseService.clearDatabase();
    databaseService.close();
    indexedDB.deleteDatabase(dbName);
  });

  // -------------------------------------------------------------------------
  // updateOrCreateItem
  // -------------------------------------------------------------------------

  it('should create a user with id = 1, name = Dmytro, email = test@gmail.com, age = 18', async () => {
    const result = await databaseService.updateOrCreateItem('users', {
      id: 1,
      name: 'Dmytro',
      age: 18,
      email: 'test@gmail.com',
    } satisfies UnitTestUser);

    expect(result).toBe(1);
  });

  it("should throw error when trying to add user with typeof id !== 'number'", async () => {
    try {
      await databaseService.updateOrCreateItem('users', { id: 'aadefrer', user: 'Dmytro' });
    } catch (err: unknown) {
      expect((err as Error).message).toBe(ErrorTexts.IncorrectIdProvided);
    }
  });

  it('should throw error when trying to add data that is not an object', async () => {
    try {
      await databaseService.updateOrCreateItem('users', 'asfhytt' as never);
    } catch (err: unknown) {
      expect((err as Error).message).toBe(ErrorTexts.IncorrectTypeData);
    }
  });

  // -------------------------------------------------------------------------
  // getItemById
  // -------------------------------------------------------------------------

  it('should return null when requesting a user by a non-existing id', async () => {
    await databaseService.updateOrCreateItem('users', {
      id: 1,
      name: 'Dmytro',
      age: 18,
      email: 'test@gmail.com',
    } satisfies UnitTestUser);

    const result = await databaseService.getItemById('users', 2, false);

    expect(result).toBe(null);
  });

  testsWithDelete.forEach((test) => {
    it(
      `should soft/hard delete user with id=1 (softDeleted=${test.softDeleted}) ` +
        `and verify retrieval based on includeSoftDeleted=${test.getSoftDeleted}`,
      async () => {
        const user: UnitTestUser = { id: 1, name: 'Dmytro', age: 18, email: 'test@gmail.com' };

        await databaseService.updateOrCreateItem('users', user);
        await databaseService.deleteItem('users', 1, test.softDeleted);

        const result = await databaseService.getItemById('users', 1, test.getSoftDeleted);

        if (test.softDeleted && test.getSoftDeleted) {
          expect(JSON.stringify(result)).toBe(JSON.stringify({ ...user, softDeleted: Number(test.softDeleted) }));
        } else {
          expect(result).toBe(null);
        }
      },
    );
  });

  // -------------------------------------------------------------------------
  // getTotalCount
  // -------------------------------------------------------------------------

  it('should create 5 users and verify total count equals 5', async () => {
    await seedUsers(databaseService, fiveUsers);

    const result = await databaseService.getTotalCount('users', false);

    expect(result).toBe(5);
  });

  testsWithDelete.forEach((test) => {
    it(
      `should create 5 users, delete one with softDeleted=${test.softDeleted}, ` +
        `and check total count with includeSoftDeleted=${test.getSoftDeleted}`,
      async () => {
        await seedUsers(databaseService, fiveUsers);
        await databaseService.deleteItem('users', 1, test.softDeleted);

        const result = await databaseService.getTotalCount('users', test.getSoftDeleted);

        expect(result).toBe(test.getSoftDeleted && test.softDeleted ? 5 : 4);
      },
    );
  });

  // -------------------------------------------------------------------------
  // getItems
  // -------------------------------------------------------------------------

  it('should create 25 users and retrieve users with indexes from 5 to 11', async () => {
    const allUsers: UnitTestUser[] = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User${i + 1}`,
      email: `user${i + 1}@example.com`,
      age: 18 + (i % 10),
    }));

    await seedUsers(databaseService, allUsers);

    const result = await databaseService.getItems('users', 5, 11, false);

    expect(JSON.stringify(result)).toBe(JSON.stringify(allUsers.slice(5, 12)));
  });

  testsWithDelete.forEach((test) => {
    it(
      `should create 25 users, delete users 1-3 with softDeleted=${test.softDeleted}, ` +
        `and retrieve users 1-5 ${test.getSoftDeleted ? 'including' : 'excluding'} softDeleted ` +
        `(expected ids: ${test.softDeleted && test.getSoftDeleted ? '1-5' : '4-8'})`,
      async () => {
        const allUsers: UnitTestUser[] = Array.from({ length: 25 }, (_, i) => ({
          id: i + 1,
          name: `User${i + 1}`,
          email: `user${i + 1}@example.com`,
          age: 18 + (i % 10),
          softDeleted: 0,
        }));

        const deletedUsers = allUsers.slice(0, 3);

        await seedUsers(databaseService, allUsers);
        await Promise.all(deletedUsers.map((u) => databaseService.deleteItem('users', u.id, test.softDeleted)));

        if (test.softDeleted) {
          deletedUsers.forEach((u) => {
            u.softDeleted = 1;
          });
        }

        const result = await databaseService.getItems('users', 0, 4, test.getSoftDeleted);

        if (test.softDeleted && test.getSoftDeleted) {
          expect(JSON.stringify(result)).toBe(JSON.stringify(allUsers.slice(0, 5)));
        } else {
          expect(JSON.stringify(result)).toBe(JSON.stringify(allUsers.slice(3, 8)));
        }
      },
    );
  });

  // -------------------------------------------------------------------------
  // runBatch  —  callback-based API
  // -------------------------------------------------------------------------

  it('should successfully commit all inserts within a batch transaction', async () => {
    const allUsers: UnitTestUser[] = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User${i + 1}`,
      email: `user${i + 1}@example.com`,
      age: 18 + (i % 10),
      softDeleted: 0,
    }));

    // New API: pass all work as a callback; Dexie commits automatically on resolve
    await databaseService.runBatch('users', async () => {
      await Promise.all(allUsers.map((u) => databaseService.updateOrCreateItem('users', u)));
    });

    const result = await databaseService.getItems('users', 0, 24, false);

    expect(JSON.stringify(result)).toBe(JSON.stringify(allUsers));
  });

  it('should abort batch transaction and revert inserts when invalid data is provided', async () => {
    // Dexie rolls back automatically when the callback throws
    try {
      await databaseService.runBatch('users', async () => {
        const allUsers: UnitTestUser[] = Array.from({ length: 25 }, (_, i) => ({
          id: i + 1,
          name: `User${i + 1}`,
          email: `user${i + 1}@example.com`,
          age: 18 + (i % 10),
        }));

        // Inject invalid entry to trigger an error mid-transaction
        (allUsers as unknown[]).push('45666aa');

        await Promise.all(allUsers.map((u) => databaseService.updateOrCreateItem('users', u)));
      });
    } catch {
      // Transaction was rolled back by Dexie — table must be empty
      const result = await databaseService.getTotalCount('users', false);

      expect(result).toBe(0);
    }
  });

  // -------------------------------------------------------------------------
  // clearDatabase
  // -------------------------------------------------------------------------

  it('should insert multiple users into db and clear all data successfully', async () => {
    await seedUsers(databaseService, fiveUsers);

    const totalCount = await databaseService.getTotalCount('users', false);

    expect(totalCount).toBe(5);

    await databaseService.clearDatabase();

    const newTotalCount = await databaseService.getTotalCount('users', false);

    expect(newTotalCount).toBe(0);
  });

  // -------------------------------------------------------------------------
  // getPrevOrNextItem
  // -------------------------------------------------------------------------

  testsWithCursor.forEach((test) => {
    it(
      `should retrieve the ${test.next ? 'next' : 'previous'} user ` +
        `${test.expectedNull ? 'as null' : `with id = ${test.expectedId}`} starting from id = ${test.id}`,
      async () => {
        await seedUsers(databaseService, fiveUsers);

        const result = await databaseService.getPrevOrNextItem<UnitTestUser & DefaultTableColumns>(
          test.next,
          'users',
          test.id,
          false,
        );

        expect(result?.id ?? null).toBe(test.expectedNull ? null : test.expectedId);
      },
    );
  });

  testsWithCursorAndDelete.forEach((test) => {
    it(
      `should retrieve the ${test.next ? 'next' : 'previous'} user ` +
        `${test.getSoftDeleted ? 'including' : 'excluding'} softDeleted users, ` +
        `expected ${test.expectedNull ? 'null' : `id = ${test.expectedId}`}, ` +
        `starting from id = ${test.id} after deleting user ${test.deleteUserId} with softDeleted=${test.softDeleted}`,
      async () => {
        await seedUsers(databaseService, fiveUsers);
        await databaseService.deleteItem('users', test.deleteUserId, test.softDeleted);

        const result = await databaseService.getPrevOrNextItem<UnitTestUser & DefaultTableColumns>(
          test.next,
          'users',
          test.id,
          test.getSoftDeleted,
        );

        expect(result?.id ?? null).toBe(test.expectedNull ? null : test.expectedId);
      },
    );
  });

  // -------------------------------------------------------------------------
  // getFirstElement
  // -------------------------------------------------------------------------

  testsWithDelete.forEach((test) => {
    it(
      `should get the first user ${test.getSoftDeleted ? 'including' : 'excluding'} softDeleted ` +
        `after deleting two users ${test.softDeleted ? 'with' : 'without'} soft delete`,
      async () => {
        await seedUsers(databaseService, fiveUsers);
        await databaseService.deleteItem('users', 1, test.softDeleted);
        await databaseService.deleteItem('users', 2, test.softDeleted);

        const firstUser = await databaseService.getFirstElement<UnitTestUser & DefaultTableColumns>(
          'users',
          test.getSoftDeleted,
        );

        if (test.softDeleted && test.getSoftDeleted) {
          expect(firstUser?.id).toBe(1);
        } else {
          expect(firstUser?.id).toBe(3);
        }
      },
    );
  });

  it('should return null when fetching first user from an empty users table', async () => {
    const firstUser = await databaseService.getFirstElement('users', false);

    expect(firstUser).toBe(null);
  });

  it('should return null when fetching first user excluding softDeleted after soft deleting the only user', async () => {
    await databaseService.updateOrCreateItem('users', {
      id: 1,
      name: 'Dmytro',
      age: 18,
      email: 'test@gmail.com',
    } satisfies UnitTestUser);

    await databaseService.deleteItem('users', 1, true);

    const firstUser = await databaseService.getFirstElement('users', false);

    expect(firstUser).toBe(null);
  });

  it('should return softDeleted user as first element when including softDeleted after soft deleting the only user', async () => {
    await databaseService.updateOrCreateItem('users', {
      id: 1,
      name: 'Dmytro',
      age: 18,
      email: 'test@gmail.com',
    } satisfies UnitTestUser);

    await databaseService.deleteItem('users', 1, true);

    const firstUser = await databaseService.getFirstElement<UnitTestUser & DefaultTableColumns>('users', true);

    expect(firstUser?.id).toBe(1);
  });
});
