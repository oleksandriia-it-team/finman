import { ICrudService } from '../../../common/models/crud-service.model';
import { DefaultTableColumns } from '../../../common/models/default-table-columns.model';
import { RecordModel } from '../../../common/models/record.model';

export class BasicDataSource<
  T extends DefaultTableColumns,
  DTO extends RecordModel = Omit<T, 'id' | 'softDeleted'>,
> implements ICrudService<T, DTO> {
  constructor(private local: ICrudService<T, DTO>) {}

  private get source(): ICrudService<T, DTO> {
    return this.local;
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
}
