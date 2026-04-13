import { FinNavigationBar } from '@frontend/components/mobile-navbar/fin-navigation-bar';
import { profileNavRoutes } from '@frontend/widgets/shared/profile-routes.constant';

export function ProfileMobileNavbar() {
  return (
    <FinNavigationBar
      centerButton={{ icon: 'plus', url: './add' }}
      routes={profileNavRoutes}
    />
  );
}
