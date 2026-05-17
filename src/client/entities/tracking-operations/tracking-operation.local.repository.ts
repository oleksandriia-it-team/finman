import { CrudLocalRepository } from '../../database/crud/crud.local.repository';
import { type DatabaseLocalService, databaseLocalService } from '../../database/database.local.service';
import { Tables } from '@frontend/shared/constants/database.constants';
import type { TrackingOperationRecord } from '@common/records/tracking-operation.record';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';
import type { TrackingOperationFilter } from '@common/domains/tracking-operation/filter/tracking-operation.filter';
import type { FilterPredicate } from '@frontend/shared/models/local-filter.model';
import type { DeepPartial } from '@common/models/deep-partial.model';
import type {
  GetBasicInformationResponse,
  ITrackingOperationRepository,
} from '@common/domains/tracking-operation/models/tracking-operation.repository.model';
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

  async updateItem(id: number, data: Omit<TrackingOperationRecord, DefaultColumnKeys>): Promise<void> {
    await this.databaseLocalService.updateOrCreateItem(this.tableName, { ...data, id });
    return;
  }

  deleteItem(id: number): Promise<void> {
    return this.databaseLocalService.deleteItem(this.tableName, id, false);
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

  async getBasicInformation(filters?: DeepPartial<TrackingOperationFilter>): Promise<GetBasicInformationResponse> {
    // statistic always ignores the type filter; maxSum respects it
    const statPredicates = this.mapFilters({ ...filters, type: undefined });
    const maxPredicates = filters?.type ? this.mapFilters(filters) : statPredicates;
    const sharedPredicates = maxPredicates === statPredicates;

    let maxSum = 0;
    let totalIncomes = 0;
    let totalOutcomes = 0;

    await this.table
      .filter((item: TrackingOperationRecord) => statPredicates.every((fn) => fn(item)))
      .each((item: TrackingOperationRecord) => {
        if (item.type === TypeEntry.Income) {
          totalIncomes += item.sum;
        } else {
          totalOutcomes += item.sum;
        }
        if (sharedPredicates || maxPredicates.every((fn) => fn(item))) {
          if (item.sum > maxSum) maxSum = item.sum;
        }
      });

    const totalCount = await this.getTotalCount(filters);

    return { totalIncomes, totalOutcomes, maxSum, totalCount };
  }
}

export const trackingOperationLocalRepository = new TrackingOperationLocalRepository(databaseLocalService);
