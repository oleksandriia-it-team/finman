import { IconSize, SvgIconProps } from './props/svg-icon.props';
import { useMemo } from 'react';
import clsx from 'clsx';
import { useDynamicKey } from '../../hooks/dynamic-key/dynamic-key.hook';

const SizeVariant: Record<IconSize, string> = {
  small: 'text-base',
  large: 'text-3xl',
};

export default function SvgIcon({ name, className, size }: SvgIconProps) {
  const dynamicKey = useDynamicKey(name);

  const classes = useMemo(
    () => clsx(className, SizeVariant[size], 'text-[currentColor]', 'bi', `bi-${name}`),
    [className, name, size],
  );

  return (
    <i
      className={classes}
      key={dynamicKey}
    />
  );
}
