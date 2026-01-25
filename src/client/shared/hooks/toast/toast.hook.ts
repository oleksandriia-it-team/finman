import { create } from 'zustand/react';
import { Toast, ToastHookModel } from './models/toast-hook.model';
import { ToastConfig } from './models/toast-config.model';
import { DEFAULT_TOAST_TITLES } from './constants/default-title.constant';
import { generateId } from '../../../../common/utils/generate-id.util';

export const useToastHook = create<ToastHookModel>((set, get) => ({
  toasts: [],
  addToast: ({ duration = 3000, canClose = false, ...config }: ToastConfig) => {
    const id = generateId();
    const title = config.title || DEFAULT_TOAST_TITLES[config.type];
    const newToast: Toast = { ...config, id, title, duration, canClose };
    set({ toasts: [...get().toasts, newToast] });
  },
  removeToast: (id: string) => {
    set({
      toasts: get().toasts.filter((t) => t.id !== id),
    });
  },
}));

export const addToast = (config: ToastConfig) => {
  useToastHook.getState().addToast(config);
};
