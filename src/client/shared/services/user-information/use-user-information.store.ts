import { type UserInformationStore } from '@frontend/shared/services/user-information/models/user-infomation.model';
import { LanguageKey, ThemeKey, UserInformationKey } from '@frontend/shared/constants/local-storage.constants';
import { localStorageService } from '@frontend/shared/services/local-storage/local-storage.service';
import { create } from 'zustand/react';
import { userSchema } from '@frontend/shared/schemas/validation-schema';
import type { GetUser, OfflineUser } from '@common/records/user.record';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { profileApiClient } from '@frontend/shared/services/user-information/profile.api.client';
import { authTokenService } from './auth-token.service';
import { ThemeEnum } from '@frontend/shared/enums/theme.enum';
import { type SupportLanguages } from '@common/enums/support-languages.enum';
import { DefaultLocale } from '@frontend/shared/i18n/messages';

async function getUserInformation(): Promise<GetUser | null> {
  const user = localStorageService.getItem<OfflineUser>(UserInformationKey);

  if (!user) {
    return profileApiClient.getProfile();
  }

  const result = userSchema.safeParse(user);
  return result.success ? { ...result.data, online: false } : null;
}

export const useUserInformation = create<UserInformationStore>((set) => {
  async function loadUserInformation() {
    set({ userInfoState: PromiseState.Loading });

    await getUserInformation()
      .then((user) => {
        if (user?.language) {
          localStorageService.setItem(LanguageKey, user.language);
          set({ userInformation: user, userInfoState: PromiseState.Success, language: user.language });
          return;
        }

        set({ userInformation: user, userInfoState: PromiseState.Success });
      })
      .catch(() => {
        set({ userInformation: null, userInfoState: PromiseState.Error });

        return null;
      });
  }

  loadUserInformation();

  return {
    userInformation: null,
    setUserInformation: (userInformation: GetUser) => {
      if (!userInformation.online) {
        const user = localStorageService.getItem<GetUser>(UserInformationKey);
        const updatedUser = { ...user, ...userInformation };
        localStorageService.setItem(UserInformationKey, updatedUser);

        loadUserInformation();
      }

      if (userInformation.language) {
        localStorageService.setItem(LanguageKey, userInformation.language);
        set({ userInformation, language: userInformation.language });
        return;
      }

      set({ userInformation });

      // TODO: add profile update if work mode = online
    },
    logOut: () => {
      authTokenService.clearAccessToken();
      localStorageService.removeItem(UserInformationKey);

      set({ userInformation: null });
    },
    userInfoState: PromiseState.Loading,
    updateInformationState: PromiseState.Loading,
    refresh: () => loadUserInformation(),
    theme: localStorageService.getItem<ThemeEnum>(ThemeKey) ?? ThemeEnum.Light,
    setTheme: (theme: ThemeEnum) => {
      set({ theme });
      localStorageService.setItem(ThemeKey, theme);
    },
    language: localStorageService.getItem<SupportLanguages>(LanguageKey) ?? DefaultLocale,
    setLanguage: (language: SupportLanguages) => {
      set({ language });
      localStorageService.setItem(LanguageKey, language);
    },
  };
});
