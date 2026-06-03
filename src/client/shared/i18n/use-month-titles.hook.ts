'use client';

import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { type Month } from '@common/enums/month.enum';
import { MonthTitleKeys, WeekTitleKeys } from '@common/constants/month-titles.constant';

/** Returns a Record<Month, string> with the localized month names. */
export function useMonthTitles(): Record<Month, string> {
  const t = useTranslations('months');
  return useMemo(
    () =>
      Object.entries(MonthTitleKeys).reduce<Record<Month, string>>(
        (acc, [month, key]) => {
          acc[Number(month) as Month] = t(key);
          return acc;
        },
        {} as Record<Month, string>,
      ),
    [t],
  );
}

/** Returns a Record<weekdayIndex, string> with the localized weekday names. */
export function useWeekTitles(): Record<number, string> {
  const t = useTranslations('weekdays');
  return useMemo(
    () =>
      Object.entries(WeekTitleKeys).reduce<Record<number, string>>((acc, [weekday, key]) => {
        acc[Number(weekday)] = t(key);
        return acc;
      }, {}),
    [t],
  );
}

export const ShortMonthLength = 3;

export type MonthYearFormat = 'short' | 'long';

/** Hook returning a formatter that produces a localized "Month Year" string. */
export function useFormatMonthYear() {
  const monthTitles = useMonthTitles();
  return useMemo(
    () =>
      ({ month, year }: { month: Month; year: number }, mode: MonthYearFormat = 'long'): string => {
        const name = mode === 'short' ? monthTitles[month].slice(0, ShortMonthLength) : monthTitles[month];
        return `${name} ${year}`;
      },
    [monthTitles],
  );
}
