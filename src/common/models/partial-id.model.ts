import type { DefaultColumnKeys, DefaultTableColumns } from '@common/models/default-table-columns.model';

export type PartialIdModel<T extends DefaultTableColumns> = Omit<T, DefaultColumnKeys> & {
  id?: number;
};
