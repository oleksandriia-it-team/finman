import type { IUseCase } from '@common/models/use-case.model';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';
import type { RegularEntry } from '@common/records/regular-entry.record';
import type { IRegularEntryRepository } from '@common/domains/regular-entry/models/regular-entry-repository.model';
import { AppError } from '@common/classes/app-error.class';

export type UpdateRegularEntryInput = Omit<RegularEntry, DefaultColumnKeys> & { id: number; userId?: number };

export class UpdateRegularEntryCommonUseCase implements IUseCase<UpdateRegularEntryInput, true> {
  constructor(private regularEntryRepository: IRegularEntryRepository) {}

  async execute({ id, ...input }: UpdateRegularEntryInput): Promise<true> {
    const exist = await this.regularEntryRepository.findByTitle(input);

    if (exist && exist.id !== id) {
      throw new AppError('Регулярна операція з даним заголовком вже існує. Оберіть інший');
    }

    return this.regularEntryRepository.updateItem(id, input);
  }
}
