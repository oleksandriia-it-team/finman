import { Toast } from 'radix-ui';

export function UiToast({ children, ...props }: Toast.ToastProviderProps) {
  return <Toast.Provider {...props}>{children}</Toast.Provider>;
}
