import { Combobox as ComboboxPrimitive } from '@base-ui/react';

import './styles/combobox-message-styles.scss';
import { cn } from '@frontend/shared/utils/cn.util';

export function UiComboboxMessage({
  className,
  variant = 'muted',
  ...props
}: ComboboxPrimitive.Label.Props & { variant?: 'destructive' | 'muted' }) {
  return (
    <ComboboxPrimitive.Label
      data-variant={variant}
      data-slot="combobox-message"
      className={cn('combobox-message', className)}
      {...props}
    />
  );
}
