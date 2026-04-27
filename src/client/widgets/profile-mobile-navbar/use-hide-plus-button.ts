import { useUserNavStoreHook } from '@frontend/widgets/profile-mobile-navbar/user-nav-store.hook';
import { useEffect } from 'react';

export const useHidePlusButton = () => {
  const setPlusHidden = useUserNavStoreHook((state) => state.setPlusHidden);

  useEffect(() => {
    setPlusHidden(true);

    return () => setPlusHidden(false);
  }, [setPlusHidden]);

  return setPlusHidden;
};
