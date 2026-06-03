'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { useShallow } from 'zustand/react/shallow';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import type { AuthGuardProps } from './props/auth-guard.props';
import { useTranslations } from 'next-intl';

export function NotAuthGuard({ children, routePath = '/profile' }: AuthGuardProps) {
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
    if (userInformation) {
      router.push(routePath);
    }
  }, [routePath, router, userInformation, pathName, userInfoState]);

  if (userInfoState === PromiseState.Loading) {
    return <span>{t('loading')}</span>;
  }
  if (userInformation) {
    return <span>{t('alreadyAuthorized')}</span>;
  }

  return children;
}
