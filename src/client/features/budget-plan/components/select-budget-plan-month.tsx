import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiTitle } from '@frontend/ui/ui-text/ui-title';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';
import type { SelectBudgetPlanMonthProps } from './props/select-budget-plan-month.props';
import { MonthSvg } from '@frontend/features/budget-plan/constants/month-svg';
import { useSelectedBudgetPlan } from '@frontend/features/budget-plan/hooks/selected-budget-plan.hook';
import { useMonthTitles } from '@frontend/shared/i18n/use-month-titles.hook';
import { useTranslations } from 'next-intl';

export function SelectBudgetPlanMonth({
  onSelect,
  month,
  year,
  disabled = false,
  selected = false,
}: SelectBudgetPlanMonthProps) {
  const { now } = useSelectedBudgetPlan();
  const monthTitles = useMonthTitles();
  const t = useTranslations('budgetPlan.monthCell');

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

      <UiTitle size="default">{monthTitles[month].slice(0, 3)}</UiTitle>

      {isCurrentMonth && !disabled && <UiDescription size="sm">{t('edit')}</UiDescription>}
      {!isCurrentMonth && !disabled && <UiDescription size="sm">{t('view')}</UiDescription>}
      {disabled && <UiDescription size="sm">{t('notYet')}</UiDescription>}
    </UiButton>
  );
}
