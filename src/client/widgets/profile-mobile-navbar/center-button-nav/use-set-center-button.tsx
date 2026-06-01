import {
  type UserNavCenterButton,
  useUserNavStoreHook,
} from '@frontend/widgets/profile-mobile-navbar/user-nav-store.hook';
import { useEffect } from 'react';

const DefaultCenterButton: UserNavCenterButton = { url: '/profile', icon: 'plus' };

export function useSetCenterButton(button: UserNavCenterButton) {
  const setCenterButton = useUserNavStoreHook((state) => state.setCenterButton);

  useEffect(() => {
    setCenterButton(button);
    return () => setCenterButton(DefaultCenterButton);
  }, [button, setCenterButton]);
}
