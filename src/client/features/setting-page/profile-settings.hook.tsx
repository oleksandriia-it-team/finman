'use client';

import { ThemeKey } from '@frontend/shared/constants/local-storage.contants';
import { ThemeEnum } from '@frontend/shared/enums/theme.enum';
import { localStorageService } from '@frontend/shared/services/local-storage/local-storage.service';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import constate from 'constate';

function useProfileSettingsLogic() {
  const router = useRouter();
  const userInformation = useUserInformation((state) => state.userInformation);
  const userInfoState = useUserInformation((state) => state.userInfoState);
  const setUserInformation = useUserInformation((state) => state.setUserInformation);
  const refresh = useUserInformation((state) => state.refresh);
  const logOut = useUserInformation((state) => state.logOut);
  const [theme, setTheme] = useState<ThemeEnum>(ThemeEnum.Light);

  useEffect(() => {
    setTheme(localStorageService.getItem<ThemeEnum>(ThemeKey) ?? ThemeEnum.Light);
  }, []);

  const changeTheme = (nextTheme: ThemeEnum) => {
    setTheme(nextTheme);
    localStorageService.setItem(ThemeKey, nextTheme);
    window.dispatchEvent(new Event('finman-theme-change'));
  };

  const handleLogout = () => {
    logOut();
    router.push('/login');
  };

  return {
    userInformation,
    userInfoState,
    setUserInformation,
    refresh,
    theme,
    changeTheme,
    handleLogout,
  };
}

export const [ProfileSettingsProvider, useProfileSettings] = constate(useProfileSettingsLogic);
