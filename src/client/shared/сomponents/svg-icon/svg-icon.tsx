import { IconSize, SvgIconProps } from './props/svg-icon.props';
import { useMemo } from 'react';
import clsx from 'clsx';

const SizeVariant: Record<IconSize, string> = {
  small: 'text-base',
  large: 'text-3xl',
};

export default function SvgIcon({ name, className, size }: SvgIconProps) {
  const classes = useMemo(
    () => clsx(className, SizeVariant[size], 'text-[currentColor]', 'bi', `bi-${name}`),
    [className, name, size],
  );

  return <i className={classes} />;
}
