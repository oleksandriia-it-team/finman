import { useMemo, useState } from 'react';
import { Month } from '@common/enums/month.enum';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { UiTitle } from '@frontend/ui/ui-text/ui-title';
import type { SelectBudgetPlanContentProps } from '@frontend/features/budget-plan/components/props/select-budget-plan-content.props';
import { SelectBudgetPlanMonth } from '@frontend/features/budget-plan/components/select-budget-plan-month';
import { useSelectedBudgetPlan } from '@frontend/features/budget-plan/hooks/selected-budget-plan.hook';
import { useDisabledMonthsToSelect } from '@frontend/features/budget-plan/hooks/disabled-months-to-select.hook';
import { isCurrentMonth } from '@common/domains/budget-plan/is-current-month.util';

export function SelectBudgetPlanContent({ onSelect, selected }: SelectBudgetPlanContentProps) {
  const months = useMemo(() => Object.values(Month), []);
  const [showYear, setShowYear] = useState<number>(selected.year);
  const disabledMonths = useDisabledMonthsToSelect();
  const { now } = useSelectedBudgetPlan();

  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="flex justify-between">
        <UiIconButton
          size="sm"
          isOutlined={false}
          bgNone={false}
          variant="primary"
          icon="chevron-left"
          onClick={() => setShowYear((prev) => prev - 1)}
        />

        <UiTitle size="lg">{showYear}</UiTitle>

        <UiIconButton
          size="sm"
          isOutlined={false}
          bgNone={false}
          variant="primary"
          icon="chevron-right"
          disabled={showYear === now.year}
          onClick={() => setShowYear((prev) => prev + 1)}
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {months.map((month) => (
          <SelectBudgetPlanMonth
            key={month}
            month={month}
            year={showYear}
            disabled={disabledMonths.includes(month)}
            selected={isCurrentMonth(selected, { month, year: showYear })}
            onSelect={(month) => onSelect({ month, year: showYear })}
          />
        ))}
      </div>
    </div>
  );
}
