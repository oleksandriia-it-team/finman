'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { useShallow } from 'zustand/react/shallow';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import type { AuthGuardProps } from '@frontend/entities/user-information/props/auth-guard.props';
import { RoleEnum } from '@common/domains/user/enums/role.enum';

export function RoleGuard({ children, routePath = '/profile' }: AuthGuardProps) {
  const { userInfoState, userInformation } = useUserInformation(
    useShallow((state) => ({ userInformation: state.userInformation, userInfoState: state.userInfoState })),
  );

  const router = useRouter();
  const pathName = usePathname();

  const isAdmin = !!(userInformation?.online && userInformation.role === RoleEnum.Admin);

  useEffect(() => {
    if (userInfoState !== PromiseState.Success) {
      return;
    }
    if (!userInformation || !isAdmin) {
      router.push(routePath);
    }
  }, [routePath, router, userInformation, pathName, userInfoState, isAdmin]);

  if (userInfoState === PromiseState.Loading) {
    return <span>Завантаження</span>;
  }

  if (userInfoState === PromiseState.Error) {
    return <span>Помилка завантаження користувача</span>;
  }

  if (!userInformation || !isAdmin) {
    return <span>Доступ заборонено. Переадресація...</span>;
  }

  return children;
}
