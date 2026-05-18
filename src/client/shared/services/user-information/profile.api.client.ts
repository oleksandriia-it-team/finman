import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { OnlineUser } from '@common/records/user.record';
import type { ApiResultOperationSuccess } from '@common/models/api-result-operation.model';
import { authTokenService, type AuthTokenService } from '@frontend/shared/services/user-information/auth-token.service';
import { type ProfileSettingsData } from '@common/domains/profile/schema/profile-settings.schema';

export class ProfileApiClient {
  constructor(private readonly authTokenService: AuthTokenService) {}

  async getProfile(): Promise<OnlineUser | null> {
    const accessToken = this.authTokenService.getAccessToken();

    if (!accessToken) {
      return null;
    }

    const result = await fetchClient.get<ApiResultOperationSuccess<OnlineUser>>('/api/profile/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return result.data || null;
  }

  async updateProfile(data: ProfileSettingsData): Promise<OnlineUser | null> {
    const accessToken = this.authTokenService.getAccessToken();

    if (!accessToken) {
      throw new Error('Для оновлення профілю потрібен токен доступу.');
    }

    const result = await fetchClient.put<ApiResultOperationSuccess<OnlineUser>, ProfileSettingsData>(
      '/api/profile/me',
      data,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return result.data || null;
  }
}

export const profileApiClient = new ProfileApiClient(authTokenService);
