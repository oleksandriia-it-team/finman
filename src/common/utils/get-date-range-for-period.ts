import { startOfDay, endOfDay, startOfWeek, startOfMonth, startOfYear } from 'date-fns';
import { RegularPaymentFrequencyFilter } from '@common/enums/regular-freequency.enum';

export function getDateRangeForPeriod(period: RegularPaymentFrequencyFilter): {
  dateFrom: Date;
  dateTo: Date;
} {
  const now = new Date();

  switch (period) {
    case RegularPaymentFrequencyFilter.Today:
      return { dateFrom: startOfDay(now), dateTo: endOfDay(now) };

    case RegularPaymentFrequencyFilter.Week:
      return {
        dateFrom: startOfWeek(now, { weekStartsOn: 1 }),
        dateTo: endOfDay(now),
      };

    case RegularPaymentFrequencyFilter.Month:
      return { dateFrom: startOfMonth(now), dateTo: endOfDay(now) };

    case RegularPaymentFrequencyFilter.Year:
      return { dateFrom: startOfYear(now), dateTo: endOfDay(now) };

    default:
      return { dateFrom: startOfDay(now), dateTo: endOfDay(now) };
  }
}
