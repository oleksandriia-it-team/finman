import { CreateRegularEntryCommonUseCase } from '@common/domains/regular-entry/use-cases/create-regular-entry.common.use-case';
import { UpdateRegularEntryCommonUseCase } from '@common/domains/regular-entry/use-cases/update-regular-entry.common.use-case';
import { regularEntryApiRepository } from '@backend/entities/regular-entry/infrastructure/regular-entry.repository';

export const createRegularEntryApiUsecase = new CreateRegularEntryCommonUseCase(regularEntryApiRepository);
export const updateRegularEntryApiUsecase = new UpdateRegularEntryCommonUseCase(regularEntryApiRepository);
