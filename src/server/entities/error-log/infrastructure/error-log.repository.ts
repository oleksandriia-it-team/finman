import { CrudApiRepository } from '@backend/database/crud.api.repository';
import { ErrorLogOrm } from '@backend/entities/error-log/infrastructure/error-log.orm';
import type { ErrorLogFilter } from '@common/domains/lookups/filters/error-log.filter';
import type { QueryDeepPartialEntity } from 'typeorm';
import { calculateSkipAndLimit } from '@common/utils/calculate-skip-and-take.util';

export class ErrorLogApiRepository extends CrudApiRepository<ErrorLogOrm, ErrorLogFilter> {
  constructor() {
    super(ErrorLogOrm);
  }
  override async updateItem(id: number, data: Pick<ErrorLogOrm, 'status'>): Promise<true> {
    await this.repository.update({ id }, data as QueryDeepPartialEntity<ErrorLogOrm>);
    return true;
  }

  override async getItems(from: number, to: number, filters?: Partial<ErrorLogFilter>): Promise<ErrorLogOrm[]> {
    const { skip, take } = calculateSkipAndLimit(from, to);

    const qb = this.repository.createQueryBuilder('log');

    qb.leftJoinAndSelect('log.user', 'user');

    if (filters?.status) {
      qb.andWhere('log.status = :status', { status: filters.status });
    }

    if (filters?.endpoint) {
      qb.andWhere('(log.endpoint ILIKE :search OR log.message ILIKE :search)', { search: `%${filters.endpoint}%` });
    }

    if (filters?.method) {
      qb.andWhere('log.method = :method', { method: filters.method });
    }

    const adjustedDateTo = filters?.dateTo
      ? typeof filters.dateTo === 'string'
        ? `${filters.dateTo.split('T')[0]} 23:59:59`
        : filters.dateTo
      : undefined;

    if (filters?.dateFrom && adjustedDateTo) {
      qb.andWhere('log.createdAt BETWEEN :from AND :to', {
        from: filters.dateFrom,
        to: adjustedDateTo,
      });
    } else if (filters?.dateFrom) {
      qb.andWhere('log.createdAt >= :from', { from: filters.dateFrom });
    } else if (adjustedDateTo) {
      qb.andWhere('log.createdAt <= :to', { to: adjustedDateTo });
    }

    qb.skip(skip).take(take).orderBy('log.createdAt', 'DESC');

    return await qb.getMany();
  }

  override async getTotalCount(filters?: Partial<ErrorLogFilter>): Promise<number> {
    const qb = this.repository.createQueryBuilder('log');

    if (filters?.status) {
      qb.andWhere('log.status = :status', { status: filters.status });
    }

    if (filters?.endpoint) {
      qb.andWhere('(log.endpoint ILIKE :search OR log.message ILIKE :search)', { search: `%${filters.endpoint}%` });
    }

    if (filters?.method) {
      qb.andWhere('log.method = :method', { method: filters.method });
    }

    if (filters?.dateFrom && filters?.dateTo) {
      qb.andWhere('log.createdAt BETWEEN :from AND :to', {
        from: filters.dateFrom,
        to: typeof filters.dateTo === 'string' ? `${filters.dateTo.split('T')[0]} 23:59:59` : filters.dateTo,
      });
    } else if (filters?.dateFrom) {
      qb.andWhere('log.createdAt >= :from', { from: filters.dateFrom });
    } else if (filters?.dateTo) {
      qb.andWhere('log.createdAt <= :to', {
        to: typeof filters.dateTo === 'string' ? `${filters.dateTo.split('T')[0]} 23:59:59` : filters.dateTo,
      });
    }

    return await qb.getCount();
  }

  async getStatusesCount(): Promise<Record<string, number>> {
    const rawResults = await this.repository
      .createQueryBuilder('log')
      .select('log.status', 'status')
      .addSelect('COUNT(log.id)', 'count')
      .groupBy('log.status')
      .getRawMany();
    const countsMap: Record<string, number> = {};
    let total = 0;
    for (const row of rawResults) {
      const count = parseInt(row.count, 10) || 0;
      countsMap[row.status] = count;
      total += count;
    }
    countsMap['total'] = total;
    return countsMap;
  }
}

export const errorLogApiRepository = new ErrorLogApiRepository();
