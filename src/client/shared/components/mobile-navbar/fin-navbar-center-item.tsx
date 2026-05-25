import { type MobileNavbarCenterItem } from '@frontend/components/mobile-navbar/props/mobile-navbar.props';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { useRouter } from 'next/navigation';

export function FinNavbarCenterItem({
  icon,
  url,
  size,
  iconSize,
  className,
  children,
  onClick,
  ...props
}: MobileNavbarCenterItem) {
  const router = useRouter();

  return (
    <UiIconButton
      tabIndex={-1}
      aria-hidden="true"
      bgNone={false}
      isOutlined={false}
      paddingNone
      className={cn(
        'absolute -top-6 right-1/2 translate-x-1/2 !w-14 !h-14 flex items-center justify-center',
        className,
      )}
      size={size ?? '4xl'}
      iconSize={iconSize}
      variant="primary"
      icon={icon}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
        router.push(url);
      }}
      {...props}
    >
      {children}
    </UiIconButton>
  );
}
