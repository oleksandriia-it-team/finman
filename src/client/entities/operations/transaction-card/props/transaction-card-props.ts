import type { RegularEntry } from '@common/records/regular-entry.record';

export type TransactionCardProps = Partial<RegularEntry> & {
  icon?: string;
  className?: string;
  bgNone?: boolean;
  check?: string;
  handleDelete?: (id: number) => void;
};
