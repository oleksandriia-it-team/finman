import type { DatabaseLocalService } from './database.local.service';
import type { ITransactionManager } from '@common/models/transaction-manager.model';

export class DexieTransactionManager implements ITransactionManager {
  constructor(
    private readonly db: DatabaseLocalService,
    private readonly tables: string[],
  ) {}

  run<T>(work: () => Promise<T>): Promise<T> {
    return this.db.runBatch(this.tables, work);
  }
}
