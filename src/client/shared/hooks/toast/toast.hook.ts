import { create } from 'zustand/react';
import { ToastHookModel } from './models/toast-hook.model';
import { ToastConfig } from './models/toast-config.model';
import { DEFAULT_TOAST_TITLES } from './constants/default-title.constant';

export const useToastHook = create<ToastHookModel>((set, get) => ({
  toasts: [],
  addToast: ({ duration = 3000, canClose = false, ...config }: ToastConfig) => {
    const title = config.title || DEFAULT_TOAST_TITLES[config.type];
    set({ toasts: [ ...get().toasts, { ...config, title, duration, canClose } ] });
  },
  removeToast: (index: number) => {
    const toasts = [ ...get().toasts ];
    toasts.splice(index, 1);
    set({ toasts });
  },

}));