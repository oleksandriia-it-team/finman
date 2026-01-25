import { ToastConfig } from './toast-config.model';

export interface ToastHookModel {
  toasts: ToastConfig[];
  addToast: (toast: ToastConfig) => void;
  removeToast: (index: number) => void;
}
