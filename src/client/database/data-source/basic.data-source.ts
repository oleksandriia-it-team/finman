import { type ICrudService } from '@common/models/crud-service.model';
import { type DefaultColumnKeys, type DefaultTableColumns } from '@common/models/default-table-columns.model';
import { type RecordModel } from '@common/models/record.model';
import { type LocalStorageService } from '@frontend/shared/services/local-storage/local-storage.service';
import type { UserInformation } from '@frontend/shared/services/user-information/models/user-infomation.model';
import { UserInformationKey } from '@frontend/shared/constants/local-storage.contants';

export class BasicDataSource<
  T extends DefaultTableColumns,
  DTO extends RecordModel = Omit<T, DefaultColumnKeys>,
> implements ICrudService<T, DTO> {
  constructor(
    private localStorage: LocalStorageService,
    private local: ICrudService<T, DTO>,
    private apiClient: ICrudService<T, DTO>,
  ) {}

  private get source(): ICrudService<T, DTO> {
    if (this.isOfflineMode) {
      return this.local;
    }

    return this.apiClient;
  }

  getItemById(id: number): Promise<T | null> {
    return this.source.getItemById(id);
  }

  getItems(first: number, last: number): Promise<T[]> {
    return this.source.getItems(first, last);
  }

  createItem(data: DTO): Promise<number> {
    return this.source.createItem(data);
  }

  updateItem(id: number, data: DTO): Promise<true> {
    return this.source.updateItem(id, data);
  }

  deleteItem(id: number): Promise<true> {
    return this.source.deleteItem(id);
  }

  getTotalCount(): Promise<number> {
    return this.source.getTotalCount();
  }

  get isOfflineMode() {
    return !this.localStorage.getItem<UserInformation>(UserInformationKey);
  }
}
