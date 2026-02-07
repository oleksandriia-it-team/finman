import { DefaultTableColumns } from '../../../common/models/default-table-columns.model';
import { EntityTarget, Repository } from 'typeorm';
import DBDataSource from '../../database/database-connection';
import { getTransactionManager } from './transaction.manager';
import { ConstructorModel } from '../../../common/models/constructor.model';

export abstract class OrmRepository<T extends DefaultTableColumns> {
  private readonly entity: EntityTarget<T>;

  constructor(entity: EntityTarget<T>) {
    this.entity = entity;
  }

  protected get repository(): Repository<T> {
    const txManager = getTransactionManager();

    if (!txManager) {
      return DBDataSource.getRepository((this.entity as ConstructorModel<T>).name) as Repository<T>;
    }

    return txManager.getRepository(this.entity);
  }
}
