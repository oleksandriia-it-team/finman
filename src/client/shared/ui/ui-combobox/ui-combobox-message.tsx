import { cn } from '@frontend/shared/utils/cn.util';
import { ComboboxMessageProps } from '@frontend/ui/ui-combobox/props/combobox-message.props';

import './styles/combobox-message-styles.scss';

export function UiComboboxMessage({ className, variant = 'muted', ...props }: ComboboxMessageProps) {
  return (
    <span
      data-variant={variant}
      data-slot="combobox-message"
      className={cn('combobox-message', className)}
      {...props}
    />
  );
}
