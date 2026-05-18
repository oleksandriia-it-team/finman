import {
  type UserNavCenterButton,
  useUserNavStoreHook,
} from '@frontend/widgets/profile-mobile-navbar/user-nav-store.hook';
import { useEffect } from 'react';

export function useSetCenterButton(url: UserNavCenterButton) {
  const setCenterButton = useUserNavStoreHook((state) => state.setCenterButton);

  useEffect(() => {
    setCenterButton(url);
  }, [url, setCenterButton]);
}
