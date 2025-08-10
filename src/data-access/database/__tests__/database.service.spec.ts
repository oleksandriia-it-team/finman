import 'fake-indexeddb/auto';
import { indexedDB } from 'fake-indexeddb';

import { DatabaseService } from '../database.service';
import { beforeEach, describe, expect, it } from 'vitest';
import { DatabaseResultOperationError } from '../../../shared/models/database-result-operation.model';

interface UnitTestUser {
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

  it('should get null because user with id = 2 not exist', async () => {

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
    it(`should delete user with id = 1 with softDeleted = ${ test.softDeleted } try to get the user with getSoftDeleted = ${ test.getSoftDeleted }`, async () => {
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

  it('should create 5 users and total count should be 5', async () => {
    const databaseService = await DatabaseService.initDB(dbName, tables, 1);

    await Promise.all(fiveUsers.map(user => databaseService.updateOrCreateItem('users', user)));

    const result = await databaseService.getTotalCount('users', false);

    expect(result.data).toBe(5);
  });

  testsWithDelete.forEach((test) => {
    it(`should create 5 users, delete one user with softDeleted = ${ test.softDeleted } and total count should be ${ test.getSoftDeleted && test.softDeleted ? '5 including softDeleted' : 4 }`, async () => {
      const databaseService = await DatabaseService.initDB(dbName, tables, 1);

      await Promise.all(fiveUsers.map(user => databaseService.updateOrCreateItem('users', user)));

      await databaseService.deleteItem('users', 1, test.softDeleted);

      const result = await databaseService.getTotalCount('users', test.getSoftDeleted);

      expect(result.data).toBe(test.getSoftDeleted && test.softDeleted ? 5 : 4);
    });
  });

  it('should create 25 users and get from 5 to 11 indexes', async () => {
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
    it(`should create 25 users, delete users id = 1, 2, 3 with softDeleted = ${test.softDeleted} and get from 1 to 5 indexes ${test.getSoftDeleted ? 'including' : 'without'} softDeleted(it should be users with id = ${test.softDeleted && test.getSoftDeleted ? '1, 2, 3, 4, 5' : '4, 5, 6, 7, 8'})`, async () => {
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

      if(test.softDeleted) {
        deletedUsers.forEach(user => {
          user.softDeleted = 1;
        })
      }

      const result = await databaseService.getItems('users', 0, 4, test.getSoftDeleted);

      if(test.softDeleted && test.getSoftDeleted) {
        const checkUsers = allUsers.slice(0, 5);

        expect(JSON.stringify(result.data)).toBe(JSON.stringify(checkUsers));
      }
      else {
        const checkUsers = allUsers.slice(3, 8);

        expect(JSON.stringify(result.data)).toBe(JSON.stringify(checkUsers));
      }
    });
  })


  it('should done all inserts into db using runBatch', async () => {
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

  it('should revert all inserts into db using runBatch because one of the data is not an object', async () => {
    const databaseService = await DatabaseService.initDB(dbName, tables, 1);

    try {
      const allUsers: UnitTestUser[] = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `User${ i + 1 }`,
        email: `user${ i + 1 }@example.com`,
        age: 18 + (i % 10),
      }));

      allUsers.push('45666aa' as never);

      databaseService.runBatch();

      await Promise.all(allUsers.map(user => databaseService.updateOrCreateItem('users', user)));
    } catch ( error: DatabaseResultOperationError ) {
      databaseService.revertBatch();

      const result = await databaseService.getTotalCount('users', false);

      expect(result.data).toBe(0);
    }
  });

  it('should insert data into db and clear them', async () => {
    const databaseService = await DatabaseService.initDB(dbName, tables, 1);

    await Promise.all(fiveUsers.map(user => databaseService.updateOrCreateItem('users', user)));

    const totalCount = await databaseService.getTotalCount('users', false);

    expect(totalCount.data).toBe(5);

    await databaseService.clearDatabase();

    const newTotalCount = await databaseService.getTotalCount('users', false);

    expect(newTotalCount.data).toBe(0);
  });

  testsWithCursor.forEach((test) => {
    it(`should get ${ test.next ? 'next' : 'prev' } user which to be ${ test.expectedNull ? 'null' : `id = ${ test.expectedId }` } starting with id = ${ test.id }`, async () => {
      const databaseService = await DatabaseService.initDB(dbName, tables, 1);

      await Promise.all(fiveUsers.map(user => databaseService.updateOrCreateItem('users', user)));

      const result = await databaseService.getPrevOrNextItem(test.next, 'users', test.id, false);

      expect(result.data?.id ?? null).toBe(test.expectedNull ? null : test.expectedId);
    });
  });

  testsWithCursorAndDelete.forEach((test) => {
    it(`should get ${ test.next ? 'next' : 'prev' } user ${ test.getSoftDeleted ? 'including' : 'without' } softDeleted which ${ test.expectedNull ? 'null' : `id = ${ test.expectedId }` } starting with id = ${ test.id } when user with id = ${ test.deleteUserId } was deleted with softDeleted = ${ test.softDeleted }`, async () => {
      const databaseService = await DatabaseService.initDB(dbName, tables, 1);

      await Promise.all(fiveUsers.map(user => databaseService.updateOrCreateItem('users', user)));

      await databaseService.deleteItem('users', test.deleteUserId, test.softDeleted);

      const result = await databaseService.getPrevOrNextItem(test.next, 'users', test.id, test.getSoftDeleted);

      expect(result.data?.id ?? null).toBe(test.expectedNull ? null : test.expectedId);
    });
  });

  testsWithDelete.forEach((test) => {
    it(`should get the first user ${ test.getSoftDeleted ? 'including' : 'without' } softDeleted if two users was deleted ${test.softDeleted ? 'with' : 'without' } softDeleted`, async () => {
      const databaseService = await DatabaseService.initDB(dbName, tables, 1);

      await Promise.all(fiveUsers.map(user => databaseService.updateOrCreateItem('users', user)));

      await databaseService.deleteItem('users', 1, test.softDeleted);
      await databaseService.deleteItem('users', 2, test.softDeleted);

      const firstUser = await databaseService.getFirstElement('users', test.getSoftDeleted);

      if(test.softDeleted && test.getSoftDeleted) {
        expect(firstUser.data?.id).toBe(1);
      }
      else {
        expect(firstUser.data?.id).toBe(3);
      }
    })
  });

  it('should get first user = null because the users table is empty', async () => {
    const databaseService = await DatabaseService.initDB(dbName, tables, 1);

    const firstUser = await databaseService.getFirstElement('users', false);

    expect(firstUser.data).toBe(null);
  });

  it('should delete the first user with softDeleted = true get first user = null without softIncluded', async () => {
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

  it('should delete the first user with softDeleted = true get first user id = 1 including softIncluded', async () => {
    const databaseService = await DatabaseService.initDB(dbName, tables, 1);

    await databaseService.updateOrCreateItem('users', {
      id: 1,
      name: 'Dmytro',
      age: 18,
      email: 'test@gmail.com'
    } satisfies UnitTestUser);

    await databaseService.deleteItem('users', 1, true);

    const firstUser = await databaseService.getFirstElement('users', true);

    expect(firstUser.data?.id).toBe(1);
  });
});