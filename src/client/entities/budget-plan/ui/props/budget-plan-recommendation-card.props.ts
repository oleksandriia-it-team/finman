import type { UpdateBudgetPlanDto } from '@common/domains/budget-plan/budget-plan.schema';

export interface BudgetPlanRecommendationCardProps {
  entry: UpdateBudgetPlanDto['otherEntries'][number];
  fallbackId: number;
  onToggle: (entryId: number) => void;
}
