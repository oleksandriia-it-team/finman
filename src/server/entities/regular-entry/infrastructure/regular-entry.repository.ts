import { CrudApiRepository } from '@backend/database/crud.api.repository';
import { RegularEntryOrm } from '@backend/entities/regular-entry/infrastructure/regular-entry.orm';
import { type DeepPartial } from '@common/models/deep-partial.model';
import { type FindOptionsWhere } from 'typeorm';
import { type RegularEntryApiFilter } from '@backend/entities/regular-entry/domain/regular-entry-api.filter';
import type {
  FindRegularEntryByTitleInput,
  IRegularEntryRepository,
} from '@common/domains/regular-entry/models/regular-entry-repository.model';
import type { RegularEntry } from '@common/records/regular-entry.record';
import { isEmpty } from '@common/utils/is-empty.util';

export class RegularEntryApiRepository
  extends CrudApiRepository<RegularEntryOrm, RegularEntryApiFilter>
  implements IRegularEntryRepository
{
  protected override mapFilters(
    filters: DeepPartial<RegularEntryApiFilter> | undefined,
  ): FindOptionsWhere<RegularEntryOrm> {
    const where: FindOptionsWhere<RegularEntryOrm> = {};

    if (!filters) {
      return where;
    }

    if (filters.userId) {
      where.userId = filters.userId;
    }

    if (filters.type) {
      where.type = filters.type;
    }

    if (filters.softDeleted !== undefined) {
      where.softDeleted = filters.softDeleted;
    }

    return where;
  }

  findByTitle({ userId, title }: FindRegularEntryByTitleInput): Promise<RegularEntry | null> {
    return this.repository.findOne({ where: isEmpty(userId) ? { title } : { title, userId } });
  }
}

export const regularEntryApiRepository = new RegularEntryApiRepository(RegularEntryOrm);
