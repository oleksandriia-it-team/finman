import type { SelectTransactionCardProps } from '@frontend/entities/operations/select-transaction-card/props/select-transaction-card.props';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiTitle } from '@frontend/ui/ui-text/ui-title';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';
import { CategoriesMapping } from '@frontend/shared/styles/card-styles-mappings';
import { UiIconBadge } from '@frontend/ui/ui-icon-badge/ui-icon-badge';

export function SelectTransactionCard({ onSelect, isSelected, entry }: SelectTransactionCardProps) {
  const handleSelect = () => onSelect(entry.id);

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(
        'p-3 flex gap-3 items-center cursor-pointer rounded-2xl hover:bg-primary-muted transition-all ',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        isSelected && 'bg-primary-muted border border-primary',
      )}
      onClick={handleSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleSelect();
        }
      }}
    >
      <UiIconBadge
        variant={isSelected ? 'primary' : 'default'}
        className="h-fit"
        name={CategoriesMapping[entry.category].icon}
      />

      <div className="flex flex-col">
        <UiTitle size="sm">{entry.title}</UiTitle>

        <UiDescription size="xs">{entry.description}</UiDescription>
      </div>
    </div>
  );
}
