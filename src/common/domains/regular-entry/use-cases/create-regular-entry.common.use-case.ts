import type { IUseCase } from '@common/models/use-case.model';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';
import type { RegularEntry } from '@common/records/regular-entry.record';
import type { IRegularEntryRepository } from '@common/domains/regular-entry/models/regular-entry-repository.model';
import { AppError } from '@common/classes/api-error.class';

export type CreateRegularEntryInput = Omit<RegularEntry, DefaultColumnKeys> & { userId?: number };

export class CreateRegularEntryCommonUseCase implements IUseCase<CreateRegularEntryInput, number> {
  constructor(private regularEntryRepository: IRegularEntryRepository) {}

  async execute(input: CreateRegularEntryInput): Promise<number> {
    const exist = await this.regularEntryRepository.findByTitle(input);

    if (exist) {
      throw new AppError('Регулярна операція з даним заголовком вже існує. Оберіть інший');
    }

    return this.regularEntryRepository.createItem(input);
  }
}
