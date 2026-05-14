import { type CategoriesMapping } from '@frontend/shared/styles/card-styles-mappings';

export interface BudgetPlanEntrySectionItem {
  id: number;
  title: string;
  type: 'income' | 'expense';
  sum?: number;
  category?: keyof typeof CategoriesMapping | null;
  selected?: boolean;
  description?: string | null | undefined;
}

export interface BudgetPlanEntrySectionProps {
  entries: BudgetPlanEntrySectionItem[];
  iconName: string;
  iconClassName?: string;
  title: string;
  showSelectedBadge?: boolean;
  countLabel?: string;
  frequencyLabel?: string;
  selectable?: boolean;
  onToggleSelect?: (id: number) => void;
  onDelete?: (id: number) => void;
  gridClassName?: string;
}
