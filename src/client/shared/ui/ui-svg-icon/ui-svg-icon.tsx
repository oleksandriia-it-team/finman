import { SvgIconProps } from './props/svg-icon.props';
import { useMemo } from 'react';
import { useDynamicKey } from '../../hooks/dynamic-key/dynamic-key.hook';
import { cn } from '../../utils/cn.util';

import './styles/svg-icon-sizes.scss';

export function UiSvgIcon({ name, size, className, ...props }: SvgIconProps) {
  const dynamicKey = useDynamicKey(name);

  const classes = useMemo(() => cn(className, 'text-[currentColor]', 'bi', `bi-${name}`), [className, name]);

  return (
    <i
      data-size={size}
      className={classes}
      key={dynamicKey}
      {...props}
    />
  );
}
