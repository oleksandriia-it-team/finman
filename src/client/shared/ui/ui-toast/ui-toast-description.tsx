import { Toast } from 'radix-ui';

export function UiToastDescription(props: Toast.ToastDescriptionProps) {
  return (
    <Toast.Description
      data-slot="toast-description"
      {...props}
    />
  );
}
