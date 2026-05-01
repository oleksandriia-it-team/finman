import type { ButtonProps } from '@base-ui/react';
import { UiButton } from '@frontend/ui/ui-button/ui-button';

export function TransactionPeriodPicker({ children, className, ...props }: ButtonProps) {
  return (
    <UiButton
      className={className}
      {...props}
    >
      {children}
    </UiButton>
  );
}
