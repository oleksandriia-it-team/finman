import { useNavStore } from '@frontend/components/mobile-navbar/useNavStore';
import { useEffect } from 'react';

export const useHidePlusButton = () => {
  const setPlusHidden = useNavStore((state) => state.setPlusHidden);

  useEffect(() => {
    setPlusHidden(true);

    return () => setPlusHidden(false);
  }, [setPlusHidden]);
};
