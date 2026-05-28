import type { EntryBase } from '@common/records/entry.record';

export interface SelectTransactionCardProps {
  entry: EntryBase;
  isSelected: boolean;
  onSelect: (entryId: number) => void;
}
