import 'fake-indexeddb/auto';
import { indexedDB } from 'fake-indexeddb';

import { DatabaseService } from '../database.service';
import { beforeEach, describe, expect, it } from 'vitest';
import { RecordModel } from '../../../shared/models/record.model';
import { DefaultTableColumns } from '../../../shared/models/default-table-columns.model';
import { DatabaseResultOperationError } from '../../../shared/models/database-result-operation.model';
import { ErrorTexts } from '../constants/database.constants';

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

type UnitTestWithCursorWithDelete = UnitTestWithDelete & UnitTestWithCursor & {
  deleteUserId: number;
};

const dbName = 'UNIT_TESTS';
const tables = [ 'users' ];

const testsWithDelete: UnitTestWithDelete[] = [
  {
    softDeleted: false,
    getSoftDeleted: false,
  },
  {
    softDeleted: true,
    getSoftDeleted: false,
  },
  {
    softDeleted: false,
    getSoftDeleted: true,
  },
  {
    softDeleted: true,
    getSoftDeleted: true,
  }
];

const testsWithCursor: UnitTestWithCursor[] = [
  {
    id: 1,
    expectedId: 2,
    expectedNull: false,
    next: true,
  },
  {
    id: 5,
    expectedId: 5,
    expectedNull: true,
    next: true,
  },
  {
    id: 4,
    expectedId: 3,
    expectedNull: false,
    next: false
  },
  {
    id: 1,
    expectedId: 0,
    expectedNull: true,
    next: false
  },
  {
    id: 1,
    expectedId: 2,
    expectedNull: false,
    next: true,
  },
  {
    id: 4,
    expectedId: 5,
    expectedNull: false,
    next: true,
  }
];

const testsWithCursorAndDelete: UnitTestWithCursorWithDelete[] = [
  {
    id: 4,
    expectedId: 5,
    deleteUserId: 5,
    expectedNull: false,
    softDeleted: true,
    getSoftDeleted: true,
    next: true
  },
  {
    id: 4,
    expectedId: 5,
    deleteUserId: 5,
    expectedNull: true,
    softDeleted: true,
    getSoftDeleted: false,
    next: true
  },
  {
    id: 1,
    expectedId: 3,
    deleteUserId: 2,
    expectedNull: false,
    softDeleted: true,
    getSoftDeleted: false,
    next: true
  }
];

const fiveUsers: UnitTestUser[] = [
  {
    id: 1,
    name: 'Dmytro',
    email: 'test1@email.com',
    age: 18
  },
  {
    id: 2,
    name: 'Anna',
    email: 'anna@email.com',
    age: 22
  },
  {
    id: 3,
    name: 'Ivan',
    email: 'ivan@email.com',
    age: 30
  },
  {
    id: 4,
    name: 'Olena',
    email: 'olena@email.com',
    age: 27
  },
  {
    id: 5,
    name: 'Serhii',
    email: 'serhii@email.com',
    age: 35
  }
];

