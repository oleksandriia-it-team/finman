import type { IUseCase } from '@common/models/use-case.model';

export interface ITransactionManager {
  run<T>(work: () => Promise<T>): Promise<T>;
}

export abstract class TransactionalUseCase<TInput, TOutput> implements IUseCase<TInput, TOutput> {
  constructor(protected readonly transactionManager: ITransactionManager) {}

  async execute(input: TInput): Promise<TOutput> {
    return this.transactionManager.run(() => this.handle(input));
  }

  protected abstract handle(input: TInput): Promise<TOutput>;
}
