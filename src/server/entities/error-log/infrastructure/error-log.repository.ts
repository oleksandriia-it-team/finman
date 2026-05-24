import { CrudApiRepository } from '@backend/database/crud.api.repository';
import { ErrorLogOrm } from '@backend/entities/error-log/infrastructure/error-log.orm';
import type { ErrorLogFilter } from '@common/domains/lookups/filters/error-log.filter';
import { type QueryDeepPartialEntity, type SelectQueryBuilder } from 'typeorm';
import { calculateSkipAndLimit } from '@common/utils/calculate-skip-and-take.util';
import type { ErrorLogStatus } from '@common/constants/error-log-status.constant';

export class ErrorLogApiRepository extends CrudApiRepository<ErrorLogOrm, ErrorLogFilter> {
  constructor() {
    super(ErrorLogOrm);
  }

  override async updateItem(id: number, data: Pick<ErrorLogOrm, 'status'>): Promise<true> {
    await this.repository.update({ id }, data as QueryDeepPartialEntity<ErrorLogOrm>);
    return true;
  }

  private applyCommonFilters(qb: SelectQueryBuilder<ErrorLogOrm>, filters?: Partial<ErrorLogFilter>) {
    if (filters?.endpoint) {
      qb.andWhere('(log.endpoint ILIKE :search OR log.message ILIKE :search)', { search: `%${filters.endpoint}%` });
    }

    if (filters?.method) {
      qb.andWhere('log.method = :method', { method: filters.method });
    }

    let adjustedDateTo: string | Date | undefined = undefined;
    if (filters?.dateTo) {
      if (filters.dateTo instanceof Date) {
        const endOfDay = new Date(filters.dateTo);
        endOfDay.setHours(23, 59, 59, 999);
        adjustedDateTo = endOfDay;
      } else if (typeof filters.dateTo === 'string') {
        adjustedDateTo = `${filters.dateTo.split('T')[0]} 23:59:59`;
      } else {
        adjustedDateTo = filters.dateTo;
      }
    }

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
  }

  override async getItems(from: number, to: number, filters?: Partial<ErrorLogFilter>): Promise<ErrorLogOrm[]> {
    const { skip, take } = calculateSkipAndLimit(from, to);
    const qb = this.repository.createQueryBuilder('log');

    qb.leftJoinAndSelect('log.user', 'user');

    if (filters?.status) {
      qb.andWhere('log.status = :status', { status: filters.status });
    }

    this.applyCommonFilters(qb, filters);

    qb.skip(skip).take(take).orderBy('log.createdAt', 'DESC');

    return await qb.getMany();
  }

  override async getTotalCount(filters?: Partial<ErrorLogFilter>): Promise<number> {
    const qb = this.repository.createQueryBuilder('log');

    if (filters?.status) {
      qb.andWhere('log.status = :status', { status: filters.status });
    }

    this.applyCommonFilters(qb, filters);

    return await qb.getCount();
  }

  async getStatusesCount(filters?: Partial<ErrorLogFilter>): Promise<Record<ErrorLogStatus | 'total', number>> {
    const qb = this.repository.createQueryBuilder('log');

    this.applyCommonFilters(qb, filters);

    const rawResults = await qb
      .select('log.status', 'status')
      .addSelect('COUNT(log.id)', 'count')
      .groupBy('log.status')
      .getRawMany();

    const countsMap = {
      total: 0,
    } as Record<ErrorLogStatus | 'total', number>;

    let total = 0;
    for (const row of rawResults) {
      const count = Number.parseInt(row.count, 10) || 0;
      countsMap[row.status as ErrorLogStatus] = count;
      total += count;
    }

    countsMap.total = total;

    return countsMap;
  }
}

export const errorLogApiRepository = new ErrorLogApiRepository();
