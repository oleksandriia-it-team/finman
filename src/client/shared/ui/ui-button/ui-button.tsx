'use client';

import { ButtonProps } from './props/button.props';
import { cn } from '../../utils/cn.util';
import { Slot } from 'radix-ui';

import './styles/button-variants.scss';

export function UiButton({
  className,
  variant = 'default',
  size = 'default',
  isOutlined,
  isRoundedFull,
  bgNone,
  asChild,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-outlined={isOutlined ?? false}
      data-rounded={isRoundedFull}
      data-bg-none={bgNone}
      className={cn('btn', className)}
      {...props}
    />
  );
}
