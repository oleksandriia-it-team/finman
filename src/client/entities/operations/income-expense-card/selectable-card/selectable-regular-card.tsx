'use client';

import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import './styles/selectable-card.scss';
import { IncomeExpenseCard } from '@frontend/entities/operations/income-expense-card/card/income-expense-card';
import type { SelectableRegularCardProps } from '@frontend/entities/operations/income-expense-card/selectable-card/selectable-card-props';

export function SelectableRegularCard({ item, selected, onToggle, dimmed = false }: SelectableRegularCardProps) {
  const handleClick = () => onToggle(item.id);

  const classList = [
    'selectable-regular-card',
    selected ? 'selectable-regular-card-selected' : '',
    dimmed ? 'selectable-regular-card-dimmed' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classList}
      onClick={handleClick}
      role="checkbox"
      aria-checked={selected}
      tabIndex={0}
      onKeyDown={(e) => e.key === ' ' && handleClick()}
    >
      <div className="selectable-regular-card-overlay" />

      <div className="selectable-regular-card-checkbox">
        {selected && (
          <UiSvgIcon
            name="check"
            size="xs"
            className={selected ? 'text-primary-foreground!' : ''}
          />
        )}
      </div>

      <IncomeExpenseCard
        actions={false}
        {...item}
      />
    </div>
  );
}
