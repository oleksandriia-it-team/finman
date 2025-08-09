import 'fake-indexeddb/auto';
import { IDBKeyRange } from 'fake-indexeddb';

import { DatabaseService } from '../database.service';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { indexedDB } from 'fake-indexeddb';

interface UnitTestUser {
  id: number;
  name: string;
  email: string;
  age: number;
}

interface UnitTestWithDelete {
  softDeleted: boolean;
  getSoftDeleted: boolean;
}

const dbName = 'UNIT_TESTS';
const tables = ['users'];

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

  beforeAll(() => {
    global.IDBKeyRange = IDBKeyRange;
  });

  afterEach(() => {
    indexedDB.deleteDatabase(dbName);
  })
  
  it('should create user with id = 1, name = Dmytro, email = test@gmail.com, age = 18', async () => {
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
    it(`should delete user with id = 1 with softDeleted = ${test.softDeleted} try to get the user with getSoftDeleted = ${test.getSoftDeleted}`, async() => {
      const databaseService = await DatabaseService.initDB(dbName, tables, 1);

      const user: UnitTestUser = {
        id: 1,
        name: 'Dmytro',
        age: 18,
        email: 'test@gmail.com'
      };

      await databaseService.updateOrCreateItem('users', user as unknown as Record<string, unknown>);

      await databaseService.deleteItem('users', 1, test.softDeleted);

      const result = await databaseService.getItemById('users', 1, test.getSoftDeleted);

      if(test.softDeleted && test.getSoftDeleted) {
        expect(JSON.stringify(result.data)).toBe(JSON.stringify({ ...user, softDeleted: Number(test.softDeleted) }));
      }
      else {
        expect(result.data).toBe(null);
      }
    });
  });

  it('should create 5 users and total count should be 5', async () => {
    const databaseService = await DatabaseService.initDB(dbName, tables, 1);

    await Promise.all(fiveUsers.map(user => databaseService.updateOrCreateItem('users', user as unknown as Record<string, unknown>)));

    const result  = await databaseService.getTotalCount('users', false);

    expect(result.data).toBe(5);
  });

  testsWithDelete.forEach((test) => {
    it(`should create 5 users, delete one user with softDeleted = ${test.softDeleted} and total count should be ${test.getSoftDeleted && test.softDeleted ? '5 including softDeleted' : 4}`, async () => {
      const databaseService = await DatabaseService.initDB(dbName, tables, 1);

      await Promise.all(fiveUsers.map(user => databaseService.updateOrCreateItem('users', user as unknown as Record<string, unknown>)));

      await databaseService.deleteItem('users', 1, test.softDeleted);

      const result  = await databaseService.getTotalCount('users', test.getSoftDeleted);

      expect(result.data).toBe(test.getSoftDeleted && test.softDeleted ? 5 : 4);
    })
  });

  // Fix this test
  it('should create 25 users and get from 5 to 11 indexes', async () => {
    const allUsers: UnitTestUser[] = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User${i + 1}`,
      email: `user${i + 1}@example.com`,
      age: 18 + (i % 10),
    }));

    const selectedUsers = allUsers.slice(5, 12);

    const databaseService = await DatabaseService.initDB(dbName, tables, 1);

    await Promise.all(allUsers.map(user => databaseService.updateOrCreateItem('users', user as unknown as Record<string, unknown>)));

    const result = await databaseService.getItems('users', 5, 11, false);

    expect(JSON.stringify(result.data)).toBe(JSON.stringify(selectedUsers));
  })
});