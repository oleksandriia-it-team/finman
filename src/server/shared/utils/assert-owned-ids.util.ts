import { type FindOptionsWhere, In, type Repository } from 'typeorm';
import { AppError } from '@common/classes/app-error.class';

export interface UserOwnedEntity {
  id: number;
  userId: number;
  softDeleted: 0 | 1;
}

export async function findOwnedIds<T extends UserOwnedEntity>(
  repository: Repository<T>,
  userId: number,
  ids: readonly number[],
): Promise<number[]> {
  if (ids.length === 0) return [];

  const rows = await repository.find({
    where: { id: In(ids as number[]), userId, softDeleted: 0 } as FindOptionsWhere<T>,
    select: ['id'] as (keyof T)[],
  });

  return rows.map((r) => r.id);
}

export async function assertOwnedIds<T extends UserOwnedEntity>(
  repository: Repository<T>,
  userId: number,
  ids: readonly number[],
  notOwnedMessage: string,
): Promise<number[]> {
  const uniqueIds = [...new Set(ids)];
  if (uniqueIds.length === 0) return [];

  const ownedIds = await findOwnedIds(repository, userId, uniqueIds);
  if (ownedIds.length !== uniqueIds.length) {
    throw new AppError(notOwnedMessage, 403);
  }

  return uniqueIds;
}
