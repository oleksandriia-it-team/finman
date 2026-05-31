import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { MonthTitles } from '@common/constants/month-titles.constant';
import { UiTitle } from '@frontend/ui/ui-text/ui-title';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';
import type { SelectBudgetPlanMonthProps } from './props/select-budget-plan-month.props';
import { MonthSvg } from '@frontend/features/budget-plan/constants/month-svg';
import { useSelectedBudgetPlan } from '@frontend/features/budget-plan/hooks/selected-budget-plan.hook';

export function SelectBudgetPlanMonth({
  onSelect,
  month,
  year,
  disabled = false,
  selected = false,
}: SelectBudgetPlanMonthProps) {
  const { now } = useSelectedBudgetPlan();

  const isCurrentMonth = month === now.month && year === now.year;

  const Icon = MonthSvg[month];

  return (
    <UiButton
      type="button"
      onClick={() => onSelect(month)}
      size="default"
      heightAuto
      opacity={!selected}
      disabled={disabled}
      variant={selected ? 'primary-muted' : 'muted'}
      className="flex flex-col gap-1 justify-center"
    >
      <Icon className="size-8" />

      <UiTitle size="default">{MonthTitles[month].slice(0, 3)}</UiTitle>

      {isCurrentMonth && !disabled && <UiDescription size="sm">Редагувати</UiDescription>}
      {!isCurrentMonth && !disabled && <UiDescription size="sm">Перегляд</UiDescription>}
      {disabled && <UiDescription size="sm">Не настав час</UiDescription>}
    </UiButton>
  );
}
