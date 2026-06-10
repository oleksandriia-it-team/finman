import { Month } from '@common/enums/month.enum';

/** Translation keys (under `months.*` namespace) for each month. */
export const MonthTitleKeys: Record<Month, string> = {
  [Month.January]: 'january',
  [Month.February]: 'february',
  [Month.March]: 'march',
  [Month.April]: 'april',
  [Month.May]: 'may',
  [Month.June]: 'june',
  [Month.July]: 'july',
  [Month.August]: 'august',
  [Month.September]: 'september',
  [Month.October]: 'october',
  [Month.November]: 'november',
  [Month.December]: 'december',
};

/** Translation keys (under `weekdays.*` namespace) for each weekday index (0=Sun..6=Sat). */
export const WeekTitleKeys: Record<number, string> = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
};
