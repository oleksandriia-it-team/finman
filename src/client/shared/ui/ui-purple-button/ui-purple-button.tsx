'use client';

import { ButtonProps } from '../ui-button/props/button.props';
import { cn } from '../../utils/cn.util';
import { Slot } from 'radix-ui';

import '../ui-button/styles/button-variants.scss';
import './styles/purple-button.scss';

export function UiPurpleButton({
  className,
  size = 'default',
  isOutlined,
  isRoundedFull,
  bgNone,
  asChild,
  type,
  ...props
}: Omit<ButtonProps, 'variant'>) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      type={!asChild ? (type ?? 'button') : undefined}
      data-slot="button"
      data-size={size}
      data-outlined={isOutlined ?? false}
      data-rounded={isRoundedFull}
      data-bg-none={bgNone}
      className={cn(
        'btn cursor-pointer',
        isOutlined ? 'purple-outlined-gradient-btn gradient-text' : 'purple-gradient-btn',
        className,
      )}
      {...props}
    />
  );
}
