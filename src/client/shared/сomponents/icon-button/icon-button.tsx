'use client';

import { IconButtonProps } from './props/icon-button.props';
import Button from '../button/button';
import SvgIcon from '../svg-icon/svg-icon';

export default function IconButton({
  icon,
  className,
  size,
  onClick = () => {},
  type,
  variant,
  isOutlined,
}: IconButtonProps) {
  return (
    <Button
      onClick={onClick}
      isOutlined={isOutlined}
      variant={variant}
      type={type}
      className={className}
      isRoundedFull={true}
    >
      <SvgIcon
        className="text-3xl"
        name={icon}
        size={size}
      />
    </Button>
  );
}
