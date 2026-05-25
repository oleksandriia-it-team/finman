import { create } from 'zustand/react';
import type { IconSize } from '@frontend/ui/ui-svg-icon/props/svg-icon.props';

interface NavStoreModel {
  isPlusHidden: boolean;
  setPlusHidden: (hidden: boolean) => void;
  centerButton: UserNavCenterButton;
  setCenterButton: (info: UserNavCenterButton) => void;
}

export interface UserNavCenterButton {
  url: string;
  icon: string;
  size?: IconSize;
  iconSize?: IconSize;
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
