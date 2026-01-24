import { useMemo } from 'react';
import clsx from 'clsx';
import { ComponentDefaultProps } from '../../models/component-props.model';
import { ChildrenComponentProps } from '../../models/component-with-chilren.model';

export default function OptionList({ className, children, id }: ComponentDefaultProps & ChildrenComponentProps) {
  const classes = useMemo(() => clsx('!flex', 'flex-col', 'gap-2', 'dropdown-menu', className), [className]);

  return (
    <ul
      id={id}
      className={classes}
    >
      {children}
    </ul>
  );
}
