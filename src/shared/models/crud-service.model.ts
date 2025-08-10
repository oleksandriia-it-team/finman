import { DatabaseResultOperationSuccess } from './database-result-operation.model';
import { DefaultTableColumns } from '../classes/crud-service.class';
import { RecordModel } from './record.model';

export interface ICrudService<T extends DefaultTableColumns, DTO extends RecordModel = Omit<T, 'id'>> {
  readonly tableName: string;

  getItemById(id: number): Promise<DatabaseResultOperationSuccess<T | null>>;

  getItems(first: number, last: number): Promise<DatabaseResultOperationSuccess<T[]>>;

  createItem(data: DTO): Promise<DatabaseResultOperationSuccess<number>>;

  updateItem(id: number, data: DTO): Promise<DatabaseResultOperationSuccess<true>>;

  deleteItem(id: number): Promise<DatabaseResultOperationSuccess<true>>;

  getTotalCount(): Promise<DatabaseResultOperationSuccess<number>>;
}