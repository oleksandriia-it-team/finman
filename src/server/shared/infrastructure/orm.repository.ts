import { type DefaultTableColumns } from '@common/models/default-table-columns.model';
import { type EntityTarget, type Repository } from 'typeorm';
import DBDataSource from '../../database/database-connection';
import { getTransactionManager } from './transaction.manager';
import { type ConstructorModel } from '@common/models/constructor.model';

export abstract class OrmRepository<T extends DefaultTableColumns> {
  private readonly entity: EntityTarget<T>;

  constructor(entity: EntityTarget<T>) {
    this.entity = entity;
  }

  get repository(): Repository<T> {
    const txManager = getTransactionManager();

    if (!txManager) {
      return DBDataSource.getRepository((this.entity as ConstructorModel<T>).name) as Repository<T>;
    }

    return txManager.getRepository(this.entity);
  }
}
