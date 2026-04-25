import { create } from 'zustand/react';

interface NavStoreModel {
  isPlusHidden: boolean;
  setPlusHidden: (hidden: boolean) => void;
}

export const useUserNavStoreHook = create<NavStoreModel>((set) => ({
  isPlusHidden: false,
  setPlusHidden: (hidden: boolean) => set({ isPlusHidden: hidden }),
}));
