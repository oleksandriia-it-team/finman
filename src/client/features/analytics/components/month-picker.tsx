'use client';

import { useEffect, useState } from 'react';
import { isSameMonth } from 'date-fns';
import { fromMonthYear, toMonthYear } from '@common/domains/analytics/utils/to-month-year.util';
import { MonthGridPopover } from '@frontend/features/analytics/components/month-grid-popover';
import type { MonthVariant } from '@frontend/features/analytics/components/props/month-grid-popover.props';
import type { MonthPickerProps } from '@frontend/features/analytics/components/props/month-picker.props';
import { useFormatMonthYear } from '@frontend/shared/i18n/use-month-titles.hook';
import { useTranslations } from 'next-intl';

export function MonthPicker({ value, onChange }: MonthPickerProps) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => fromMonthYear(value));
  const formatMonthYear = useFormatMonthYear();
  const t = useTranslations('analytics.picker');

  useEffect(() => {
    if (open) setViewDate(fromMonthYear(value));
  }, [open, value]);

  const selectedDate = fromMonthYear(value);

  const handleMonthClick = (clicked: Date) => {
    onChange(toMonthYear(clicked));
    setOpen(false);
  };

  const getVariant = (test: Date): MonthVariant => (isSameMonth(test, selectedDate) ? 'primary' : 'default');

  return (
    <MonthGridPopover
      open={open}
      onOpenChange={setOpen}
      triggerLabel={formatMonthYear(value)}
      headerLabel={t('month')}
      viewDate={viewDate}
      onViewDateChange={setViewDate}
      getMonthVariant={getVariant}
      onMonthClick={handleMonthClick}
    />
  );
}
