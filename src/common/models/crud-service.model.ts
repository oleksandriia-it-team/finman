import { type RecordModel } from './record.model';
import { type DefaultTableColumns } from './default-table-columns.model';
import { type DeepPartial } from './deep-partial.model';

export interface ICrudService<
  T extends DefaultTableColumns,
  DTO extends RecordModel = Omit<T, 'id'>,
  F = object,
  UpdateDTO extends RecordModel = DTO,
> {
  readonly tableName?: string;

  getItemById(id: number): Promise<T | null>;

  getItems(from: number, to: number, filters?: DeepPartial<F>): Promise<T[]>;

  createItem(data: DTO): Promise<number>;

  updateItem(id: number, data: UpdateDTO): Promise<true>;

  deleteItem(id: number): Promise<true>;

  getTotalCount(filters?: DeepPartial<F>): Promise<number>;
}
