import { Toast } from 'radix-ui';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiToastContentProps } from './props/toast-content.props';

import './styles/toast-content-styles.scss';
import './styles/toast-variants.scss';

export function UiToastContent({ className, variant = 'default', ...props }: UiToastContentProps) {
  return (
    <Toast.Root
      data-slot="toast-content"
      data-variant={variant}
      className={cn(className, 'text-sm rounded-md shadow-lg p-3 toast-content')}
      {...props}
    />
  );
}
