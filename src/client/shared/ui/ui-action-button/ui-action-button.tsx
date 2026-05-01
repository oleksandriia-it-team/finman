import type { ActionsButtonProps } from '@frontend/ui/ui-action-button/props/actions-button.props';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';

import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiIconBadge } from '@frontend/ui/ui-icon-badge/ui-icon-badge';

export function UiActionButton({
  className,
  children,
  type = 'button',
  icon,
  iconVariant,
  variant,
  size,
  ...props
}: ActionsButtonProps) {
  return (
    <UiButton
      borderNone
      type={type}
      variant={variant}
      size={size}
      className={cn('flex gap-3', className)}
      opacity
      heightAuto
      {...props}
    >
      <UiIconBadge
        name={icon}
        variant={iconVariant}
        size={size}
      />

      <div className="flex-1 flex flex-col gap-px text-left">{children}</div>

      <UiSvgIcon name="arrow-right" />
    </UiButton>
  );
}
