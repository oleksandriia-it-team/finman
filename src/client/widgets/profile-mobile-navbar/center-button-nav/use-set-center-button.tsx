import { useUserNavStoreHook } from '@frontend/widgets/profile-mobile-navbar/user-nav-store.hook';
import { useEffect } from 'react';

export function useSetCenterButton(url: string) {
  const setCenterButtonUrl = useUserNavStoreHook((state) => state.setCenterButtonUrl);

  useEffect(() => {
    setCenterButtonUrl(url);
  }, [url, setCenterButtonUrl]);
}
