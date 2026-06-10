import type { RegularEntryFilter } from '@common/domains/regular-entry/filter/regular-entry.filter';
import type { RegularEntry } from '@common/records/regular-entry.record';
import type { ICrudService } from '@common/models/crud-service.model';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';

export interface FindRegularEntryByTitleInput {
  title: string;
  userId?: number;
}

export type RegularEntryCreateDTO = Omit<RegularEntry, DefaultColumnKeys>;
export type RegularEntryUpdateDTO = Omit<RegularEntry, DefaultColumnKeys | 'sum'>;

export interface IRegularEntryRepository extends ICrudService<
  RegularEntry,
  RegularEntryCreateDTO,
  RegularEntryFilter,
  RegularEntryUpdateDTO
> {
  findByTitle(input: FindRegularEntryByTitleInput): Promise<RegularEntry | null>;
}
