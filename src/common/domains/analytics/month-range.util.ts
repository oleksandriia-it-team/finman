import type { Month } from '@common/enums/month.enum';
import type { MonthYear } from '@common/domains/analytics/analytics.schema';

export function monthYearToStartDate({ month, year }: MonthYear): Date {
  return new Date(year, month, 1, 0, 0, 0, 0);
}

export function monthYearToEndDate({ month, year }: MonthYear): Date {
  return new Date(year, month + 1, 0, 23, 59, 59, 999);
}

export function listMonthsInRange(from: MonthYear, to: MonthYear): { month: Month; year: number }[] {
  const result: { month: Month; year: number }[] = [];
  let year = from.year;
  let month = from.month;

  const endKey = to.year * 12 + to.month;
  while (year * 12 + month <= endKey) {
    result.push({ month: month as Month, year });
    if (month === 11) {
      month = 0;
      year += 1;
    } else {
      month += 1;
    }
  }

  return result;
}
