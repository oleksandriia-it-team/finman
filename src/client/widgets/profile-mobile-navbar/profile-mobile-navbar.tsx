import { FinNavigationBar } from '@frontend/components/mobile-navbar/fin-navigation-bar';
import { profileNavRoutesMobile } from '@frontend/widgets/shared/profile-routes.constant';
import { useUserNavStoreHook } from '@frontend/widgets/profile-mobile-navbar/user-nav-store.hook';

export function ProfileMobileNavbar() {
  const hidePlusButton = useUserNavStoreHook((state) => state.isPlusHidden);

  return (
    <FinNavigationBar
      centerButton={hidePlusButton ? undefined : { icon: 'plus', url: 'regular-operations/add' }}
      routes={profileNavRoutesMobile}
    />
  );
}
