import { RegularEntryFilter } from '@common/domains/regular-entry/filter/regular-entry.filter';

export interface RegularEntryApiFilter extends RegularEntryFilter {
  userId: number;
}
