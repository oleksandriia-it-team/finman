'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUserInformation } from './use-user-information.store';
import { useShallow } from 'zustand/react/shallow';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import type { AuthGuardProps } from '@frontend/entities/user-information/props/auth-guard.props';

export function AuthGuard({ children, routePath = '/login' }: AuthGuardProps) {
  const { userInfoState, userInformation } = useUserInformation(
    useShallow((state) => ({ userInformation: state.userInformation, userInfoState: state.userInfoState })),
  );
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (userInfoState !== PromiseState.Success) {
      return;
    }
    if (!userInformation && pathName != routePath) {
      router.push(routePath);
    }
  }, [routePath, router, userInformation, pathName, userInfoState]);

  if (userInfoState === PromiseState.Loading) {
    return <span>Завантаження</span>;
  }

  if (userInfoState === PromiseState.Error) {
    return <span>Помилка завантаження користувача</span>;
  }

  return children;
}
