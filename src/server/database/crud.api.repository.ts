import { type EntityTarget, type FindOptionsWhere, type ObjectLiteral } from 'typeorm';
import { type DefaultColumnKeys, type DefaultTableColumns } from '@common/models/default-table-columns.model';
import { type ICrudService } from '@common/models/crud-service.model';
import { OrmRepository } from './orm.repository';
import { type DeepPartial } from '@common/models/deep-partial.model';
import { calculateSkipAndLimit } from '@common/utils/calculate-skip-and-take.util';

export abstract class CrudApiRepository<
  T extends ObjectLiteral & DefaultTableColumns,
  F extends object,
  DTO extends ObjectLiteral = Omit<T, DefaultColumnKeys>,
>
  extends OrmRepository<T>
  implements ICrudService<T, DTO, F>
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

  async getItems(from: number, to: number, filters?: DeepPartial<F> | undefined): Promise<T[]> {
    const { skip, take } = calculateSkipAndLimit(from, to);

    const where = filters ? this.mapFilters(filters) : {};

    return this.repository.find({ skip, take, where: where as FindOptionsWhere<T> | FindOptionsWhere<T>[] });
  }

  async deleteItem(id: number, softDeleted?: boolean): Promise<true> {
    if (softDeleted) {
      await this.repository.update({ id } as FindOptionsWhere<T>, { softDeleted: 1 } as T);

      return true;
    }

    await this.repository.delete({ id } as FindOptionsWhere<T>);

    return true;
  }

  getTotalCount(filters?: DeepPartial<F> | undefined): Promise<number> {
    const where = filters ? this.mapFilters(filters) : {};

    return this.repository.count({ where });
  }

  protected mapFilters(_: DeepPartial<F> | undefined): FindOptionsWhere<T> | FindOptionsWhere<T>[] {
    return {};
  }
}
