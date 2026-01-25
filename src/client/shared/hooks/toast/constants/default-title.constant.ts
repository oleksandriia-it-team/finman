import { ToastConfig } from '../models/toast-config.model';

export const DEFAULT_TOAST_TITLES: Record<ToastConfig['type'], string> = {
  success: 'Success',
  error: 'Error',
  info: 'Information',
};
