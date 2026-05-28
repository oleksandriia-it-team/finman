import type { IUseCase } from '@common/models/use-case.model';
import type { CategoryBreakdownFilter } from '@common/domains/analytics/analytics.schema';
import type { ExpensesByCategoryResponse } from '@common/domains/analytics/analytics.model';
import { monthYearToEndDate, monthYearToStartDate } from '@common/domains/analytics/month-range.util';
import { buildCategoryBreakdown } from '@common/domains/analytics/build-category-breakdown.util';
import { type AllCategories, type ExpenseCategory, ExpenseCategories } from '@common/enums/categories.enum';
import { TypeEntry } from '@common/enums/entry.enum';
import type { TrackingOperationLocalRepository } from '@frontend/entities/tracking-operations/tracking-operation.local.repository';

export class GetExpensesByCategoryLocalUseCase implements IUseCase<
  CategoryBreakdownFilter,
  ExpensesByCategoryResponse
> {
  constructor(private readonly trackingOperationRepository: TrackingOperationLocalRepository) {}

  async execute({ dateFrom, dateTo }: CategoryBreakdownFilter): Promise<ExpensesByCategoryResponse> {
    const from = monthYearToStartDate(dateFrom);
    const to = monthYearToEndDate(dateTo);

    const ops = await this.trackingOperationRepository.table
      .where('date')
      .between(from, to, true, true)
      .filter((op) => op.softDeleted === 0 && op.type === TypeEntry.Expense)
      .toArray();

    const sums = new Map<AllCategories, number>();
    for (const op of ops) {
      sums.set(op.category, (sums.get(op.category) ?? 0) + op.sum);
    }

    return buildCategoryBreakdown<ExpenseCategory>(Object.values(ExpenseCategories), sums);
  }
}
