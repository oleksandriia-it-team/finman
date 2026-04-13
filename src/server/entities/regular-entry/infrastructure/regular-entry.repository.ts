import { CrudApiRepository } from '@backend/shared/infrastructure/crud.api.repository';
import { RegularEntryOrm } from '@backend/entities/regular-entry/infrastructure/regular-entry.orm';
import { type DeepPartial } from '@common/models/deep-partial.model';
import { type FindOptionsWhere } from 'typeorm';
import { type RegularEntryApiFilter } from '@backend/entities/regular-entry/domain/regular-entry-api.filter';

export class RegularEntryApiRepository extends CrudApiRepository<RegularEntryOrm, RegularEntryApiFilter> {
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
}

export const regularEntryApiRepository = new RegularEntryApiRepository(RegularEntryOrm);
