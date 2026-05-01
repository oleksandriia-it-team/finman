import { BasicDataSource } from '@frontend/database/data-source/basic.data-source';
import { regularEntryLocalRepository } from '@frontend/entities/regular-entry/regular-entry.local.repository';
import { authTokenService } from '@frontend/shared/services/user-information/auth-token.service';
import type { ICrudService } from '@common/models/crud-service.model';
import type { RegularEntry } from '@common/records/regular-entry.record';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';
import type { RegularEntryFilter } from '@common/domains/regular-entry/filter/regular-entry.filter';
import { CreateRegularEntryCommonUseCase } from '@common/domains/regular-entry/use-cases/create-regular-entry.common.use-case';
import { UpdateRegularEntryCommonUseCase } from '@common/domains/regular-entry/use-cases/update-regular-entry.common.use-case';
import { regularEntryApiClient } from '@frontend/entities/regular-entry/regular-entry.api.client';

const createRegularEntryLocalUsecase = new CreateRegularEntryCommonUseCase(regularEntryLocalRepository);
const updateRegularEntryLocalUsecase = new UpdateRegularEntryCommonUseCase(regularEntryLocalRepository);

export const regularEntryLocalUsecases: ICrudService<
  RegularEntry,
  Omit<RegularEntry, DefaultColumnKeys>,
  RegularEntryFilter
> = {
  deleteItem: regularEntryLocalRepository.deleteItem,
  getItems: regularEntryLocalRepository.getItems,
  getItemById: regularEntryLocalRepository.getItemById,
  getTotalCount: regularEntryLocalRepository.getTotalCount,
  createItem: createRegularEntryLocalUsecase.execute,
  updateItem(id: number, data: Omit<RegularEntry, DefaultColumnKeys>): Promise<true> {
    return updateRegularEntryLocalUsecase.execute({ id, ...data });
  },
};

export const regularEntryService = new BasicDataSource(
  authTokenService,
  regularEntryLocalUsecases,
  regularEntryApiClient,
);
