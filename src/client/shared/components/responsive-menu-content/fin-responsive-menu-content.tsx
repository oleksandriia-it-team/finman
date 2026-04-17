import { UiResponsiveMenuContent } from '@frontend/ui/ui-responsive-menu/ui-responsive-menu-content';
import { FinResponsiveMenuContentProps } from '@frontend/components/responsive-menu-content/props/responsive-menu-content.props';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';

export function FinResponsiveMenuContent({ className, items }: FinResponsiveMenuContentProps) {
  return (
    <UiResponsiveMenuContent className={className ?? ''}>
      {items.map((item) => (
        <li key={item.name}>
          <UiButton>
            <UiSvgIcon
              name={item.icon}
              size="sm"
            />

            {item.name}
          </UiButton>
        </li>
      ))}
    </UiResponsiveMenuContent>
  );
}
