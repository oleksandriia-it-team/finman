import { type ICrudService } from '@common/models/crud-service.model';
import { type DefaultColumnKeys, type DefaultTableColumns } from '@common/models/default-table-columns.model';
import { type RecordModel } from '@common/models/record.model';
import type { AuthTokenModel } from '@frontend/shared/models/auth-token.model';

export class BasicDataSource<
  T extends DefaultTableColumns,
  F extends object,
  DTO extends RecordModel = Omit<T, DefaultColumnKeys>,
> implements ICrudService<T, DTO> {
  private local?: ICrudService<T, DTO>;
  private apiClient?: ICrudService<T, DTO>;

  constructor(
    private readonly authTokenService: AuthTokenModel,
    private readonly localLoader: () => Promise<ICrudService<T, DTO>>,
    private readonly apiClientLoader: () => Promise<ICrudService<T, DTO>>,
  ) {}

  private async source(): Promise<ICrudService<T, DTO>> {
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

  getItemById(id: number): Promise<T | null> {
    return this.source().then((s) => s.getItemById(id));
  }

  getItems(from: number, to: number, filters?: F | undefined): Promise<T[]> {
    return this.source().then((s) => s.getItems(from, to, (filters ?? {}) as F));
  }

  createItem(data: DTO): Promise<number> {
    return this.source().then((s) => s.createItem(data));
  }

  updateItem(id: number, data: DTO): Promise<true> {
    return this.source().then((s) => s.updateItem(id, data));
  }

  deleteItem(id: number): Promise<true> {
    return this.source().then((s) => s.deleteItem(id));
  }

  getTotalCount(filters?: F | undefined): Promise<number> {
    return this.source().then((s) => s.getTotalCount(filters ?? ({} as F)));
  }
}
