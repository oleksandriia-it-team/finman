import type { IUseCase } from '@common/models/use-case.model';
import type { MonthlyIncomeExpensesFilter } from '@common/domains/analytics/analytics.schema';
import type { MonthlyIncomeExpensesItem } from '@common/domains/analytics/analytics.model';
import {
  listMonthsInRange,
  monthYearToEndDate,
  monthYearToStartDate,
} from '@common/domains/analytics/month-range.util';
import { TypeEntry } from '@common/enums/entry.enum';
import type { Month } from '@common/enums/month.enum';
import type { TrackingOperationLocalRepository } from '@frontend/entities/tracking-operations/tracking-operation.local.repository';

export class GetMonthlyIncomeExpensesLocalUseCase implements IUseCase<
  MonthlyIncomeExpensesFilter,
  MonthlyIncomeExpensesItem[]
> {
  constructor(private readonly trackingOperationRepository: TrackingOperationLocalRepository) {}

  async execute({ dateFrom, dateTo, categories }: MonthlyIncomeExpensesFilter): Promise<MonthlyIncomeExpensesItem[]> {
    const from = monthYearToStartDate(dateFrom);
    const to = monthYearToEndDate(dateTo);
    const categorySet = categories && categories.length > 0 ? new Set(categories) : null;

    const ops = await this.trackingOperationRepository.table
      .where('date')
      .between(from, to, true, true)
      .filter((op) => op.softDeleted === 0 && (categorySet ? categorySet.has(op.category) : true))
      .toArray();

    const months = listMonthsInRange(dateFrom, dateTo);
    const byKey = new Map<string, { income: number; expenses: number }>(
      months.map((m) => [`${m.year}-${m.month}`, { income: 0, expenses: 0 }]),
    );

    for (const op of ops) {
      const date = op.date instanceof Date ? op.date : new Date(op.date);
      const bucket = byKey.get(`${date.getFullYear()}-${date.getMonth()}`);
      if (!bucket) continue;
      if (op.type === TypeEntry.Income) {
        bucket.income += op.sum;
      } else if (op.type === TypeEntry.Expense) {
        bucket.expenses += op.sum;
      }
    }

    return months.map((m) => ({
      month: m.month as Month,
      year: m.year,
      income: byKey.get(`${m.year}-${m.month}`)?.income ?? 0,
      expenses: byKey.get(`${m.year}-${m.month}`)?.expenses ?? 0,
    }));
  }
}
