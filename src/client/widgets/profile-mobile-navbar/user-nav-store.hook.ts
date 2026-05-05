import { create } from 'zustand/react';

interface NavStoreModel {
  isPlusHidden: boolean;
  setPlusHidden: (hidden: boolean) => void;
  centerButtonUrl: string;
  setCenterButtonUrl: (url: string) => void;
}

export const useUserNavStoreHook = create<NavStoreModel>((set) => ({
  isPlusHidden: false,
  setPlusHidden: (hidden: boolean) => set({ isPlusHidden: hidden }),
  centerButtonUrl: '/profile',
  setCenterButtonUrl: (url: string) => set({ centerButtonUrl: url }),
}));
