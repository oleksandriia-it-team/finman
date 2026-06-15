import type { AllCategories } from '@common/enums/categories.enum';

export interface CategoryDataItem {
  category: AllCategories;
  amount: number;
}

export interface CategoriesChartProps {
  data: CategoryDataItem[];
  totalLabel?: string | undefined;
}
