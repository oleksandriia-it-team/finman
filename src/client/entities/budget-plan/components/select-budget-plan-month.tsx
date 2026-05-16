import type { SelectBudgetPlanMonthProps } from '@frontend/entities/budget-plan/components/props/select-budget-plan-month.props';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { MonthTitles } from '@common/constants/month-titles.constant';
import { UiTitle } from '@frontend/ui/ui-text/ui-title';
import { useMemo } from 'react';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';

export function SelectBudgetPlanMonth({ onSelect, month, year, selected = false }: SelectBudgetPlanMonthProps) {
  const now = useMemo(() => new Date(), []);

  return (
    <UiButton
      type="button"
      onClick={() => onSelect(month)}
      size="default"
      heightAuto
      variant={selected ? 'primary' : 'muted-foreground'}
      className="flex flex-col gap-1 justify-center"
    >
      <UiTitle>{MonthTitles[month].slice(0, 3)}</UiTitle>

      {month === now.getMonth() && year === now.getFullYear() && <UiDescription>Редагувати</UiDescription>}
      {month === now.getMonth() && year === now.getFullYear() && <UiDescription>Перегляд</UiDescription>}
    </UiButton>
  );
}
