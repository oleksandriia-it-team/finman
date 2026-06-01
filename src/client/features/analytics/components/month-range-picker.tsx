'use client';

import { useEffect, useState } from 'react';
import { isSameMonth, isWithinInterval } from 'date-fns';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { formatMonthYear } from '@common/domains/analytics/utils/format-month-year.util';
import { fromMonthYear, toMonthYear } from '@common/domains/analytics/utils/to-month-year.util';
import type { MonthRange } from '@common/domains/analytics/analytics.schema';
import { MonthGridPopover } from '@frontend/features/analytics/components/month-grid-popover';
import type { MonthVariant } from '@frontend/features/analytics/components/props/month-grid-popover.props';
import type { MonthRangePickerProps } from '@frontend/features/analytics/components/props/month-range-picker.props';

function formatTrigger({ dateFrom, dateTo }: MonthRange): string {
  return `${formatMonthYear(dateFrom, 'short')} — ${formatMonthYear(dateTo, 'short')}`;
}

export function MonthRangePicker({ value, onChange }: MonthRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => fromMonthYear(value.dateTo));
  const [from, setFrom] = useState<Date | null>(fromMonthYear(value.dateFrom));
  const [to, setTo] = useState<Date | null>(fromMonthYear(value.dateTo));

  useEffect(() => {
    if (!open) return;
    setFrom(fromMonthYear(value.dateFrom));
    setTo(fromMonthYear(value.dateTo));
    setViewDate(fromMonthYear(value.dateTo));
  }, [open, value]);

  const handleMonthClick = (clicked: Date) => {
    if (!from || to) {
      setFrom(clicked);
      setTo(null);
      return;
    }
    if (clicked < from) {
      setTo(from);
      setFrom(clicked);
    } else {
      setTo(clicked);
    }
  };

  const getVariant = (test: Date): MonthVariant => {
    if ((from && isSameMonth(test, from)) || (to && isSameMonth(test, to))) return 'primary';
    if (from && to && isWithinInterval(test, { start: from, end: to })) return 'primary-muted';
    return 'default';
  };

  const handleApply = () => {
    if (from && to) {
      onChange({ dateFrom: toMonthYear(from), dateTo: toMonthYear(to) });
    }
    setOpen(false);
  };

  const handleReset = () => {
    setFrom(null);
    setTo(null);
  };

  return (
    <MonthGridPopover
      open={open}
      onOpenChange={setOpen}
      triggerLabel={formatTrigger(value)}
      headerLabel="Період"
      viewDate={viewDate}
      onViewDateChange={setViewDate}
      getMonthVariant={getVariant}
      onMonthClick={handleMonthClick}
      footer={
        <div className="flex justify-between items-center pt-2 border-t border-border">
          <UiButton
            type="button"
            variant="default"
            size="sm"
            onClick={handleReset}
          >
            Скинути
          </UiButton>
          <UiButton
            type="button"
            variant="primary"
            size="sm"
            disabled={!from || !to}
            onClick={handleApply}
          >
            Застосувати
          </UiButton>
        </div>
      }
    />
  );
}
