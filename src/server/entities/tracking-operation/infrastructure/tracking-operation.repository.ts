import { CrudApiRepository } from '@backend/database/crud.api.repository';
import { TrackingOperationOrm } from '@backend/entities/tracking-operation/infrastructure/tracking-operation.orm';
import type { TrackingOperationApiFilter } from '@backend/entities/tracking-operation/domain/tracking-operation-api.filter';
import { Between, type FindOptionsWhere, ILike, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import type { DeepPartial } from '@common/models/deep-partial.model';

function escapeLike(value: string) {
  return value.replace(/[\\%_]/g, '\\$&');
}

export class TrackingOperationRepository extends CrudApiRepository<TrackingOperationOrm, TrackingOperationApiFilter> {
  protected override mapFilters(
    filters: DeepPartial<TrackingOperationApiFilter> | undefined,
  ): FindOptionsWhere<TrackingOperationOrm> | FindOptionsWhere<TrackingOperationOrm>[] {
    const where: FindOptionsWhere<TrackingOperationOrm> = {};
    if (!filters) {
      return where;
    }
    if (filters.userId !== undefined) {
      where.userId = filters.userId;
    }
    if (filters.type) {
      where.type = filters.type;
    }
    if (filters.category) {
      where.category = filters.category;
    }
    if (filters.softDeleted !== undefined) {
      where.softDeleted = filters.softDeleted;
    }
    if (filters.dateFrom && filters.dateTo) {
      where.date = Between(filters.dateFrom as Date, filters.dateTo as Date);
    } else if (filters.dateFrom) {
      where.date = MoreThanOrEqual(filters.dateFrom as Date);
    } else if (filters.dateTo) {
      where.date = LessThanOrEqual(filters.dateTo as Date);
    }

    // Exact match is dropped if a range parameter is populated.
    if (filters.minSum !== undefined && filters.maxSum !== undefined) {
      where.sum = Between(filters.minSum, filters.maxSum);
    } else if (filters.minSum !== undefined) {
      where.sum = MoreThanOrEqual(filters.minSum);
    } else if (filters.maxSum !== undefined) {
      where.sum = LessThanOrEqual(filters.maxSum);
    }

    if (filters.search) {
      return this.buildSearchWhereClauses(where, filters.search);
    }

    return where;
  }

  private buildSearchWhereClauses(
    baseWhere: FindOptionsWhere<TrackingOperationOrm>,
    searchString: string,
  ): FindOptionsWhere<TrackingOperationOrm>[] {
    const search = `%${escapeLike(searchString)}%`;
    return [
      { ...baseWhere, title: ILike(search) },
      { ...baseWhere, description: ILike(search) },
    ];
  }
}

export const trackingOperationRepository = new TrackingOperationRepository(TrackingOperationOrm);
