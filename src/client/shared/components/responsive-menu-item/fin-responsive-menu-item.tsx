import { FinResponsiveMenuItemProps } from '@frontend/components/responsive-menu-item/props/responsive-menu-item.props';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';

export function FinResponsiveMenuItem({ className, icon, name }: FinResponsiveMenuItemProps) {
  return (
    <li
      key={name}
      className={className}
    >
      <UiButton>
        <UiSvgIcon
          name={icon}
          size="sm"
        />

        {name}
      </UiButton>
    </li>
  );
}
