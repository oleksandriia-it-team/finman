import 'fake-indexeddb/auto';

import { DatabaseService } from '../database.service';
import { describe, expect, it } from 'vitest';

interface UnitTestUser {
  id: number;
  name: string;
  email: string;
  age: number;
}

describe('DatabaseService', () => {

  it('should create user with id = 1, name = Dmytro, email = test@gmail.com, age = 18', async () => {
    const databaseService = await DatabaseService.initDB('UNIT_TESTS', [ 'users' ], 1);

    const result = await databaseService.updateOrCreateItem('users', {
      name: 'Dmytro',
      age: 18,
      email: 'test@gmail.com'
    } satisfies Omit<UnitTestUser, 'id'>);

    expect(result.data).toBe(1);
  });
});