import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { OnlineUser } from '@common/records/user.record';
import type { ApiResultOperationSuccess } from '@common/models/api-result-operation.model';
import { authTokenService, type AuthTokenService } from '@frontend/shared/services/user-information/auth-token.service';
import { type ProfileSettingsData } from '@common/domains/profile/schema/profile-settings.schema';

export class ProfileApiClient {
  constructor(private authTokenService: AuthTokenService) {}

  async getProfile(): Promise<OnlineUser | null> {
    const accessToken = this.authTokenService.getAccessToken();

    if (!accessToken) {
      return null;
    }

    return fetchClient
      .get<ApiResultOperationSuccess<OnlineUser>>('/api/profile/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((result) => result.data);
  }

  async updateProfile(data: ProfileSettingsData): Promise<OnlineUser> {
    return fetchClient
      .put<ApiResultOperationSuccess<OnlineUser>, ProfileSettingsData>('/api/profile/me', data)
      .then((result) => result.data);
  }
}

export const profileApiClient = new ProfileApiClient(authTokenService);
