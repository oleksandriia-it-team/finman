import { type ComponentProps, type MouseEventHandler } from 'react';

export interface PaginationItemProps extends Omit<ComponentProps<'li'>, 'onClick'> {
  isActive?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}
