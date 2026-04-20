import {
  type GlobalToastConfig,
  type GlobalToastModel,
} from '@frontend/shared/hooks/global-toast/models/global-toast.model';
import { create } from 'zustand/react';
import { generateId } from '@common/utils/generate-id.util';

export const useGlobalToast = create<GlobalToastModel>((set, get) => ({
  list: [],
  showToast: (config: Omit<GlobalToastConfig, 'id'>) => {
    const { list } = get();
    set({ list: [...list, { ...config, id: generateId() }] });
  },
  hideToast: (id: string) => {
    const { list } = get();
    set({ list: list.filter((i) => i.id !== id) });
  },
}));
