import { create } from 'zustand/react';

interface NavStoreModel {
  isPlusHidden: boolean;
  setPlusHidden: (hidden: boolean) => void;
  centerButton: UserNavCenterButton;
  setCenterButton: (info: UserNavCenterButton) => void;
}

export interface UserNavCenterButton {
  url: string;
  icon: string;
}

export const useUserNavStoreHook = create<NavStoreModel>((set) => ({
  isPlusHidden: false,
  setPlusHidden: (hidden: boolean) => set({ isPlusHidden: hidden }),
  centerButton: {
    url: '/profile',
    icon: 'plus',
  },
  setCenterButton: (info: UserNavCenterButton) => set({ centerButton: info }),
}));
