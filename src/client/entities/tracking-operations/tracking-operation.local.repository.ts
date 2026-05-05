import { CrudLocalRepository } from '../../database/crud/crud.local.repository';
import { type DatabaseLocalService, databaseLocalService } from '../../database/database.local.service';
import { Tables } from '@frontend/shared/constants/database.constants';
import type { TrackingOperationRecord } from '@common/records/tracking-operation.record';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';
import type { TrackingOperationFilter } from '@common/domains/tracking-operation/filter/tracking-operation.filter';
import type { FilterPredicate } from '@frontend/shared/models/local-filter.model';
import type { DeepPartial } from '@common/models/deep-partial.model';
import type {
  GetTrackingOperationStatisticResponse,
  ITrackingOperationRepository,
} from '@common/domains/tracking-operation/models/tracking-operation.repository.model';
import type { TrackingOperationStatisticDto } from '@common/domains/tracking-operation/schema/tracking-operation.schema';
import { TypeEntry } from '@common/enums/entry.enum';

export class TrackingOperationLocalRepository
  extends CrudLocalRepository<TrackingOperationRecord, TrackingOperationFilter>
  implements ITrackingOperationRepository
{
  constructor(databaseLocalService: DatabaseLocalService) {
    super(databaseLocalService, Tables.TrackingOperationsTable.name);
  }

  createItem(data: Omit<TrackingOperationRecord, DefaultColumnKeys>): Promise<number> {
    return this.databaseLocalService.updateOrCreateItem(this.tableName, data);
  }

  async updateItem(id: number, data: Omit<TrackingOperationRecord, DefaultColumnKeys>): Promise<true> {
    return this.databaseLocalService.updateOrCreateItem(this.tableName, { ...data, id }).then(() => true as const);
  }

  deleteItem(id: number): Promise<true> {
    return this.databaseLocalService.deleteItem(this.tableName, id, true);
  }

  protected override mapFilters(
    filters: DeepPartial<TrackingOperationFilter> | undefined,
  ): FilterPredicate<TrackingOperationRecord>[] {
    const predicates: FilterPredicate<TrackingOperationRecord>[] = [];
    if (!filters) return predicates;

    if (filters.type) {
      predicates.push((item) => item.type === filters.type);
    }
    if (filters.category) {
      predicates.push((item) =>
        Array.isArray(filters.category) ? filters.category.includes(item.category) : filters.category === item.category,
      );
    }
    if (filters.softDeleted !== undefined) {
      predicates.push((item) => item.softDeleted === filters.softDeleted);
    }
    if (filters.dateFrom) {
      const dateFrom = filters.dateFrom;
      predicates.push((item) => new Date(item.date) >= dateFrom);
    }
    if (filters.dateTo) {
      const dateTo = filters.dateTo;
      predicates.push((item) => new Date(item.date) <= dateTo);
    }
    if (filters.minSum !== undefined) {
      const minSum = filters.minSum;
      predicates.push((item) => item.sum >= minSum);
    }
    if (filters.maxSum !== undefined) {
      const maxSum = filters.maxSum;
      predicates.push((item) => item.sum <= maxSum);
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      predicates.push(
        (item) =>
          item.title.toLowerCase().includes(search) || (item.description?.toLowerCase().includes(search) ?? false),
      );
    }

    return predicates;
  }

  override async getItems(
    from: number,
    to: number,
    filters?: DeepPartial<TrackingOperationFilter> | undefined,
  ): Promise<TrackingOperationRecord[]> {
    return super.getItems(from, to, filters, { name: 'date', sort: 'DESC' });
  }

  async getMaxSum(): Promise<number> {
    const all = await this.table.filter((item: TrackingOperationRecord) => !item.softDeleted).toArray();
    return all.reduce((max: number, item: TrackingOperationRecord) => Math.max(max, item.sum), 0);
  }

  async getStatistic(input: TrackingOperationStatisticDto): Promise<GetTrackingOperationStatisticResponse> {
    const { dateFrom, dateTo } = input;

    const items = await this.table
      .filter((item: TrackingOperationRecord) => {
        if (item.softDeleted) return false;
        const date = new Date(item.date);
        if (dateFrom && date < dateFrom) return false;
        if (dateTo && date > dateTo) return false;
        return true;
      })
      .toArray();

    return items.reduce(
      (acc: GetTrackingOperationStatisticResponse, item: TrackingOperationRecord) => {
        if (item.type === TypeEntry.Income) {
          acc.totalIncomes += item.sum;
        } else {
          acc.totalOutcomes += item.sum;
        }
        return acc;
      },
      { totalIncomes: 0, totalOutcomes: 0 },
    );
  }
}

export const trackingOperationLocalRepository = new TrackingOperationLocalRepository(databaseLocalService);
