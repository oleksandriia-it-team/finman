import { ToastVariant } from '@frontend/ui/ui-toast/props/toast-content.props';

export interface GlobalToastConfig {
  id: string;
  title: string;
  description: string;
  variant: ToastVariant;
}

export interface GlobalToastModel {
  list: GlobalToastConfig[];
  showToast: (config: Omit<GlobalToastConfig, 'id'>) => void;
  hideToast: (id: string) => void;
}
