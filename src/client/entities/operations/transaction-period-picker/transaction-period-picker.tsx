import { UiButton } from '@frontend/ui/ui-button/ui-button';
import type { ButtonProps } from '@frontend/ui/ui-button/props/button.props';

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
