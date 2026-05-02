import { type ProfileSettingsData } from '@common/domains/profile/schema/profile-settings.schema';
import { type GetUser, type OfflineUser, type OnlineUser } from '@common/records/user.record';
import { profileApiClient } from '@frontend/shared/services/user-information/profile.api.client';

export class ProfileSettingsService {
  updateProfile(user: GetUser, data: ProfileSettingsData): Promise<GetUser> {
    if (user.online) {
      return this.updateOnlineProfile(data);
    }

    return Promise.resolve(this.updateOfflineProfile(user, data));
  }

  private updateOnlineProfile(data: ProfileSettingsData): Promise<OnlineUser> {
    return profileApiClient.updateProfile(data);
  }

  private updateOfflineProfile(user: OfflineUser, data: ProfileSettingsData): OfflineUser {
    return {
      ...user,
      name: data.name,
      locale: data.locale,
      language: data.language,
    };
  }
}

export const profileSettingsService = new ProfileSettingsService();
