import type { AuthTokenService } from '@frontend/shared/services/user-information/auth-token.service';
import { authTokenService } from '@frontend/shared/services/user-information/auth-token.service';
import type {
  GetBasicInformationResponse,
  ITrackingOperationRepository,
} from '@common/domains/tracking-operation/models/tracking-operation.repository.model';
import type { TrackingOperationRecord } from '@common/records/tracking-operation.record';
import type { TrackingOperationFilter } from '@common/domains/tracking-operation/filter/tracking-operation.filter';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';
import type { DeepPartial } from '@common/models/deep-partial.model';

export class TrackingOperationDataSource implements ITrackingOperationRepository {
  private local?: ITrackingOperationRepository;
  private apiClient?: ITrackingOperationRepository;

  constructor(
    private readonly authTokenService: AuthTokenService,
    private readonly localLoader: () => Promise<ITrackingOperationRepository>,
    private readonly apiClientLoader: () => Promise<ITrackingOperationRepository>,
  ) {}

  private async source(): Promise<ITrackingOperationRepository> {
    if (this.isOfflineMode) {
      this.local ??= await this.localLoader();
      return this.local;
    }
    this.apiClient ??= await this.apiClientLoader();
    return this.apiClient;
  }

  get isOfflineMode(): boolean {
    return !this.authTokenService.getAccessToken();
  }

  getItemById(id: number): Promise<TrackingOperationRecord | null> {
    return this.source().then((s) => s.getItemById(id));
  }

  getItems(
    from: number,
    to: number,
    filters?: DeepPartial<TrackingOperationFilter>,
  ): Promise<TrackingOperationRecord[]> {
    return this.source().then((s) => s.getItems(from, to, filters));
  }

  createItem(data: Omit<TrackingOperationRecord, DefaultColumnKeys>): Promise<number> {
    return this.source().then((s) => s.createItem(data));
  }

  updateItem(id: number, data: Omit<TrackingOperationRecord, DefaultColumnKeys>): Promise<void> {
    return this.source().then((s) => s.updateItem(id, data));
  }

  deleteItem(id: number): Promise<void> {
    return this.source().then((s) => s.deleteItem(id));
  }

  getBasicInformation(filters?: DeepPartial<TrackingOperationFilter>): Promise<GetBasicInformationResponse> {
    return this.source().then((s) => s.getBasicInformation(filters));
  }
}

export const trackingOperationService = new TrackingOperationDataSource(
  authTokenService,
  () =>
    import('@frontend/entities/tracking-operations/tracking-operation.local.repository').then(
      (m) => m.trackingOperationLocalRepository,
    ),
  () =>
    import('@frontend/entities/tracking-operations/tracking-operations.api.client').then(
      (m) => m.trackingOperationsApiClient,
    ),
);
