import { EntityManager } from 'typeorm';
import DBDataSource from '../../database/database-connection';

export const transactionStorage = new AsyncLocalStorage<EntityManager>();

export const getTransactionManager = (): EntityManager | undefined => {
  return transactionStorage.getStore();
};

export class TransactionManager {
  static async run<T>(callback: () => Promise<T>): Promise<T> {
    const queryRunner = DBDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await transactionStorage.run(queryRunner.manager, () => {
        return callback();
      });

      await queryRunner.commitTransaction();
      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
