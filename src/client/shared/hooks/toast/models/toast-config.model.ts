export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface ToastConfig {
  type: ToastVariant;
  title?: string;
  message: string;
  duration?: number;
  canClose?: boolean;
}
