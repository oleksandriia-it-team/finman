'use client';

import './selectable-transaction-card.scss';
import { cn } from '@frontend/shared/utils/cn.util';
import { TransactionCard } from '@frontend/entities/operations/transaction-card/transaction-card';
import { SelectableCardCheckbox } from '@frontend/entities/operations/selectable-card/checkbox/selectable-card-checkbox';
import type { SelectableRegularCardProps } from '@frontend/entities/operations/selectable-card/selectable-regular-card/selectable-card-props';

export function SelectableTransactionCard({ item, selected, onToggle, dimmed = false }: SelectableRegularCardProps) {
  const handleClick = () => onToggle(item.id);

  return (
    <div
      className={cn(
        'selectable-transaction-card',
        selected && 'selectable-transaction-card-selected',
        dimmed && 'selectable-transaction-card-dimmed',
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
      <div className="selectable-transaction-card-overlay" />

      <SelectableCardCheckbox
        selected={selected}
        className="selectable-transaction-card-checkbox"
      />

      <TransactionCard
        showActions={false}
        className="pl-8"
        {...item}
      />
    </div>
  );
}
