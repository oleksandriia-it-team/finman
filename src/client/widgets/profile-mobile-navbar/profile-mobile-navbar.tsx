import { FinNavigationBar } from '@frontend/components/mobile-navbar/fin-navigation-bar';
import { profileNavRoutesMobile } from '@frontend/widgets/shared/profile-routes.constant';

export function ProfileMobileNavbar() {
  return (
    <FinNavigationBar
      centerButton={{ icon: 'plus', url: 'regular-operations/add' }}
      routes={profileNavRoutesMobile}
    />
  );
}
