'use client';

import { UiButton } from '../ui-button/ui-button';
import { IconButtonProps } from './props/icon-button.props';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';

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
