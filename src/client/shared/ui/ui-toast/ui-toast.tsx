import { Toast } from 'radix-ui';

export function UiToast(props: Toast.ToastProviderProps) {
  return <Toast.Provider {...props} />;
}
