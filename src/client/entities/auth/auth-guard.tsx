'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { useShallow } from 'zustand/react/shallow';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import type { AuthGuardProps } from '@frontend/entities/auth/props/auth-guard.props';
import { useTranslations } from 'next-intl';

export function AuthGuard({ children, routePath = '/login' }: AuthGuardProps) {
  const t = useTranslations('admin.auth');
  const { userInfoState, userInformation } = useUserInformation(
    useShallow((state) => ({ userInformation: state.userInformation, userInfoState: state.userInfoState })),
  );

  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (userInfoState === PromiseState.Loading) {
      return;
    }
    if (!userInformation) {
      router.push(routePath);
    }
  }, [routePath, router, userInformation, pathName, userInfoState]);

  if (userInfoState === PromiseState.Loading) {
    return <span>{t('loading')}</span>;
  }

  if (userInfoState === PromiseState.Error) {
    return <span>{t('userLoadError')}</span>;
  }

  if (!userInformation) {
    return <span>{t('notAuthorized')}</span>;
  }

  return children;
}
