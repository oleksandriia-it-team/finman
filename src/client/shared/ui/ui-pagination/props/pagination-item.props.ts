import { ComponentProps } from 'react';

export interface PaginationItemProps extends ComponentProps<'li'> {
  isActive?: boolean;
}
