import 'fake-indexeddb/auto';
import { indexedDB } from 'fake-indexeddb';

import { DatabaseLocalService } from '../database.local.service';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { type RecordModel } from '@common/models/record.model';
import { type DefaultTableColumns } from '@common/models/default-table-columns.model';
import { ErrorTexts } from '@common/constants/error-texts.contant';
import type { FilterPredicate } from '@frontend/shared/models/local-filter.model';

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
  let databaseLocalService: DatabaseLocalService;

  beforeEach(async () => {
    databaseLocalService = await DatabaseLocalService.initDB(dbName, tables, 1);
  });

  afterEach(async () => {
    await databaseLocalService.clearDatabase();
    databaseLocalService.close();
    indexedDB.deleteDatabase(dbName);
  });

  // -------------------------------------------------------------------------
  // updateOrCreateItem
  // -------------------------------------------------------------------------

  it('should create a user with id = 1, name = Dmytro, email = test@gmail.com, age = 18', async () => {
    const result = await databaseLocalService.updateOrCreateItem('users', {
      id: 1,
      name: 'Dmytro',
      age: 18,
      email: 'test@gmail.com',
    } satisfies UnitTestUser);

    expect(result).toBe(1);
  });

  it("should throw error when trying to add user with typeof id !== 'number'", async () => {
    try {
      await databaseLocalService.updateOrCreateItem('users', { id: 'aadefrer', user: 'Dmytro' });
    } catch (err: unknown) {
      expect((err as Error).message).toBe(ErrorTexts.IncorrectIdProvided);
    }
  });

  it('should throw error when trying to add data that is not an object', async () => {
    try {
      await databaseLocalService.updateOrCreateItem('users', 'asfhytt' as never);
    } catch (err: unknown) {
      expect((err as Error).message).toBe(ErrorTexts.IncorrectTypeData);
    }
  });

  // -------------------------------------------------------------------------
  // getItemById
  // -------------------------------------------------------------------------

  it('should return null when requesting a user by a non-existing id', async () => {
    await databaseLocalService.updateOrCreateItem('users', {
      id: 1,
      name: 'Dmytro',
      age: 18,
      email: 'test@gmail.com',
    } satisfies UnitTestUser);

    const result = await databaseLocalService.getItemById('users', 2, false);

    expect(result).toBe(null);
  });

  testsWithDelete.forEach((test) => {
    it(
      `should soft/hard delete user with id=1 (softDeleted=${test.softDeleted}) ` +
        `and verify retrieval based on includeSoftDeleted=${test.getSoftDeleted}`,
      async () => {
        const user: UnitTestUser = { id: 1, name: 'Dmytro', age: 18, email: 'test@gmail.com' };

        await databaseLocalService.updateOrCreateItem('users', user);
        await databaseLocalService.deleteItem('users', 1, test.softDeleted);

        const result = await databaseLocalService.getItemById('users', 1, test.getSoftDeleted);

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
    await seedUsers(databaseLocalService, fiveUsers);

    const result = await databaseLocalService.getTotalCount('users', false);

    expect(result).toBe(5);
  });

  testsWithDelete.forEach((test) => {
    it(
      `should create 5 users, delete one with softDeleted=${test.softDeleted}, ` +
        `and check total count with includeSoftDeleted=${test.getSoftDeleted}`,
      async () => {
        await seedUsers(databaseLocalService, fiveUsers);
        await databaseLocalService.deleteItem('users', 1, test.softDeleted);

        const result = await databaseLocalService.getTotalCount('users', test.getSoftDeleted);

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

    await seedUsers(databaseLocalService, allUsers);

    const result = await databaseLocalService.getItems('users', 5, 10, false);

    expect(JSON.stringify(result)).toBe(JSON.stringify(allUsers.slice(4, 10)));
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

        await seedUsers(databaseLocalService, allUsers);
        await Promise.all(deletedUsers.map((u) => databaseLocalService.deleteItem('users', u.id, test.softDeleted)));

        if (test.softDeleted) {
          deletedUsers.forEach((u) => {
            u.softDeleted = 1;
          });
        }

        const result = await databaseLocalService.getItems('users', 1, 5, test.getSoftDeleted);

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
    await databaseLocalService.runBatch('users', async () => {
      await Promise.all(allUsers.map((u) => databaseLocalService.updateOrCreateItem('users', u)));
    });

    const result = await databaseLocalService.getItems('users', 1, 26, false);

    expect(JSON.stringify(result)).toBe(JSON.stringify(allUsers));
  });

  it('should abort batch transaction and revert inserts when invalid data is provided', async () => {
    // Dexie rolls back automatically when the callback throws
    try {
      await databaseLocalService.runBatch('users', async () => {
        const allUsers: UnitTestUser[] = Array.from({ length: 25 }, (_, i) => ({
          id: i + 1,
          name: `User${i + 1}`,
          email: `user${i + 1}@example.com`,
          age: 18 + (i % 10),
        }));

        // Inject invalid entry to trigger an error mid-transaction
        (allUsers as unknown[]).push('45666aa');

        await Promise.all(allUsers.map((u) => databaseLocalService.updateOrCreateItem('users', u)));
      });
    } catch {
      // Transaction was rolled back by Dexie — table must be empty
      const result = await databaseLocalService.getTotalCount('users', false);

      expect(result).toBe(0);
    }
  });

  // -------------------------------------------------------------------------
  // clearDatabase
  // -------------------------------------------------------------------------

  it('should insert multiple users into db and clear all data successfully', async () => {
    await seedUsers(databaseLocalService, fiveUsers);

    const totalCount = await databaseLocalService.getTotalCount('users', false);

    expect(totalCount).toBe(5);

    await databaseLocalService.clearDatabase();

    const newTotalCount = await databaseLocalService.getTotalCount('users', false);

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
        await seedUsers(databaseLocalService, fiveUsers);

        const result = await databaseLocalService.getPrevOrNextItem<UnitTestUser & DefaultTableColumns>(
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
        await seedUsers(databaseLocalService, fiveUsers);
        await databaseLocalService.deleteItem('users', test.deleteUserId, test.softDeleted);

        const result = await databaseLocalService.getPrevOrNextItem<UnitTestUser & DefaultTableColumns>(
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
        await seedUsers(databaseLocalService, fiveUsers);
        await databaseLocalService.deleteItem('users', 1, test.softDeleted);
        await databaseLocalService.deleteItem('users', 2, test.softDeleted);

        const firstUser = await databaseLocalService.getFirstElement<UnitTestUser & DefaultTableColumns>(
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
    const firstUser = await databaseLocalService.getFirstElement('users', false);

    expect(firstUser).toBe(null);
  });

  it('should return null when fetching first user excluding softDeleted after soft deleting the only user', async () => {
    await databaseLocalService.updateOrCreateItem('users', {
      id: 1,
      name: 'Dmytro',
      age: 18,
      email: 'test@gmail.com',
    } satisfies UnitTestUser);

    await databaseLocalService.deleteItem('users', 1, true);

    const firstUser = await databaseLocalService.getFirstElement('users', false);

    expect(firstUser).toBe(null);
  });

  it('should return softDeleted user as first element when including softDeleted after soft deleting the only user', async () => {
    await databaseLocalService.updateOrCreateItem('users', {
      id: 1,
      name: 'Dmytro',
      age: 18,
      email: 'test@gmail.com',
    } satisfies UnitTestUser);

    await databaseLocalService.deleteItem('users', 1, true);

    const firstUser = await databaseLocalService.getFirstElement<UnitTestUser & DefaultTableColumns>('users', true);

    expect(firstUser?.id).toBe(1);
  });

  // -------------------------------------------------------------------------
  // Filtering (mapFilters logic)
  // -------------------------------------------------------------------------

  describe('Filtering with Predicates', () => {
    beforeEach(async () => {
      await seedUsers(databaseLocalService, fiveUsers);
    });

    it('should filter users by age > 25 using a single predicate', async () => {
      const ageFilter: FilterPredicate<UnitTestUser & DefaultTableColumns> = (item) => item.age > 25;

      const result = await databaseLocalService.getItems<UnitTestUser & DefaultTableColumns>('users', 0, 10, false, [
        ageFilter,
      ]);

      expect(result.length).toBe(3);
      expect(result.every((u) => u.age > 25)).toBe(true);
      expect(result.map((u) => u.name)).toContain('Ivan');
      expect(result.map((u) => u.name)).toContain('Serhii');
    });

    it('should filter users by multiple predicates (age > 25 AND name contains "n")', async () => {
      const ageFilter: FilterPredicate<UnitTestUser & DefaultTableColumns> = (item) => item.age > 25;
      const nameFilter: FilterPredicate<UnitTestUser & DefaultTableColumns> = (item) => item.name.includes('n');

      const result = await databaseLocalService.getItems<UnitTestUser & DefaultTableColumns>('users', 0, 10, false, [
        ageFilter,
        nameFilter,
      ]);

      expect(result.length).toBe(2);
      expect(result.map((u) => u.name)).toEqual(['Ivan', 'Olena']);
    });

    it('should return correct totalCount with applied filters', async () => {
      const ageFilter: FilterPredicate<UnitTestUser & DefaultTableColumns> = (item) => item.age < 25;

      const count = await databaseLocalService.getTotalCount<UnitTestUser & DefaultTableColumns>('users', false, [
        ageFilter,
      ]);

      expect(count).toBe(2);
    });

    it('should correctly combine pagination (limit/offset) with filters', async () => {
      const manyUsers: UnitTestUser[] = Array.from({ length: 10 }, (_, i) => ({
        id: i + 10,
        name: `FilterUser${i}`,
        email: `test${i}@test.com`,
        age: 40,
      }));
      await seedUsers(databaseLocalService, manyUsers);

      const ageFilter: FilterPredicate<UnitTestUser & DefaultTableColumns> = (item) => item.age === 40;

      const result = await databaseLocalService.getItems<UnitTestUser & DefaultTableColumns>('users', 4, 5, false, [
        ageFilter,
      ]);

      expect(result.length).toBe(2);
      expect(result[0].name).toBe('FilterUser3');
      expect(result[1].name).toBe('FilterUser4');
    });

    it('should handle filters combined with softDelete correctly', async () => {
      await databaseLocalService.deleteItem('users', 3, true);

      const ageFilter: FilterPredicate<UnitTestUser & DefaultTableColumns> = (item) => item.age > 25;

      const excluded = await databaseLocalService.getItems<UnitTestUser & DefaultTableColumns>('users', 0, 10, false, [
        ageFilter,
      ]);
      expect(excluded.length).toBe(2);
      expect(excluded.map((u) => u.id)).not.toContain(3);

      const included = await databaseLocalService.getItems<UnitTestUser & DefaultTableColumns>('users', 0, 10, true, [
        ageFilter,
      ]);
      expect(included.length).toBe(3);
      expect(included.map((u) => u.id)).toContain(3);
    });

    it('should return empty array if no records match filters', async () => {
      const impossibleFilter: FilterPredicate<UnitTestUser & DefaultTableColumns> = (item) => item.age > 100;

      const result = await databaseLocalService.getItems('users', 0, 10, false, [impossibleFilter]);
      const count = await databaseLocalService.getTotalCount('users', false, [impossibleFilter]);

      expect(result).toEqual([]);
      expect(count).toBe(0);
    });
  });
});
