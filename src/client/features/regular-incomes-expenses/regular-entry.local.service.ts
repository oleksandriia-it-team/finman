import { regularEntryLocalRepository } from '@frontend/entities/regular-entry/regular-entry.local.repository';
import { CreateRegularEntryCommonUseCase } from '@common/domains/regular-entry/use-cases/create-regular-entry.common.use-case';
import { UpdateRegularEntryCommonUseCase } from '@common/domains/regular-entry/use-cases/update-regular-entry.common.use-case';
import type { ICrudService } from '@common/models/crud-service.model';
import type { RegularEntry } from '@common/records/regular-entry.record';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';
import type { RegularEntryFilter } from '@common/domains/regular-entry/filter/regular-entry.filter';

const createUsecase = new CreateRegularEntryCommonUseCase(regularEntryLocalRepository);
const updateUsecase = new UpdateRegularEntryCommonUseCase(regularEntryLocalRepository);

export const regularEntryLocalService: ICrudService<
  RegularEntry,
  Omit<RegularEntry, DefaultColumnKeys>,
  RegularEntryFilter
> = {
  deleteItem: regularEntryLocalRepository.deleteItem.bind(regularEntryLocalRepository),
  getItems: regularEntryLocalRepository.getItems.bind(regularEntryLocalRepository),
  getItemById: regularEntryLocalRepository.getItemById.bind(regularEntryLocalRepository),
  getTotalCount: regularEntryLocalRepository.getTotalCount.bind(regularEntryLocalRepository),
  createItem: createUsecase.execute.bind(createUsecase),
  updateItem(id: number, data: Omit<RegularEntry, DefaultColumnKeys>): Promise<void> {
    return updateUsecase.execute({ id, ...data });
  },
};
