import type { IUseCase } from '@common/models/use-case.model';
import {
  type TrackingOperationRepository,
  trackingOperationRepository,
} from '@backend/entities/tracking-operation/infrastructure/tracking-operation.repository';
import type { CategoryBreakdownFilter } from '@common/domains/analytics/analytics.schema';
import type { ExpensesByCategoryResponse } from '@common/domains/analytics/analytics.model';
import { type ExpenseCategory, ExpenseCategories } from '@common/enums/categories.enum';
import { TypeEntry } from '@common/enums/entry.enum';
import { buildCategoryBreakdown } from '@common/domains/analytics/build-category-breakdown.util';

type Input = CategoryBreakdownFilter & { userId: number };

export class GetExpensesByCategoryApiUseCase implements IUseCase<Input, ExpensesByCategoryResponse> {
  constructor(private readonly trackingOperationRepository: TrackingOperationRepository) {}

  async execute({ userId, ...filter }: Input): Promise<ExpensesByCategoryResponse> {
    const sums = await this.trackingOperationRepository.getCategorySums(userId, TypeEntry.Expense, filter);
    return buildCategoryBreakdown<ExpenseCategory>(Object.values(ExpenseCategories), sums);
  }
}

export const getExpensesByCategoryApiUseCase = new GetExpensesByCategoryApiUseCase(trackingOperationRepository);
