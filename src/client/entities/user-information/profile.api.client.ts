import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { OnlineUser } from '@common/records/user.record';
import type { ApiResultOperationSuccess } from '@common/models/api-result-operation.model';
import { authTokenService, type AuthTokenService } from '@frontend/entities/user-information/auth-token.service';

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
}

export const profileApiClient = new ProfileApiClient(authTokenService);
