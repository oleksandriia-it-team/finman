import { ComponentProps } from 'react';
import { Toast } from 'radix-ui';

export type ToastVisibleProps = Pick<ComponentProps<typeof Toast.Root>, 'open' | 'onOpenChange'>;
