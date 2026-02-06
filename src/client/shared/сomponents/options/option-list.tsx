import { useMemo } from 'react';
import clsx from 'clsx';
import { ComponentDefaultProps } from '../../props/component.props';
import { ChildrenComponentProps } from '../../models/component-with-chilren.model';

export default function OptionList({ className, children, id }: ComponentDefaultProps & ChildrenComponentProps) {
  const classes = useMemo(() => clsx('!block', 'dropdown-menu', className), [className]);

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
