import type { TypeEntryFilter } from '@common/enums/entry.enum';

export interface TrackingOperationTypeFilterProps {
  active: TypeEntryFilter;
  onSelect: (value: TypeEntryFilter) => void;
}
