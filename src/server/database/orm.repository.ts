import { type DefaultTableColumns } from '@common/models/default-table-columns.model';
import { type EntityTarget, type Repository } from 'typeorm';
import { DBDataSource } from './database-connection';
import { getTransactionManager } from './transaction.manager';

export abstract class OrmRepository<T extends DefaultTableColumns> {
  readonly tableName: string;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  constructor(_entity: EntityTarget<T>, tableName: string) {
    this.tableName = tableName;
  }

  get repository(): Repository<T> {
    const txManager = getTransactionManager();

    if (!txManager) {
      return DBDataSource.getRepository<T>(this.tableName);
    }

    return txManager.getRepository<T>(this.tableName);
  }
}
