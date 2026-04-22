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

    if (isOffline) {
      const localUser = localStorage.getItem('userInfo');
      if (!localUser && pathName !== '/signup') {
        router.push('/signup');
      }
      return;
    }
    const hasToken = document.cookie.includes('token=');

    if (!user && !hasToken && pathName !== '/signup') {
      router.push('/signup');
    } else if (routePath && (user || hasToken) && pathName !== routePath) {
      router.push(routePath);
    }
  }, [routePath, router, user, pathName]);

  return user;
}
