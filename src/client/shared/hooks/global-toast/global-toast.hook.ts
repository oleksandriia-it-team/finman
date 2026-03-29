import { GlobalToastConfig, GlobalToastModel } from '@frontend/shared/hooks/global-toast/models/global-toast.model';
import { create } from 'zustand/react';

export const useGlobalToast = create<GlobalToastModel>((set, get) => ({
  list: [],
  showToast: (config: GlobalToastConfig) => {
    const { list } = get();
    set({ list: [...list, config] });
  },
  hideToast: (index: number) => {
    const { list } = get();
    set({ list: list.filter((_, i) => i !== index) });
  },
}));
