import type { Month } from '@common/enums/month.enum';

export interface SelectBudgetPlanMonthProps {
  month: Month;
  year: number;
  onSelect: (month: Month) => void;
  selected?: boolean;
}
