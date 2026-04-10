import { PaginationItemProps } from '@frontend/ui/ui-pagination/props/pagination-item.props';
import { UiButton } from '@frontend/ui/ui-button/ui-button';

export function UiPaginationItem({ isActive, onClick, children, disabled, ...props }: PaginationItemProps) {
  return (
    <li
      data-slot="pagination-item"
      {...props}
    >
      <UiButton
        onClick={onClick}
        disabled={disabled}
        size="sm"
        variant={!isActive ? 'default' : 'primary'}
      >
        {children}
      </UiButton>
    </li>
  );
}
