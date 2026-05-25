'use client';

import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import './selectable-transaction-card.scss';
import { TransactionCard } from '@frontend/entities/operations/transaction-card/transaction-card';
import type { SelectableRegularCardProps } from '@frontend/entities/operations/selectable-card/selectable-regular-card/selectable-card-props';

export function SelectableTransactionCard({ item, selected, onToggle, dimmed = false }: SelectableRegularCardProps) {
  const handleClick = () => onToggle(item.id);

  const classList = [
    'selectable-transaction-card',
    selected ? 'selectable-transaction-card-selected' : '',
    dimmed ? 'selectable-transaction-card-dimmed' : '',
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
      onKeyDown={(e) => {
        if (e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="selectable-transaction-card-overlay" />

      <div className="selectable-transaction-card-checkbox">
        {selected && (
          <UiSvgIcon
            name="check"
            size="xs"
            className="text-primary-foreground!"
          />
        )}
      </div>

      <TransactionCard
        showActions={false}
        className="pl-8"
        {...item}
      />
    </div>
  );
}
