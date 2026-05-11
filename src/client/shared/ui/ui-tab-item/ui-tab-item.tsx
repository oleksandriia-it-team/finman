import { cn } from '@frontend/shared/utils/cn.util';
import type { UiTabItemProps } from '@frontend/ui/ui-tab-item/props/ui-tab-item-props';
import './ui-tab-item.scss';

export function UiTabItem({ children, className, isActive, ...props }: UiTabItemProps) {
  const classes = cn('ui-tab-item', isActive && 'ui-tab-item--active', className);
  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}
