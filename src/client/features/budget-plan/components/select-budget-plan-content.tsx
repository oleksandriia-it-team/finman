import { useMemo, useState } from 'react';
import type { Month } from '@common/enums/month.enum';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { UiTitle } from '@frontend/ui/ui-text/ui-title';
import type { SelectBudgetPlanContentProps } from '@frontend/features/budget-plan/components/props/select-budget-plan-content.props';
import { SelectBudgetPlanMonth } from '@frontend/features/budget-plan/components/select-budget-plan-month';

export function SelectBudgetPlanContent({ onSelect, selected }: SelectBudgetPlanContentProps) {
  const months = useMemo(() => Array.from({ length: 12 }).map((_, i) => i as unknown as Month), []);
  const [showYear, setShowYear] = useState<number>(selected.year);

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
          disabled={showYear === new Date().getFullYear()}
          onClick={() => setShowYear((prev) => prev + 1)}
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {months.map((month) => (
          <SelectBudgetPlanMonth
            key={month}
            month={month}
            year={showYear}
            selected={selected.month === month && selected.year === showYear}
            onSelect={(month) => onSelect({ month, year: showYear })}
          />
        ))}
      </div>
    </div>
  );
}
