import { OptionItemPropsModel } from './models/option-item-props.model';
import { useMemo } from 'react';
import clsx from 'clsx';

export default function OptionItem({ className, children, key, onClick, selected, id }: OptionItemPropsModel) {
  const classes = useMemo(() => clsx('dropdown-item', 'cursor-pointer', selected && 'active', className), [className]);

  return (
    <li
      id={id}
      key={key}
      onClick={onClick}
      className={classes}
    >
      {children}
    </li>
  );
}