describe('DatabaseService', () => {

  beforeEach(async () => {
    const databaseService = await DatabaseService.initDB(dbName, tables, 1);

    await databaseService.clearDatabase();

    indexedDB.deleteDatabase(dbName);
  });

  it('should create a user with id = 1, name = Dmytro, email = test@gmail.com, age = 18', async () => {
    const databaseService = await DatabaseService.initDB(dbName, tables, 1);

    const result = await databaseService.updateOrCreateItem('users', {
      id: 1,
      name: 'Dmytro',
      age: 18,
      email: 'test@gmail.com'
    } satisfies UnitTestUser);

    expect(result.data).toBe(1);
  });

  it('should return null when requesting a user by a non-existing id', async () => {

    const databaseService = await DatabaseService.initDB(dbName, tables, 1);

    await databaseService.updateOrCreateItem('users', {
      id: 1,
      name: 'Dmytro',
      age: 18,
      email: 'test@gmail.com'
    } satisfies UnitTestUser);

    const result = await databaseService.getItemById('users', 2, false);

    expect(result.data).toBe(null);
  });

  testsWithDelete.forEach((test) => {
    it(`should soft/hard delete user with id=1 (softDeleted=${ test.softDeleted }) and verify retrieval based on includeSoftDeleted=${ test.getSoftDeleted }`, async () => {
      const databaseService = await DatabaseService.initDB(dbName, tables, 1);

      const user: UnitTestUser = {
        id: 1,
        name: 'Dmytro',
        age: 18,
        email: 'test@gmail.com'
      };

      await databaseService.updateOrCreateItem('users', user);

      await databaseService.deleteItem('users', 1, test.softDeleted);

      const result = await databaseService.getItemById('users', 1, test.getSoftDeleted);

      if (test.softDeleted && test.getSoftDeleted) {
        expect(JSON.stringify(result.data)).toBe(JSON.stringify({ ...user, softDeleted: Number(test.softDeleted) }));
      } else {
        expect(result.data).toBe(null);
      }
    });
  });

  it('should create 5 users and verify total count equals 5', async () => {
    const databaseService = await DatabaseService.initDB(dbName, tables, 1);

    await Promise.all(fiveUsers.map(user => databaseService.updateOrCreateItem('users', user)));

    const result = await databaseService.getTotalCount('users', false);

    expect(result.data).toBe(5);
  });

  testsWithDelete.forEach((test) => {
    it(`should create 5 users, delete one with softDeleted=${ test.softDeleted }, and check total count with includeSoftDeleted=${ test.getSoftDeleted }`, async () => {
      const databaseService = await DatabaseService.initDB(dbName, tables, 1);

      await Promise.all(fiveUsers.map(user => databaseService.updateOrCreateItem('users', user)));

      await databaseService.deleteItem('users', 1, test.softDeleted);

      const result = await databaseService.getTotalCount('users', test.getSoftDeleted);

      expect(result.data).toBe(test.getSoftDeleted && test.softDeleted ? 5 : 4);
    });
  });

  it('should create 25 users and retrieve users with indexes from 5 to 11', async () => {
    const allUsers: UnitTestUser[] = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User${ i + 1 }`,
      email: `user${ i + 1 }@example.com`,
      age: 18 + (i % 10),
    }));

    const selectedUsers = allUsers.slice(5, 12);

    const databaseService = await DatabaseService.initDB(dbName, tables, 1);

    await Promise.all(allUsers.map(user => databaseService.updateOrCreateItem('users', user)));

    const result = await databaseService.getItems('users', 5, 11, false);

    expect(JSON.stringify(result.data)).toBe(JSON.stringify(selectedUsers));
  });

  testsWithDelete.forEach((test) => {
    it(`should create 25 users, delete users 1, 2, 3 with softDeleted=${ test.softDeleted }, and retrieve users 1-5 ${ test.getSoftDeleted ? 'including' : 'excluding' } softDeleted (expected ids: ${ test.softDeleted && test.getSoftDeleted ? '1-5' : '4-8' })`, async () => {
      const allUsers: UnitTestUser[] = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `User${ i + 1 }`,
        email: `user${ i + 1 }@example.com`,
        age: 18 + (i % 10),
        softDeleted: 0
      }));

      const deletedUsers = allUsers.slice(0, 3);

      const databaseService = await DatabaseService.initDB(dbName, tables, 1);

      await Promise.all(allUsers.map(user => databaseService.updateOrCreateItem('users', user)));

      await Promise.all(deletedUsers.map(user => databaseService.deleteItem('users', user.id, test.softDeleted)));

      if (test.softDeleted) {
        deletedUsers.forEach(user => {
          user.softDeleted = 1;
        });
      }

      const result = await databaseService.getItems('users', 0, 4, test.getSoftDeleted);

      if (test.softDeleted && test.getSoftDeleted) {
        const checkUsers = allUsers.slice(0, 5);

        expect(JSON.stringify(result.data)).toBe(JSON.stringify(checkUsers));
      } else {
        const checkUsers = allUsers.slice(3, 8);

        expect(JSON.stringify(result.data)).toBe(JSON.stringify(checkUsers));
      }
    });
  });


  it('should successfully commit all inserts within a batch transaction using runBatch and doneBatch', async () => {
    const allUsers: UnitTestUser[] = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User${ i + 1 }`,
      email: `user${ i + 1 }@example.com`,
      age: 18 + (i % 10),
      softDeleted: 0,
    }));

    const databaseService = await DatabaseService.initDB(dbName, tables, 1);

    databaseService.runBatch('users');

    await Promise.all(allUsers.map(user => databaseService.updateOrCreateItem('users', user)));

    await databaseService.doneBatch();

    const result = await databaseService.getItems('users', 0, 24, false);

    expect(JSON.stringify(result.data)).toBe(JSON.stringify(allUsers));
  });

  it('should abort batch transaction and revert inserts when invalid data is provided', async () => {
    const databaseService = await DatabaseService.initDB(dbName, tables, 1);

    try {
      const allUsers: UnitTestUser[] = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `User${ i + 1 }`,
        email: `user${ i + 1 }@example.com`,
        age: 18 + (i % 10),
      }));

      allUsers.push('45666aa' as never);

      databaseService.runBatch('users');

      await Promise.all(allUsers.map(user => databaseService.updateOrCreateItem('users', user)));
    } catch {
      await databaseService.revertBatch();

      const result = await databaseService.getTotalCount('users', false);

      expect(result.data).toBe(0);
    }
  });

  it('should insert multiple users into db and clear all data successfully', async () => {
    const databaseService = await DatabaseService.initDB(dbName, tables, 1);

    await Promise.all(fiveUsers.map(user => databaseService.updateOrCreateItem('users', user)));

    const totalCount = await databaseService.getTotalCount('users', false);

    expect(totalCount.data).toBe(5);

    await databaseService.clearDatabase();

    const newTotalCount = await databaseService.getTotalCount('users', false);

    expect(newTotalCount.data).toBe(0);
  });

  testsWithCursor.forEach((test) => {
    it(`should retrieve the ${ test.next ? 'next' : 'previous' } user ${ test.expectedNull ? 'as null' : `with id = ${ test.expectedId }` } starting from id = ${ test.id }`, async () => {
      const databaseService = await DatabaseService.initDB(dbName, tables, 1);

      await Promise.all(fiveUsers.map(user => databaseService.updateOrCreateItem('users', user)));

      const result = await databaseService.getPrevOrNextItem<UnitTestUser & DefaultTableColumns>(test.next, 'users', test.id, false);

      expect(result.data?.id ?? null).toBe(test.expectedNull ? null : test.expectedId);
    });
  });

  testsWithCursorAndDelete.forEach((test) => {
    it(`should retrieve the ${ test.next ? 'next' : 'previous' } user ${ test.getSoftDeleted ? 'including' : 'excluding' } softDeleted users, expected ${ test.expectedNull ? 'null' : `id = ${ test.expectedId }` }, starting from id = ${ test.id } after deleting user ${ test.deleteUserId } with softDeleted=${ test.softDeleted }`, async () => {
      const databaseService = await DatabaseService.initDB(dbName, tables, 1);

      await Promise.all(fiveUsers.map(user => databaseService.updateOrCreateItem('users', user)));

      await databaseService.deleteItem('users', test.deleteUserId, test.softDeleted);

      const result = await databaseService.getPrevOrNextItem<UnitTestUser & DefaultTableColumns>(test.next, 'users', test.id, test.getSoftDeleted);

      expect(result.data?.id ?? null).toBe(test.expectedNull ? null : test.expectedId);
    });
  });

  testsWithDelete.forEach((test) => {
    it(`should get the first user ${ test.getSoftDeleted ? 'including' : 'excluding' } softDeleted users after deleting two users ${ test.softDeleted ? 'softDeleted' : 'not softDeleted' }`, async () => {
      const databaseService = await DatabaseService.initDB(dbName, tables, 1);

      await Promise.all(fiveUsers.map(user => databaseService.updateOrCreateItem('users', user)));

      await databaseService.deleteItem('users', 1, test.softDeleted);
      await databaseService.deleteItem('users', 2, test.softDeleted);

      const firstUser = await databaseService.getFirstElement<UnitTestUser & DefaultTableColumns>('users', test.getSoftDeleted);

      if (test.softDeleted && test.getSoftDeleted) {
        expect(firstUser.data?.id).toBe(1);
      } else {
        expect(firstUser.data?.id).toBe(3);
      }
    });
  });

  it('should return null when fetching first user from an empty users table', async () => {
    const databaseService = await DatabaseService.initDB(dbName, tables, 1);

    const firstUser = await databaseService.getFirstElement('users', false);

    expect(firstUser.data).toBe(null);
  });

  it('should return null when fetching first user excluding softDeleted users after soft deleting the only user', async () => {
    const databaseService = await DatabaseService.initDB(dbName, tables, 1);

    await databaseService.updateOrCreateItem('users', {
      id: 1,
      name: 'Dmytro',
      age: 18,
      email: 'test@gmail.com'
    } satisfies UnitTestUser);

    await databaseService.deleteItem('users', 1, true);

    const firstUser = await databaseService.getFirstElement('users', false);

    expect(firstUser.data).toBe(null);
  });

  it('should return softDeleted user as first user when including softDeleted users after soft deleting the only user', async () => {
    const databaseService = await DatabaseService.initDB(dbName, tables, 1);

    await databaseService.updateOrCreateItem('users', {
      id: 1,
      name: 'Dmytro',
      age: 18,
      email: 'test@gmail.com'
    } satisfies UnitTestUser);

    await databaseService.deleteItem('users', 1, true);

    const firstUser = await databaseService.getFirstElement<UnitTestUser & DefaultTableColumns>('users', true);

    expect(firstUser.data?.id).toBe(1);
  });

  it('should throw error when to try add user with typeof id !== \'number\'', async () => {
    const databaseService = await DatabaseService.initDB(dbName, tables, 1);

    try {
      await databaseService.updateOrCreateItem('users', { id: 'aadefrer', user: 'Dmytro' });
    } catch ( err: unknown ) {
      expect((err as DatabaseResultOperationError).status).toBe(400);
      expect((err as DatabaseResultOperationError).message).toBe(ErrorTexts.IncorrectIdProvided);
    }
  });

  it('should throw error when to try add data which it is not an object', async () => {
    const databaseService = await DatabaseService.initDB(dbName, tables, 1);

    try {
      await databaseService.updateOrCreateItem('users', 'asfhytt' as never);
    } catch ( err: unknown ) {
      expect((err as DatabaseResultOperationError).status).toBe(400);
      expect((err as DatabaseResultOperationError).message).toBe(ErrorTexts.IncorrectTypeData);
    }
  });
});