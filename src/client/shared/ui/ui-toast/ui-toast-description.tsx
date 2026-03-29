import { Toast } from 'radix-ui';

export function UiToastDescription(props: Toast.ToastDescriptionProps) {
  return (
    <p
      data-slot="toast-description"
      {...props}
    />
  );
}
