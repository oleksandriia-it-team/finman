import type { MonthRange } from '@common/domains/analytics/analytics.schema';

export interface MonthRangePickerProps {
  value: MonthRange;
  onChange: (range: MonthRange) => void;
}
