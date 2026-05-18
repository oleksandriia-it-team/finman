import { startOfDay, endOfDay, subDays } from 'date-fns';
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
        dateFrom: startOfDay(subDays(now, 6)),
        dateTo: endOfDay(now),
      };

    case RegularPaymentFrequencyFilter.Month:
      return { dateFrom: startOfDay(subDays(now, 29)), dateTo: endOfDay(now) };

    case RegularPaymentFrequencyFilter.Year:
      return { dateFrom: startOfDay(subDays(now, 364)), dateTo: endOfDay(now) };

    default:
      return { dateFrom: startOfDay(now), dateTo: endOfDay(now) };
  }
}
