import type { IUseCase } from '@common/models/use-case.model';
import {
  type TrackingOperationRepository,
  trackingOperationRepository,
} from '@backend/entities/tracking-operation/infrastructure/tracking-operation.repository';
import type { CategoryBreakdownFilter } from '@common/domains/analytics/analytics.schema';
import type { IncomesByCategoryResponse } from '@common/domains/analytics/analytics.model';
import { type IncomeCategory, IncomeCategories } from '@common/enums/categories.enum';
import { TypeEntry } from '@common/enums/entry.enum';
import { buildCategoryBreakdown } from '@common/domains/analytics/build-category-breakdown.util';

type Input = CategoryBreakdownFilter & { userId: number };

export class GetIncomesByCategoryApiUseCase implements IUseCase<Input, IncomesByCategoryResponse> {
  constructor(private readonly trackingOperationRepository: TrackingOperationRepository) {}

  async execute({ userId, ...filter }: Input): Promise<IncomesByCategoryResponse> {
    const sums = await this.trackingOperationRepository.getCategorySums(userId, TypeEntry.Income, filter);
    return buildCategoryBreakdown<IncomeCategory>(Object.values(IncomeCategories), sums);
  }
}

export const getIncomesByCategoryApiUseCase = new GetIncomesByCategoryApiUseCase(trackingOperationRepository);
