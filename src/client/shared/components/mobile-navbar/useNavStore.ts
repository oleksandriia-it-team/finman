import { create } from 'zustand/react';

interface UseNavStoreModel {
  isPlusHidden: boolean;
  setPlusHidden: (hidden: boolean) => void;
}

export const useNavStore = create<UseNavStoreModel>((set) => ({
  isPlusHidden: false,
  setPlusHidden: (hidden: boolean) => set({ isPlusHidden: hidden }),
}));
