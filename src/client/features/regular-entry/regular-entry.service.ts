import { BasicDataSource } from '@frontend/database/data-source/basic.data-source';
import { regularEntryApiClient } from '@frontend/entities/regular-entry/regular-entry.api.client';
import { regularEntryLocalRepository } from '@frontend/entities/regular-entry/regular-entry.local.repository';
import { authTokenService } from '@frontend/shared/services/user-information/auth-token.service';

export const regularEntryService = new BasicDataSource(
  authTokenService,
  regularEntryLocalRepository,
  regularEntryApiClient,
);
