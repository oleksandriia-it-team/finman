import { UiTabItem } from '@frontend/ui/ui-tab-item/ui-tab-item';
import type { TrackingOperationTypeFilterProps } from '@frontend/entities/operations/tracking-type-picker/tracking-operation-type-filter-props';
import type { TypeEntryFilter } from '@common/enums/entry.enum';
import { TypeEntryLabelsRecord } from '@frontend/entities/operations/tracking-type-picker/type-entry-labels.record';

export function TrackingOperationTypeFilter({ active, onSelect }: TrackingOperationTypeFilterProps) {
  return (
    <div className=" w-full flex flex-row px-4">
      {Object.entries(TypeEntryLabelsRecord).map(([value, label]) => (
        <UiTabItem
          key={value}
          isActive={active === value}
          onClick={() => onSelect(value as TypeEntryFilter)}
        >
          {label}
        </UiTabItem>
      ))}
    </div>
  );
}
