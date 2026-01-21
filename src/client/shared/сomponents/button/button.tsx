'use client';

import { ButtonVariant, ButtonModel } from './models/button.model';
import { useMemo } from 'react';
import clsx from 'clsx';

const variants: Record<ButtonVariant, string> = {
  danger: 'btn-danger',
  warning: 'btn-warning',
  info: 'btn-info',
  success: 'btn-success',
};

const outlineVariants: Record<ButtonVariant, string> = {
  danger: 'btn-outline-danger',
  warning: 'btn-outline-warning',
  info: 'btn-outline-info',
  success: 'btn-outline-success',
};

export default function Button({
  className,
  onClick,
  type,
  children,
  isOutlined = false,
  variant,
  isRoundedFull = false,
}: ButtonModel) {
  const classes = useMemo(() => {
    return clsx(
      ['btn', '!flex', 'items-center', 'justify-center'],
      className,
      !isOutlined && variants[variant],
      isOutlined && outlineVariants[variant],
      isRoundedFull && '!rounded-full',
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
