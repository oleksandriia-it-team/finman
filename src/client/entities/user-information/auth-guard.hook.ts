'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useUserInformation } from './use-user-information.store';
import { useEffect } from 'react';

export function useUserGuard(routePath?: string) {
  const user = useUserInformation((state) => state.userInformation);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (!user && pathName != '/registration/form') {
      router.push('/registration/form');
    } else if (routePath && user) {
      router.push(routePath);
    }
  }, [routePath, router, user, pathName]);
}
