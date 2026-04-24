import type { RegularEntry } from '@common/records/regular-entry.record';

export interface TransactionCardProps extends Partial<RegularEntry> {
  name?: string;
  className?: string;
  bgNone?: boolean;
  check?: string;
}
