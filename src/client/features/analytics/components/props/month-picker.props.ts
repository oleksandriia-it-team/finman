import type { MonthYear } from '@common/domains/analytics/analytics.schema';

export interface MonthPickerProps {
  value: MonthYear;
  onChange: (next: MonthYear) => void;
}
