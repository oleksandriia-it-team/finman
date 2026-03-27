'use client';

import { IconButtonProps } from './props/icon-button.props';
import { UiButton } from '@frontend/ui/ui-button/button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/svg-icon';

export function UiIconButton({
  icon,
  className,
  size,
  onClick = () => {},
  type,
  variant = 'default',
  isOutlined = true,
  bgNone = true,
}: IconButtonProps) {
  return (
    <UiButton
      onClick={onClick}
      isOutlined={isOutlined}
      variant={variant}
      type={type}
      className={className}
      isRoundedFull={true}
      bgNone={bgNone}
    >
      <UiSvgIcon
        name={icon}
        size={size}
      />
    </UiButton>
  );
}
