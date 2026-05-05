import type { AuthTokenService } from '@frontend/shared/services/user-information/auth-token.service';
import { authTokenService } from '@frontend/shared/services/user-information/auth-token.service';
import { trackingOperationLocalRepository } from '@frontend/entities/tracking-operations/tracking-operation.local.repository';
import { trackingOperationsApiClient } from '@frontend/entities/tracking-operations/tracking-operations.api.client';
import type {
  GetTrackingOperationStatisticResponse,
  ITrackingOperationRepository,
} from '@common/domains/tracking-operation/models/tracking-operation.repository.model';
import type { TrackingOperationRecord } from '@common/records/tracking-operation.record';
import type { TrackingOperationFilter } from '@common/domains/tracking-operation/filter/tracking-operation.filter';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';
import type { DeepPartial } from '@common/models/deep-partial.model';
import type { TrackingOperationStatisticDto } from '@common/domains/tracking-operation/schema/tracking-operation.schema';

export class TrackingOperationDataSource implements ITrackingOperationRepository {
  constructor(
    private readonly authTokenService: AuthTokenService,
    private readonly local: ITrackingOperationRepository,
    private readonly apiClient: ITrackingOperationRepository,
  ) {}

  private get source(): ITrackingOperationRepository {
    return this.isOfflineMode ? this.local : this.apiClient;
  }

  get isOfflineMode(): boolean {
    return !this.authTokenService.getAccessToken();
  }

  getItemById(id: number): Promise<TrackingOperationRecord | null> {
    return this.source.getItemById(id);
  }

  getItems(
    from: number,
    to: number,
    filters?: DeepPartial<TrackingOperationFilter>,
  ): Promise<TrackingOperationRecord[]> {
    return this.source.getItems(from, to, filters);
  }

  createItem(data: Omit<TrackingOperationRecord, DefaultColumnKeys>): Promise<number> {
    return this.source.createItem(data);
  }

  updateItem(id: number, data: Omit<TrackingOperationRecord, DefaultColumnKeys>): Promise<true> {
    return this.source.updateItem(id, data);
  }

  deleteItem(id: number): Promise<true> {
    return this.source.deleteItem(id);
  }

  getTotalCount(filters?: DeepPartial<TrackingOperationFilter>): Promise<number> {
    return this.source.getTotalCount(filters);
  }

  getStatistic(
    input: TrackingOperationStatisticDto & { userId?: number },
  ): Promise<GetTrackingOperationStatisticResponse> {
    return this.source.getStatistic(input);
  }

  getMaxSum(userId?: number): Promise<number> {
    return this.source.getMaxSum(userId);
  }
}

export const trackingOperationService = new TrackingOperationDataSource(
  authTokenService,
  trackingOperationLocalRepository,
  trackingOperationsApiClient,
);
