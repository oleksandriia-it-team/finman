import type { IconBadgeProps } from '@frontend/ui/ui-icon-badge/props/icon-badge.props';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/icon-badge-variants.scss';

export function UiIconBadge({
  name,
  className,
  children,
  variant = 'default',
  size = 'default',
  isRoundedFull,
  isReversed,
  bgNone,
  ...props
}: IconBadgeProps) {
  return (
    <UiSvgIcon
      name={name}
      className={cn('icon-badge', isRoundedFull && '!rounded-full', bgNone && '!bg-[transparent]', className)}
      data-variant={variant}
      data-size={size}
      data-reverse={isReversed ?? false}
      {...props}
    >
      {children}
    </UiSvgIcon>
  );
}
