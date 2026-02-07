import { DefaultTableColumns } from '../../../common/models/default-table-columns.model';
import { EntityTarget } from 'typeorm';
import DBDataSource from '../../database/database-connection';
import { getTransactionManager } from './transaction.manager';

export abstract class OrmRepository<T extends DefaultTableColumns> {
  private readonly entity: EntityTarget<T>;

  constructor(entity: EntityTarget<T>) {
    this.entity = entity;
  }

  protected get repository() {
    const txManager = getTransactionManager();

    if (!txManager) {
      return DBDataSource.getRepository(this.entity);
    }

    return txManager.getRepository(this.entity);
  }
}
