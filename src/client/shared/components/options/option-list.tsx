import { useMemo } from 'react';
import { ComponentDefaultProps } from '../../props/component.props';
import { ChildrenComponentProps } from '../../models/component-with-chilren.model';
import { cn } from '../../utils/cn.util';

export default function OptionList({ className, children, id }: ComponentDefaultProps & ChildrenComponentProps) {
  const classes = useMemo(() => cn('!block', 'dropdown-menu', className), [className]);

  return (
    <ul
      id={id}
      className={classes}
      role="listbox"
    >
      {children}
    </ul>
  );
}
