import { CrudApiRepository } from '@backend/database/crud.api.repository';
import { TrackingOperationOrm } from '@backend/entities/tracking-operation/infrastructure/tracking-operation.orm';
import type { TrackingOperationApiFilter } from '@backend/entities/tracking-operation/domain/tracking-operation-api.filter';
import { Between, type FindOptionsWhere, ILike, In, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import type { DeepPartial } from '@common/models/deep-partial.model';
import type {
  GetTrackingOperationStatisticResponse,
  ITrackingOperationRepository,
} from '@common/domains/tracking-operation/models/tracking-operation.repository.model';
import type { TrackingOperationStatisticDto } from '@common/domains/tracking-operation/schema/tracking-operation.schema';
import { TypeEntry } from '@common/enums/entry.enum';
import { calculateSkipAndLimit } from '@common/utils/calculate-skip-and-take.util';

function escapeLike(value: string): string {
  return value.replace(/[\\%_]/g, '\\$&');
}

export class TrackingOperationRepository
  extends CrudApiRepository<TrackingOperationOrm, TrackingOperationApiFilter>
  implements ITrackingOperationRepository
{
  protected override mapFilters(
    filters: DeepPartial<TrackingOperationApiFilter> | undefined,
  ): FindOptionsWhere<TrackingOperationOrm> {
    const where: FindOptionsWhere<TrackingOperationOrm> = {};
    if (!filters) return where;

    if (filters.userId !== undefined) where.userId = filters.userId;
    if (filters.type) where.type = filters.type;
    if (filters.category) {
      where.category = Array.isArray(filters.category) ? In(filters.category) : filters.category;
    }
    if (filters.softDeleted !== undefined) where.softDeleted = filters.softDeleted;

    if (filters.dateFrom && filters.dateTo) {
      where.date = Between(filters.dateFrom as Date, filters.dateTo as Date);
    } else if (filters.dateFrom) {
      where.date = MoreThanOrEqual(filters.dateFrom as Date);
    } else if (filters.dateTo) {
      where.date = LessThanOrEqual(filters.dateTo as Date);
    }

    // Exact match is dropped if a range parameter is populated.
    if (filters.minSum !== undefined && filters.maxSum !== undefined) {
      where.sum = Between(filters.minSum, filters.maxSum);
    } else if (filters.minSum !== undefined) {
      where.sum = MoreThanOrEqual(filters.minSum);
    } else if (filters.maxSum !== undefined) {
      where.sum = LessThanOrEqual(filters.maxSum);
    }

    return where;
  }

  private buildSearchWhereClauses(
    baseWhere: FindOptionsWhere<TrackingOperationOrm>,
    searchString: string,
  ): FindOptionsWhere<TrackingOperationOrm>[] {
    const search = `%${escapeLike(searchString)}%`;
    return [
      { ...baseWhere, title: ILike(search) },
      { ...baseWhere, description: ILike(search) },
    ];
  }

  override async getItems(
    from: number,
    to: number,
    filters?: DeepPartial<TrackingOperationApiFilter>,
  ): Promise<TrackingOperationOrm[]> {
    const baseWhere = this.mapFilters(filters);

    const { skip, take } = calculateSkipAndLimit(from, to);

    if (!filters?.search) {
      return this.repository.find({
        where: baseWhere,
        skip,
        take,
        order: { date: 'DESC' },
      });
    }

    return this.repository.find({
      where: this.buildSearchWhereClauses(baseWhere, filters.search),
      skip,
      take,
      order: { date: 'ASC' },
    });
  }

  override getTotalCount(filters?: DeepPartial<TrackingOperationApiFilter>): Promise<number> {
    const baseWhere = this.mapFilters(filters);

    if (!filters?.search) {
      return super.getTotalCount(filters);
    }

    return this.repository.count({
      where: this.buildSearchWhereClauses(baseWhere, filters.search),
    });
  }

  async getMaxSum(userId?: number): Promise<number> {
    const qb = this.repository
      .createQueryBuilder('op')
      .select('COALESCE(MAX(op.sum), 0)', 'maxSum')
      .where('op.softDeleted = :softDeleted', { softDeleted: 0 });

    if (userId !== undefined) {
      qb.andWhere('op.userId = :userId', { userId });
    }

    const result = await qb.getRawOne<{ maxSum: string }>();
    return parseFloat(result?.maxSum ?? '0');
  }

  async getStatistic(
    input: TrackingOperationStatisticDto & { userId?: number },
  ): Promise<GetTrackingOperationStatisticResponse> {
    const { dateFrom, dateTo, userId } = input;

    const qb = this.repository
      .createQueryBuilder('op')
      .select('COALESCE(SUM(CASE WHEN op.type = :incomeType THEN op.sum ELSE 0 END), 0)', 'totalIncomes')
      .addSelect('COALESCE(SUM(CASE WHEN op.type = :expenseType THEN op.sum ELSE 0 END), 0)', 'totalOutcomes')
      .setParameters({ incomeType: TypeEntry.Income, expenseType: TypeEntry.Expense })
      .where('op.softDeleted = :softDeleted', { softDeleted: 0 });

    if (userId !== undefined) {
      qb.andWhere('op.userId = :userId', { userId });
    }
    if (dateFrom) {
      qb.andWhere('op.date >= :dateFrom', { dateFrom });
    }
    if (dateTo) {
      qb.andWhere('op.date <= :dateTo', { dateTo });
    }

    const result = await qb.getRawOne<{ totalIncomes: string; totalOutcomes: string }>();
    return {
      totalIncomes: parseFloat(result?.totalIncomes ?? '0'),
      totalOutcomes: parseFloat(result?.totalOutcomes ?? '0'),
    };
  }
}

export const trackingOperationRepository = new TrackingOperationRepository(TrackingOperationOrm);
