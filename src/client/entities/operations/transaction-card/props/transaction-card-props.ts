import type { RegularEntry } from '@common/records/regular-entry.record';
import type { AllCategories } from '@common/enums/categories.enum';

export type TransactionCardProps = Partial<RegularEntry> & {
  icon?: string;
  className?: string;
  bgNone?: boolean;
  check?: string;
  handleDelete?: (id: number) => void;
  category?: AllCategories;
};
