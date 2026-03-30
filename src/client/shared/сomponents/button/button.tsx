'use client';

import { ButtonProps, ButtonVariant } from './props/button.props';
import { useMemo } from 'react';
import clsx from 'clsx';
import { SizeVariantModel } from '../../models/size-variant.model';
import './styles/button-styles.scss';

const variants: Record<ButtonVariant, string> = {
  danger: 'btn-danger',
  warning: 'btn-warning',
  info: 'btn-info',
  success: 'btn-success',
  default: '!text-spell-basic !bg-spell-revert',
  purpleGradient: 'purple-gradient-btn',
};

const outlineVariants: Record<ButtonVariant, string> = {
  danger: 'btn-outline-danger',
  warning: 'btn-outline-warning',
  info: 'btn-outline-info',
  success: 'btn-outline-success',
  default: '!border-solid !border-px !border-spell-basic !text-spell-basic',
  purpleGradient: 'purple-outlined-gradient-btn gradient-text',
};

const textSizeVariants: Record<SizeVariantModel, string> = {
  default: 'text-base',
  sm: 'text-sm',
  lg: 'text-lg',
};

const buttonSizeVariants: Partial<Record<SizeVariantModel, string>> = {
  sm: 'btn-sm',
  lg: 'btn-lg',
};

export default function Button({
  size = 'default',
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
      textSizeVariants[size],
      buttonSizeVariants[size],
      !isOutlined && variants[variant],
      isOutlined && outlineVariants[variant],
      isRoundedFull && '!rounded-full',
      bgNone && '!bg-transparent',
    );
  }, [className, isOutlined, isRoundedFull, variant, size, bgNone]);

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
