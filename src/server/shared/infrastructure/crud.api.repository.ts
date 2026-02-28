import { EntityTarget, FindOptionsWhere, ObjectLiteral } from 'typeorm';
import { DefaultColumnKeys, DefaultTableColumns } from '../../../common/models/default-table-columns.model';
import { ICrudService } from '../../../common/models/crud-service.model';
import { OrmRepository } from './orm.repository';

export abstract class CrudApiRepository<
  T extends ObjectLiteral & DefaultTableColumns,
  DTO extends ObjectLiteral = Omit<T, DefaultColumnKeys>,
>
  extends OrmRepository<T>
  implements ICrudService<T, DTO>
{
  constructor(entity: EntityTarget<T>) {
    super(entity);
  }

  async createItem(data: DTO): Promise<number> {
    const newItem = this.repository.create(data as unknown as T);

    const savedItem = await this.repository.save(newItem);

    return savedItem.id;
  }

  async updateItem(id: number, data: DTO): Promise<true> {
    const updatedItem = this.repository.create({ id, ...data } as unknown as T);

    await this.repository.save(updatedItem);

    return true;
  }

  getItemById(id: number): Promise<T | null> {
    return this.repository.findOneBy({ id } as FindOptionsWhere<T>);
  }

  async getItems(first: number, last: number): Promise<T[]> {
    const skip = first;
    const take = last - first;

    return this.repository.find({ skip, take });
  }

  async deleteItem(id: number): Promise<true> {
    await this.repository.delete({ id } as FindOptionsWhere<T>);

    return true;
  }

  getTotalCount(): Promise<number> {
    return this.repository.count();
  }
}
