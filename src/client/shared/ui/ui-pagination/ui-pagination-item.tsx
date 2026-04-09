import { PaginationItemProps } from '@frontend/ui/ui-pagination/props/pagination-item.props';
import { UiButton } from '@frontend/ui/ui-button/ui-button';

export function UiPaginationItem({ isActive, children, ...props }: PaginationItemProps) {
  return (
    <li
      data-slot="pagination-item"
      {...props}
    >
      <UiButton
        size="sm"
        variant={!isActive ? 'default' : 'primary'}
      >
        {children}
      </UiButton>
    </li>
  );
}
