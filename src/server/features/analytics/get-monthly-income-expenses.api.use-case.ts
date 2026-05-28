import type { IUseCase } from '@common/models/use-case.model';
import {
  type TrackingOperationRepository,
  trackingOperationRepository,
} from '@backend/entities/tracking-operation/infrastructure/tracking-operation.repository';
import type { MonthlyIncomeExpensesFilter } from '@common/domains/analytics/analytics.schema';
import type { MonthlyIncomeExpensesItem } from '@common/domains/analytics/analytics.model';
import { listMonthsInRange } from '@common/domains/analytics/month-range.util';
import type { Month } from '@common/enums/month.enum';
import { TypeEntry } from '@common/enums/entry.enum';

type Input = MonthlyIncomeExpensesFilter & { userId: number };

export class GetMonthlyIncomeExpensesApiUseCase implements IUseCase<Input, MonthlyIncomeExpensesItem[]> {
  constructor(private readonly trackingOperationRepository: TrackingOperationRepository) {}

  async execute({ userId, ...filter }: Input): Promise<MonthlyIncomeExpensesItem[]> {
    const rows = await this.trackingOperationRepository.getMonthlyTotalsRaw(
      userId,
      { dateFrom: filter.dateFrom, dateTo: filter.dateTo },
      filter.categories,
    );

    const months = listMonthsInRange(filter.dateFrom, filter.dateTo);
    const byKey = new Map<string, { income: number; expenses: number }>(
      months.map((m) => [`${m.year}-${m.month}`, { income: 0, expenses: 0 }]),
    );

    for (const row of rows) {
      // EXTRACT(MONTH) returns 1..12, Month enum is 0..11
      const monthIndex = (row.month - 1) as Month;
      const bucket = byKey.get(`${row.year}-${monthIndex}`);
      if (!bucket) continue;
      if (row.type === TypeEntry.Income) {
        bucket.income = row.sum;
      } else if (row.type === TypeEntry.Expense) {
        bucket.expenses = row.sum;
      }
    }

    return months.map((m) => ({
      month: m.month,
      year: m.year,
      income: byKey.get(`${m.year}-${m.month}`)?.income ?? 0,
      expenses: byKey.get(`${m.year}-${m.month}`)?.expenses ?? 0,
    }));
  }
}

export const getMonthlyIncomeExpensesApiUseCase = new GetMonthlyIncomeExpensesApiUseCase(trackingOperationRepository);
