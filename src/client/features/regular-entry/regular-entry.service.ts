import { BasicDataSource } from '@frontend/database/data-source/basic.data-source';
import { localStorageService } from '@frontend/shared/services/local-storage/local-storage.service';
import { regularEntryApiClient } from '@frontend/entities/regular-entry/regular-entry.api.client';
import { regularEntryLocalRepository } from '@frontend/entities/regular-entry/regular-entry.local.repository';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';
import type { RegularEntry } from '@common/records/regular-entry.record';

class RegularEntryService extends BasicDataSource<RegularEntry, Omit<RegularEntry, DefaultColumnKeys>> {
  override get isOfflineMode() {
    return true; // TODO remove later
  }
}

export const regularEntryService = new RegularEntryService(
  localStorageService,
  regularEntryLocalRepository,
  regularEntryApiClient,
);
