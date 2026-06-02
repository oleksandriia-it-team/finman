import { startOfMonth, subMonths } from 'date-fns';
import type { MonthRange, MonthYear } from '@common/domains/analytics/analytics.schema';
import { toMonthYear } from '@common/domains/analytics/utils/to-month-year.util';

export const DefaultMonthsInRange = 5;

export function getDefaultMonth(): MonthYear {
  return toMonthYear(new Date());
}

export function getDefaultRange(monthsBack: number = DefaultMonthsInRange): MonthRange {
  const now = new Date();
  return {
    dateFrom: toMonthYear(subMonths(startOfMonth(now), monthsBack)),
    dateTo: toMonthYear(now),
  };
}
