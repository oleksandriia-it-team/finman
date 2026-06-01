import type { Month } from '@common/enums/month.enum';
import type { MonthYear } from '@common/domains/analytics/analytics.schema';

export function toMonthYear(date: Date): MonthYear {
  return {
    month: date.getMonth() as Month,
    year: date.getFullYear(),
  };
}

export function fromMonthYear(value: MonthYear): Date {
  return new Date(value.year, value.month, 1);
}
