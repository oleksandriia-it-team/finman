'use client';

import { type IconButtonProps } from './props/icon-button.props';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';

import './styles/icon-button-variant.scss';
import { Slot } from 'radix-ui';
import { cn } from '@frontend/shared/utils/cn.util';

export function UiIconButton({
  icon,
  className,
  size,
  asChild,
  variant = 'default',
  isRoundedFull = true,
  isOutlined = true,
  bgNone = true,
  type,
  widthAuto,
  borderNone,
  ...props
}: IconButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      type={!asChild ? (type ?? 'button') : undefined}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-outlined={isOutlined}
      data-rounded={isRoundedFull}
      data-bg-none={bgNone}
      className={cn('icon-btn cursor-pointer', widthAuto && 'w-[revert]', borderNone && '!border-none', className)}
      {...props}
    >
      <UiSvgIcon
        aria-hidden
        name={icon}
        size={size}
      />
    </Comp>
  );
}
