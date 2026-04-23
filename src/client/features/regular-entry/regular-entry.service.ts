import { BasicDataSource } from '@frontend/database/data-source/basic.data-source';
import { localStorageService } from '@frontend/shared/services/local-storage/local-storage.service';
import { regularEntryApiClient } from '@frontend/entities/regular-entry/regular-entry.api.client';
import { regularEntryLocalRepository } from '@frontend/entities/regular-entry/regular-entry.local.repository';

export const regularEntryService = new BasicDataSource(
  localStorageService,
  regularEntryLocalRepository,
  regularEntryApiClient,
);
