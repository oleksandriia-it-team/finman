import { type ComponentPropsWithRef } from 'react';

export interface ToastTriggerProps extends ComponentPropsWithRef<'button'> {
  asChild?: boolean | undefined;
}
