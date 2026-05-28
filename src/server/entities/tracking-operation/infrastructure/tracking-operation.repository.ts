import { CrudApiRepository } from '@backend/database/crud.api.repository';
import { TrackingOperationOrm } from '@backend/entities/tracking-operation/infrastructure/tracking-operation.orm';
import type { TrackingOperationApiFilter } from '@backend/entities/tracking-operation/domain/tracking-operation-api.filter';
import { Between, type FindOptionsWhere, ILike, In, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import type { DeepPartial } from '@common/models/deep-partial.model';
import type {
  GetBasicInformationResponse,
  GetShortStatisticResponse,
  GetTrackingOperationStatisticResponse,
  ITrackingOperationRepository,
} from '@common/domains/tracking-operation/models/tracking-operation.repository.model';
import { TypeEntry } from '@common/enums/entry.enum';
import { calculateSkipAndLimit } from '@common/utils/calculate-skip-and-take.util';
import { GetShortStatisticCommonUseCase } from '@common/domains/tracking-operation/use-cases/get-short-statistic.common.use-case';
import type { AllCategories, ExpenseCategory, IncomeCategory } from '@common/enums/categories.enum';
import { ExpenseCategories, IncomeCategories } from '@common/enums/categories.enum';
import type { Month } from '@common/enums/month.enum';
import type { MonthlyIncomeExpensesFilter, CategoryBreakdownFilter } from '@common/domains/analytics/analytics.schema';
import {
  monthYearToEndDate,
  monthYearToStartDate,
  listMonthsInRange,
} from '@common/domains/analytics/month-range.util';
import type {
  CategoryBreakdownItem,
  ExpensesByCategoryResponse,
  IncomesByCategoryResponse,
  MonthlyIncomeExpensesItem,
} from '@common/domains/analytics/analytics.model';

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

  async getMaxSum(filters?: DeepPartial<TrackingOperationApiFilter>): Promise<number> {
    const baseWhere = this.mapFilters(filters);

    return (await this.repository.maximum('sum', baseWhere)) ?? 0;
  }

  async getStatistic(
    filters?: DeepPartial<TrackingOperationApiFilter>,
  ): Promise<GetTrackingOperationStatisticResponse> {
    const baseWhere = this.mapFilters(filters);

    const [totalIncomes, totalOutcomes] = await Promise.all([
      this.repository.sum('sum', { ...baseWhere, type: TypeEntry.Income }),
      this.repository.sum('sum', { ...baseWhere, type: TypeEntry.Expense }),
    ]);

    return {
      totalIncomes: totalIncomes ?? 0,
      totalOutcomes: totalOutcomes ?? 0,
    };
  }

  async getEarliestDate(filters?: DeepPartial<TrackingOperationApiFilter>): Promise<Date | null> {
    const baseWhere = this.mapFilters(filters);

    const earliest = await this.repository.findOne({
      where: baseWhere,
      order: { date: 'ASC' },
      select: ['date'],
    });

    return earliest?.date ? new Date(earliest.date) : null;
  }

  async getBasicInformation(filters?: DeepPartial<TrackingOperationApiFilter>): Promise<GetBasicInformationResponse> {
    const statistic = await this.getStatistic(filters);
    const maxSum = await this.getMaxSum(filters);
    const totalCount = await this.getTotalCount(filters);

    return {
      ...statistic,
      maxSum,
      totalCount,
    };
  }

  getShortStatistic(input?: { userId?: number }): Promise<GetShortStatisticResponse> {
    return new GetShortStatisticCommonUseCase(this).execute(input ?? {});
  }

  async getMonthlyIncomeExpenses(
    userId: number,
    { dateFrom, dateTo, categories }: MonthlyIncomeExpensesFilter,
  ): Promise<MonthlyIncomeExpensesItem[]> {
    const qb = this.repository
      .createQueryBuilder('op')
      .select('EXTRACT(YEAR FROM op.date)::int', 'year')
      .addSelect('EXTRACT(MONTH FROM op.date)::int', 'month')
      .addSelect('op.type', 'type')
      .addSelect('SUM(op.sum)', 'sum')
      .where('op.userId = :userId', { userId })
      .andWhere('op.softDeleted = 0')
      .andWhere('op.date BETWEEN :from AND :to', {
        from: monthYearToStartDate(dateFrom),
        to: monthYearToEndDate(dateTo),
      })
      .groupBy('year, month, op.type');

    if (categories && categories.length > 0) {
      qb.andWhere('op.category IN (:...categories)', { categories });
    }

    const rows = await qb.getRawMany<{ year: number; month: number; type: TypeEntry; sum: string }>();

    const months = listMonthsInRange(dateFrom, dateTo);
    const byKey = new Map<string, { income: number; expenses: number }>(
      months.map((m) => [`${m.year}-${m.month}`, { income: 0, expenses: 0 }]),
    );

    for (const row of rows) {
      // EXTRACT(MONTH) returns 1..12, our Month enum is 0..11
      const monthIndex = (row.month - 1) as Month;
      const key = `${row.year}-${monthIndex}`;
      const bucket = byKey.get(key);
      if (!bucket) continue;
      const sum = Number.parseFloat(row.sum);
      if (row.type === TypeEntry.Income) {
        bucket.income = sum;
      } else if (row.type === TypeEntry.Expense) {
        bucket.expenses = sum;
      }
    }

    return months.map((m) => ({
      month: m.month,
      year: m.year,
      income: byKey.get(`${m.year}-${m.month}`)?.income ?? 0,
      expenses: byKey.get(`${m.year}-${m.month}`)?.expenses ?? 0,
    }));
  }

  async getCategoryBreakdown(
    userId: number,
    type: TypeEntry,
    { dateFrom, dateTo }: CategoryBreakdownFilter,
  ): Promise<Map<AllCategories, number>> {
    const rows = await this.repository
      .createQueryBuilder('op')
      .select('op.category', 'category')
      .addSelect('SUM(op.sum)', 'sum')
      .where('op.userId = :userId', { userId })
      .andWhere('op.softDeleted = 0')
      .andWhere('op.type = :type', { type })
      .andWhere('op.date BETWEEN :from AND :to', {
        from: monthYearToStartDate(dateFrom),
        to: monthYearToEndDate(dateTo),
      })
      .groupBy('op.category')
      .getRawMany<{ category: AllCategories; sum: string }>();

    return new Map(rows.map((row) => [row.category, Number.parseFloat(row.sum)]));
  }

  async getExpensesByCategory(userId: number, filter: CategoryBreakdownFilter): Promise<ExpensesByCategoryResponse> {
    const sums = await this.getCategoryBreakdown(userId, TypeEntry.Expense, filter);
    return buildCategoryBreakdown<ExpenseCategory>(Object.values(ExpenseCategories), sums);
  }

  async getIncomesByCategory(userId: number, filter: CategoryBreakdownFilter): Promise<IncomesByCategoryResponse> {
    const sums = await this.getCategoryBreakdown(userId, TypeEntry.Income, filter);
    return buildCategoryBreakdown<IncomeCategory>(Object.values(IncomeCategories), sums);
  }
}

function buildCategoryBreakdown<TCategory extends AllCategories>(
  categories: readonly TCategory[],
  sums: Map<AllCategories, number>,
): { total: number; items: CategoryBreakdownItem<TCategory>[] } {
  const items = categories.map((category) => ({
    category,
    sum: sums.get(category) ?? 0,
  }));

  const total = items.reduce((acc, item) => acc + item.sum, 0);

  return {
    total,
    items: items.map((item) => ({
      ...item,
      percentage: total === 0 ? 0 : (item.sum / total) * 100,
    })),
  };
}

export const trackingOperationRepository = new TrackingOperationRepository(TrackingOperationOrm);
