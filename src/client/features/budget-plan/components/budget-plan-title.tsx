import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';
import { UiTitle } from '@frontend/ui/ui-text/ui-title';
import type { BudgetPlanTitleProps } from '@frontend/features/budget-plan/components/props/budget-plan-title.props';
import { useSelectedBudgetPlan } from '@frontend/features/budget-plan/hooks/selected-budget-plan.hook';
import { isCurrentMonth } from '@common/domains/budget-plan/is-current-month.util';
import { useMonthTitles } from '@frontend/shared/i18n/use-month-titles.hook';
import { useTranslations } from 'next-intl';

export function BudgetPlanTitle({ selected }: BudgetPlanTitleProps) {
  const { now } = useSelectedBudgetPlan();
  const monthTitles = useMonthTitles();
  const t = useTranslations('budgetPlan.title');

  const isCurrentMonthAndYear = isCurrentMonth(selected, now);

  return (
    <div className="flex flex-col gap-1 px-3">
      <UiDescription
        className="flex gap-2"
        size="xxs"
      >
        <UiSvgIcon name="calendar" />

        {isCurrentMonthAndYear ? t('current') : t('plan')}
      </UiDescription>

      <UiTitle
        size="lg"
        className="w-fit"
      >
        {monthTitles[selected.month]} {selected.year}
      </UiTitle>
    </div>
  );
}
