'use client';

import '@frontend/entities/operations/selectable-card/selectable-regular-card/selectable-card.scss';
import { cn } from '@frontend/shared/utils/cn.util';
import { IncomeExpenseCard } from '@frontend/entities/operations/income-expense-card/card/income-expense-card';
import { SelectableCardCheckbox } from '@frontend/entities/operations/selectable-card/checkbox/selectable-card-checkbox';
import type { SelectableRegularCardProps } from '@frontend/entities/operations/selectable-card/selectable-regular-card/selectable-card-props';

export function SelectableRegularCard({ item, selected, onToggle, dimmed = false }: SelectableRegularCardProps) {
  const handleClick = () => onToggle(item.id);

  return (
    <div
      className={cn(
        'selectable-regular-card',
        selected && 'selectable-regular-card-selected',
        dimmed && 'selectable-regular-card-dimmed',
      )}
      onClick={handleClick}
      role="checkbox"
      aria-checked={selected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="selectable-regular-card-overlay" />

      <SelectableCardCheckbox
        selected={selected}
        className="selectable-regular-card-checkbox"
      />

      <IncomeExpenseCard
        showActions={false}
        {...item}
      />
    </div>
  );
}
