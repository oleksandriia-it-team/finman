'use client';

import { type ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { useUserGuard } from '@frontend/entities/profile/auth-guard.hook';
import { AuthorizedUserProvider } from '@frontend/shared/services/user-information/authorized-user.hook';
import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import { cn } from '@frontend/shared/utils/cn.util';
import { ProfileMobileNavbar } from '@frontend/widgets/profile-mobile-navbar/profile-mobile-navbar';
import { ProfileSidebar } from '@frontend/widgets/profile-sidebar/profile-sidebar';

export default function UserLayoutPage({ children }: ChildrenComponentProps) {
  const user = useUserGuard();
  const isMobile = useIsMobile();

  if (!user) {
    return null;
  }

  return (
    <AuthorizedUserProvider>
      <div className={cn('size-full flex', isMobile && 'flex-col')}>
        {!isMobile && <ProfileSidebar />}

        <div className="flex-1">{children}</div>

        {isMobile && <ProfileMobileNavbar />}
      </div>
    </AuthorizedUserProvider>
  );
}
