import type { BudgetPlanTitleProps } from '@frontend/entities/budget-plan/components/props/budget-plan-title.props';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { isSameMonth } from 'date-fns';
import { useMemo } from 'react';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';
import { UiTitle } from '@frontend/ui/ui-text/ui-title';
import { MonthTitles } from '@common/constants/month-titles.constant';

export function BudgetPlanTitle({ selected }: BudgetPlanTitleProps) {
  const now = useMemo(() => new Date(), []);

  const isCurrentMonthAndYear = isSameMonth(selected.month, now);

  return (
    <div className="flex flex-col gap-1">
      <UiDescription
        className="flex gap-2"
        size="sm"
      >
        <UiSvgIcon name="calendar" />

        {isCurrentMonthAndYear && 'Поточний план'}
        {!isCurrentMonthAndYear && 'План'}
      </UiDescription>

      <UiTitle size="xl">
        {MonthTitles[selected.month]} {selected.year}
      </UiTitle>
    </div>
  );
}
