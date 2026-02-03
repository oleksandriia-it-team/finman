import { ToastConfig } from './toast-config.model';

export interface Toast extends ToastConfig {
  id: string;
}

export interface ToastHookModel {
  toasts: Toast[];
  addToast: (toast: ToastConfig) => void;
  removeToast: (id: string) => void;
}
