import type { AllCategories } from '@common/enums/categories.enum';
import type { CategoryBreakdownItem, CategoryBreakdownResponse } from '@common/domains/analytics/analytics.model';

export function buildCategoryBreakdown<TCategory extends AllCategories>(
  categories: readonly TCategory[],
  sums: Map<AllCategories, number>,
): CategoryBreakdownResponse<TCategory> {
  const items: { category: TCategory; sum: number }[] = categories.map((category) => ({
    category,
    sum: sums.get(category) ?? 0,
  }));

  const total = items.reduce((acc, item) => acc + item.sum, 0);

  const withPercentage: CategoryBreakdownItem<TCategory>[] = items.map((item) => ({
    ...item,
    percentage: total === 0 ? 0 : (item.sum / total) * 100,
  }));

  return { total, items: withPercentage };
}
