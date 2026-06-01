'use client';

import { useEffect, useState } from 'react';
import { isSameMonth } from 'date-fns';
import { formatMonthYear } from '@common/domains/analytics/utils/format-month-year.util';
import { fromMonthYear, toMonthYear } from '@common/domains/analytics/utils/to-month-year.util';
import { MonthGridPopover } from '@frontend/features/analytics/components/month-grid-popover';
import type { MonthVariant } from '@frontend/features/analytics/components/props/month-grid-popover.props';
import type { MonthPickerProps } from '@frontend/features/analytics/components/props/month-picker.props';

export function MonthPicker({ value, onChange }: MonthPickerProps) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => fromMonthYear(value));

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
      headerLabel="Місяць"
      viewDate={viewDate}
      onViewDateChange={setViewDate}
      getMonthVariant={getVariant}
      onMonthClick={handleMonthClick}
    />
  );
}
