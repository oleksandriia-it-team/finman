'use client';

import { addYears, startOfMonth, subYears } from 'date-fns';
import { ChartFiltersButton } from '@frontend/components/chart-filters-button/chart-filters-button';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { UiPopover } from '@frontend/ui/ui-popover/ui-popover';
import { UiPopoverContent } from '@frontend/ui/ui-popover/ui-popover-content';
import { UiPopoverTrigger } from '@frontend/ui/ui-popover/ui-popover-trigger';
import { ShortMonthLength } from '@common/domains/analytics/utils/format-month-year.util';
import type { Month } from '@common/enums/month.enum';
import type { MonthGridPopoverProps } from '@frontend/features/analytics/components/props/month-grid-popover.props';
import { useMonthTitles } from '@frontend/shared/i18n/use-month-titles.hook';
import { useTranslations } from 'next-intl';

const MonthsInYear = 12;

export function MonthGridPopover({
  open,
  onOpenChange,
  triggerLabel,
  headerLabel,
  viewDate,
  onViewDateChange,
  getMonthVariant,
  onMonthClick,
  footer,
}: MonthGridPopoverProps) {
  const monthTitles = useMonthTitles();
  const t = useTranslations('analytics.picker');

  return (
    <UiPopover
      open={open}
      onOpenChange={onOpenChange}
    >
      <UiPopoverTrigger asChild>
        <ChartFiltersButton
          icon="calendar4"
          title={triggerLabel}
          size="sm"
        />
      </UiPopoverTrigger>
      <UiPopoverContent className="w-72 flex flex-col gap-3 p-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-muted-foreground uppercase">{headerLabel}</span>
          <div className="flex items-center gap-2">
            <UiIconButton
              icon="chevron-left"
              size="sm"
              variant="muted-foreground"
              borderNone
              aria-label={t('prevYear')}
              onClick={() => onViewDateChange(subYears(viewDate, 1))}
            />
            <span className="text-sm font-bold">{viewDate.getFullYear()}</span>
            <UiIconButton
              icon="chevron-right"
              size="sm"
              variant="muted-foreground"
              borderNone
              aria-label={t('nextYear')}
              onClick={() => onViewDateChange(addYears(viewDate, 1))}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: MonthsInYear }, (_, i) => {
            const month = i as Month;
            const monthDate = startOfMonth(new Date(viewDate.getFullYear(), month, 1));
            return (
              <UiButton
                key={month}
                type="button"
                size="sm"
                variant={getMonthVariant(monthDate)}
                onClick={() => onMonthClick(monthDate)}
              >
                {monthTitles[month].slice(0, ShortMonthLength)}
              </UiButton>
            );
          })}
        </div>

        {footer}
      </UiPopoverContent>
    </UiPopover>
  );
}
