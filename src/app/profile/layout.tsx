'use client';

import { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { UserMobileNavigationBar } from '@frontend/widgets/mobile-navigation/navigation-bar/navigation-bar';
import { useUserGuard } from '@frontend/entities/profile/auth-guard.hook';

export default function UserLayoutPage({ children }: ChildrenComponentProps) {
  const user = useUserGuard();

  if (!user) {
    return null;
  }

  return (
    <div className="w-full h-full">
      <UserMobileNavigationBar />
      <div className="flex flex-1">{children}</div>
    </div>
  );
}
