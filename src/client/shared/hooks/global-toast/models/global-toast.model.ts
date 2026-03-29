import { ToastVariant } from '@frontend/ui/ui-toast/props/toast-content.props';

export interface GlobalToastConfig {
  title: string;
  description: string;
  duration: number;
  variant: ToastVariant;
}

export interface GlobalToastModel {
  list: GlobalToastConfig[];
  showToast: (config: GlobalToastConfig) => void;
  hideToast: (index: number) => void;
}
