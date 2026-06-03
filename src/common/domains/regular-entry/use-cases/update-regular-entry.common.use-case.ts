import type { IUseCase } from '@common/models/use-case.model';
import type {
  IRegularEntryRepository,
  RegularEntryUpdateDTO,
} from '@common/domains/regular-entry/models/regular-entry-repository.model';
import { AppError } from '@common/classes/app-error.class';

export type UpdateRegularEntryInput = RegularEntryUpdateDTO & { id: number; userId?: number };

export class UpdateRegularEntryCommonUseCase implements IUseCase<UpdateRegularEntryInput, true> {
  constructor(private readonly regularEntryRepository: IRegularEntryRepository) {}

  async execute({ id, ...input }: UpdateRegularEntryInput): Promise<true> {
    const exist = await this.regularEntryRepository.findByTitle(input);

    if (exist && exist.id !== id) {
      throw new AppError('Регулярна операція з даним заголовком вже існує. Оберіть інший');
    }

    return this.regularEntryRepository.updateItem(id, input);
  }
}
