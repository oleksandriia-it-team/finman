export interface ToastConfig {
  type: 'success' | 'error' | 'info';
  title?: string;
  message: string;
  duration?: number;
  canClose?: boolean;
}
