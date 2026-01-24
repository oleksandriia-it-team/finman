import { OptionItemProps } from './props/option-item.props';
import { useMemo } from 'react';
import clsx from 'clsx';

export default function OptionItem({ className, children, onClick, selected, id }: OptionItemProps) {
  const classes = useMemo(() => clsx('dropdown-item', 'cursor-pointer', selected && 'active', className), [className]);

  return (
    <li
      id={id}
      onClick={onClick}
      className={classes}
    >
      {children}
    </li>
  );
}
