'use client';

import { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { useUserGuard } from '@frontend/entities/profile/auth-guard.hook';
import { AuthorizedUserProvider } from '@frontend/shared/services/user-information/authorized-user.hook';
import { ProfileSidebar } from '@frontend/widgets/profile-sidebar/profile-sidebar';

export default function UserLayoutPage({ children }: ChildrenComponentProps) {
  const user = useUserGuard();

  if (!user) {
    return null;
  }

  return (
    <AuthorizedUserProvider>
      <div className="size-full flex">
        <ProfileSidebar />
        <div className="flex-1">{children}</div>
        {/*<UserMobileNavigationBar />*/}
      </div>
    </AuthorizedUserProvider>
  );
}
