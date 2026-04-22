'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { useEffect } from 'react';
import { WorkMode } from '@common/enums/work-mode.enum';

export function useUserGuard(routePath?: string) {
  const user = useUserInformation((state) => state.userInformation);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const workMode = localStorage.getItem('workMode');
    const isOffline = workMode === WorkMode.Offline;
    const localUser = localStorage.getItem('userInfo');

    const hasToken = document.cookie.split(';').some((item) => item.trim().startsWith('token='));

    const isAuthenticated = isOffline ? !!localUser : !!user || hasToken;

    if (!isAuthenticated) {
      if (pathName !== '/signup') {
        router.push('/signup');
      }
      return;
    }

    if (routePath && pathName !== routePath) {
      router.push(routePath);
    }
  }, [routePath, router, user, pathName]);

  return user;
}
