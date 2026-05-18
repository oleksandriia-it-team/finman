import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { MonthTitles } from '@common/constants/month-titles.constant';
import { UiTitle } from '@frontend/ui/ui-text/ui-title';
import { useMemo } from 'react';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';
import type { SelectBudgetPlanMonthProps } from './props/select-budget-plan-month.props';
import { MonthSvg } from '@frontend/features/budget-plan/constants/month-svg';

export function SelectBudgetPlanMonth({ onSelect, month, year, selected = false }: SelectBudgetPlanMonthProps) {
  const now = useMemo(() => new Date(), []);

  const isCurrentMonth = month === now.getMonth() && year === now.getFullYear();

  const Icon = MonthSvg[month];

  return (
    <UiButton
      type="button"
      onClick={() => onSelect(month)}
      size="default"
      heightAuto
      opacity={!selected}
      variant={selected ? 'primary-muted' : 'muted'}
      className="flex flex-col gap-1 justify-center"
    >
      <Icon className="size-8" />

      <UiTitle size="default">{MonthTitles[month].slice(0, 3)}</UiTitle>

      {isCurrentMonth && <UiDescription size="sm">Редагувати</UiDescription>}
      {!isCurrentMonth && <UiDescription size="sm">Перегляд</UiDescription>}
    </UiButton>
  );
}
