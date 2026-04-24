import { CrudApiRepository } from '@backend/database/crud.api.repository';
import { TrackingOperationOrm } from '@backend/entities/tracking-operation/infrastructure/tracking-operation.orm';
import type { TrackingOperationApiFilter } from '@backend/entities/tracking-operation/domain/tracking-operation-api.filter';
import { Between, type FindOptionsWhere, ILike, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import type { DeepPartial } from '@common/models/deep-partial.model';

export class TrackingOperationRepository extends CrudApiRepository<TrackingOperationOrm, TrackingOperationApiFilter> {
  protected override mapFilters(
    filters: DeepPartial<TrackingOperationApiFilter> | undefined,
  ): FindOptionsWhere<TrackingOperationOrm> {
    const where: FindOptionsWhere<TrackingOperationOrm> = {};

    if (!filters) {
      return where;
    }

    if (filters.userId) {
      where.userId = filters.userId;
    }

    if (filters.type) {
      where.type = filters.type;
    }

    if (filters.sum) {
      where.sum = filters.sum;
    }

    if (filters.category) {
      where.category = filters.category;
    }

    if (filters.softDeleted !== undefined) {
      where.softDeleted = filters.softDeleted;
    }

    if (filters.startDate && filters.endDate) {
      where.date = Between(filters.startDate as Date, filters.endDate as Date);
    } else if (filters.startDate) {
      where.date = MoreThanOrEqual(filters.startDate as Date);
    } else if (filters.endDate) {
      where.date = LessThanOrEqual(filters.endDate as Date);
    }

    if (filters.minSum !== undefined && filters.maxSum !== undefined) {
      where.sum = Between(filters.minSum, filters.maxSum);
    } else if (filters.minSum !== undefined) {
      where.sum = MoreThanOrEqual(filters.minSum);
    } else if (filters.maxSum !== undefined) {
      where.sum = LessThanOrEqual(filters.maxSum);
    }

    return where;
  }

  async searchItem(
    from: number,
    to: number,
    filters: DeepPartial<TrackingOperationApiFilter>,
  ): Promise<TrackingOperationOrm[]> {
    const baseWhere = this.mapFilters(filters);
    const search = filters.search ? `%${filters.search}%` : undefined;

    if (!search) {
      return this.getItems(from, to, filters);
    }

    return this.repository.find({
      where: [
        { ...baseWhere, title: ILike(search) },
        { ...baseWhere, description: ILike(search) },
      ],
      skip: from - 1,
      take: to - from + 1,
    });
  }
  async getTotalCountWithSearch(filters: DeepPartial<TrackingOperationApiFilter>): Promise<number> {
    const baseWhere = this.mapFilters(filters);
    const search = filters?.search ? `%${filters.search}%` : undefined;

    if (!search) {
      return this.getTotalCount(filters);
    }
    return this.repository.count({
      where: [
        { ...baseWhere, title: ILike(search) },
        { ...baseWhere, description: ILike(search) },
      ],
    });
  }
}
export const trackingOperationRepository = new TrackingOperationRepository(TrackingOperationOrm);
