import { ComponentPropsWithRef, useMemo } from 'react';
import { cn } from '../../utils/cn.util';

export function UiOptionList({ children, className, ...props }: ComponentPropsWithRef<'ul'>) {
  const classes = useMemo(() => cn('!block', 'dropdown-menu', className), [className]);

  return (
    <ul
      {...props}
      className={classes}
      role="listbox"
    >
      {children}
    </ul>
  );
}
