'use client';

import { ButtonProps, ButtonVariant } from './props/button.props';
import { useMemo } from 'react';
import clsx from 'clsx';

const variants: Record<ButtonVariant, string> = {
  danger: 'btn-danger',
  warning: 'btn-warning',
  info: 'btn-info',
  success: 'btn-success',
  default: '!text-spell-basic !bg-spell-revert',
};

const outlineVariants: Record<ButtonVariant, string> = {
  danger: 'btn-outline-danger',
  warning: 'btn-outline-warning',
  info: 'btn-outline-info',
  success: 'btn-outline-success',
  default: '!border-solid !border-px !border-spell-basic !text-spell-basic',
};

export default function Button({
  className,
  onClick,
  type,
  children,
  isOutlined = false,
  variant,
  isRoundedFull = false,
  bgNone = false,
}: ButtonProps) {
  const classes = useMemo(() => {
    return clsx(
      ['btn', '!flex', 'items-center', 'justify-center'],
      className,
      !isOutlined && variants[variant],
      isOutlined && outlineVariants[variant],
      isRoundedFull && '!rounded-full',
      bgNone && '!bg-transparent',
    );
  }, [className, isOutlined, isRoundedFull, variant]);

  return (
    <button
      className={classes}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
