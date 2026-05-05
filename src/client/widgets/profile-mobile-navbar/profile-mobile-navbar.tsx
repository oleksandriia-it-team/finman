import { FinNavigationBar } from '@frontend/components/mobile-navbar/fin-navigation-bar';
import { profileNavRoutesMobile } from '@frontend/widgets/shared/profile-routes.constant';
import { useUserNavStoreHook } from '@frontend/widgets/profile-mobile-navbar/user-nav-store.hook';

export function ProfileMobileNavbar() {
  const hidePlusButton = useUserNavStoreHook((state) => state.isPlusHidden);
  const centerButtonUrl = useUserNavStoreHook((state) => state.centerButtonUrl);

  return (
    <FinNavigationBar
      centerButton={hidePlusButton ? undefined : { icon: 'plus', url: centerButtonUrl }}
      routes={profileNavRoutesMobile}
    />
  );
}
