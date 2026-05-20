import { BasicDataSource } from '@frontend/database/data-source/basic.data-source';
import { authTokenService } from '@frontend/shared/services/user-information/auth-token.service';

export const regularEntryService = new BasicDataSource(
  authTokenService,
  () => import('./regular-entry.local.service').then((m) => m.regularEntryLocalService),
  () => import('@frontend/entities/regular-entry/regular-entry.api.client').then((m) => m.regularEntryApiClient),
);
