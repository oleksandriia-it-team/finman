import { RecordModel } from './record.model';
import { DefaultTableColumns } from './default-table-columns.model';

export interface ICrudService<T extends DefaultTableColumns, DTO extends RecordModel = Omit<T, 'id'>, F = object> {
  readonly tableName?: string;

  getItemById(id: number): Promise<T | null>;

  getItems(first: number, last: number, filters?: F): Promise<T[]>;

  createItem(data: DTO): Promise<number>;

  updateItem(id: number, data: DTO): Promise<true>;

  deleteItem(id: number): Promise<true>;

  getTotalCount(): Promise<number>;
}
