import { FinResponsiveMenuItemProps } from '@frontend/components/responsive-menu-item/props/responsive-menu-item.props';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { cn } from '@frontend/shared/utils/cn.util';

export function FinResponsiveMenuItem({ className, icon, name, variant = 'default' }: FinResponsiveMenuItemProps) {
  return (
    <li
      key={name}
      className={cn('list-none w-fit', className)}
    >
      <UiButton
        paddingNone
        bgNone
        variant={variant}
      >
        <UiSvgIcon
          name={icon}
          size="sm"
        />

        {name}
      </UiButton>
    </li>
  );
}
