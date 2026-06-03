'use client';

import { FinSidebarContent } from '@frontend/components/sidebar-content/fin-sidebar-content';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { useProfileNavRoutesWindow } from '@frontend/widgets/shared/profile-routes.constant';
import { useAdminTopNavItem } from '@frontend/widgets/shared/admin-routes.constant';
import { RoleEnum } from '@common/domains/user/enums/role.enum';
import type { GetUser, OnlineUser } from '@common/records/user.record';

function isOnlineUser(user: GetUser | null): user is OnlineUser {
  return Boolean(user && (user as OnlineUser).online);
}

export function ProfileSidebarContent() {
  const { userInformation } = useUserInformation();
  const profileRoutes = useProfileNavRoutesWindow();
  const adminTopNavItem = useAdminTopNavItem();
  const routes = [...profileRoutes];

  if (isOnlineUser(userInformation) && userInformation.role === RoleEnum.Admin) {
    routes.push(adminTopNavItem);
  }

  return <FinSidebarContent routes={routes} />;
}
