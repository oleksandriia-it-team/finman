import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiIconBadge } from '@frontend/ui/ui-icon-badge/ui-icon-badge';
import type { ButtonProps } from '@frontend/ui/ui-button/props/button.props';

interface UiFilterPillProps extends ButtonProps {
  isActive?: boolean;
  icon?: string;
  setActive: (value: boolean) => void;
}

export function UiFilterPill({
  variant,
  size,
  icon,
  isActive = false,
  setActive,
  children,
  ...props
}: UiFilterPillProps) {
  return (
    <UiButton
      onClick={() => setActive(!isActive)}
      isRoundedFull
      size={size}
      borderNone={false}
      borderBold={isActive}
      isOutlined={isActive}
      variant={isActive ? 'primary' : 'default'}
      {...props}
    >
      {icon && (
        <UiIconBadge
          variant={variant}
          isRoundedFull
          isReversed
          size="sm"
          name={icon}
        />
      )}

      {children}
    </UiButton>
  );
}
