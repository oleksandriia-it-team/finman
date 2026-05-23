import type { ColorVariantModel } from '@frontend/shared/models/color-variant.model';

export interface BudgetPlanStatisticBlockProps {
  income: number;
  expense: number;
  className?: string;
}

export interface StatItem {
  icon: string;
  variant: ColorVariantModel;
  label: string;
  value: number;
  textClass: string;
  prefix?: string;
  spanFull?: boolean;
}
