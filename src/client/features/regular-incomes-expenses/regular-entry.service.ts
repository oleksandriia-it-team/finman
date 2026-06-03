import { BasicDataSource } from '@frontend/database/data-source/basic.data-source';
import { authTokenService } from '@frontend/shared/services/user-information/auth-token.service';
import type { RegularEntry } from '@common/records/regular-entry.record';
import type { RegularEntryFilter } from '@common/domains/regular-entry/filter/regular-entry.filter';
import type {
  RegularEntryCreateDTO,
  RegularEntryUpdateDTO,
} from '@common/domains/regular-entry/models/regular-entry-repository.model';

export const regularEntryService = new BasicDataSource<
  RegularEntry,
  RegularEntryFilter,
  RegularEntryCreateDTO,
  RegularEntryUpdateDTO
>(
  authTokenService,
  () => import('./regular-entry.local.service').then((m) => m.regularEntryLocalService),
  () => import('@frontend/entities/regular-entry/regular-entry.api.client').then((m) => m.regularEntryApiClient),
);
