import { MonthTitles } from '@common/constants/month-titles.constant';
import type { MonthYear } from '@common/domains/analytics/analytics.schema';

export const ShortMonthLength = 3;

export type MonthYearFormat = 'short' | 'long';

export function formatMonthYear(value: MonthYear, mode: MonthYearFormat = 'long'): string {
  const name = mode === 'short' ? MonthTitles[value.month].slice(0, ShortMonthLength) : MonthTitles[value.month];
  return `${name} ${value.year}`;
}
