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
  type,
  borderNone,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      type={!asChild ? (type ?? 'button') : undefined}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-outlined={isOutlined ?? false}
      data-rounded={isRoundedFull}
      data-bg-none={bgNone}
      className={cn('btn cursor-pointer', borderNone && 'border-0', className)}
      {...props}
    />
  );
}
