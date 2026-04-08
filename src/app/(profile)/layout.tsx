'use client';

import { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { UserMobileNavigationBar } from '@frontend/widgets/mobile-navigation/navigation-bar/navigation-bar';
import { useUserGuard } from '@frontend/entities/profile/auth-guard.hook';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { AuthorizedUserProvider } from '@frontend/shared/services/user-information/authorized-user.hook';

export default function UserLayoutPage({ children }: ChildrenComponentProps) {
  const user = useUserGuard();
  const logout = useUserInformation((s) => s.logOut);

  if (!user) {
    return null;
  }

  return (
    <AuthorizedUserProvider>
      <div className="size-full flex flex-col">
        <div className="flex-1">{children}</div>
        <button onClick={logout}>Log out</button>
        <UserMobileNavigationBar />
      </div>
    </AuthorizedUserProvider>
  );
}
