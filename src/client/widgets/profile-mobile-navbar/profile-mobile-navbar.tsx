import { FinNavigationBar } from '@frontend/components/mobile-navbar/fin-navigation-bar';
import { useProfileNavRoutesMobile } from '@frontend/widgets/shared/profile-routes.constant';
import { useUserNavStoreHook } from '@frontend/widgets/profile-mobile-navbar/user-nav-store.hook';

export function ProfileMobileNavbar() {
  const hidePlusButton = useUserNavStoreHook((state) => state.isPlusHidden);
  const centerButtonInfo = useUserNavStoreHook((state) => state.centerButton);
  const routes = useProfileNavRoutesMobile();

  return (
    <FinNavigationBar
      centerButton={hidePlusButton ? undefined : centerButtonInfo}
      routes={routes}
    />
  );
}
