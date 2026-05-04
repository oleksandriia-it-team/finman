'use client';

import { useRouter } from 'next/navigation';
import constate from 'constate';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';

function useProfileSettingsLogic() {
  const router = useRouter();
  const userInformation = useUserInformation((state) => state.userInformation);
  const userInfoState = useUserInformation((state) => state.userInfoState);
  const setUserInformation = useUserInformation((state) => state.setUserInformation);
  const refresh = useUserInformation((state) => state.refresh);
  const logOut = useUserInformation((state) => state.logOut);
  const theme = useUserInformation((state) => state.theme);
  const changeTheme = useUserInformation((state) => state.setTheme);

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
