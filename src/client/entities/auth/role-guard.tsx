'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { useShallow } from 'zustand/react/shallow';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import type { AuthGuardProps } from '@frontend/entities/auth/props/auth-guard.props';
import { RoleEnum } from '@common/domains/user/enums/role.enum';
import { FinLoader } from '@frontend/shared/components/loader/fin-loader';
import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';
import { useTranslations } from 'next-intl';

export function RoleGuard({ children, routePath = '/profile' }: AuthGuardProps) {
  const t = useTranslations('admin.auth');
  const { userInfoState, userInformation } = useUserInformation(
    useShallow((state) => ({ userInformation: state.userInformation, userInfoState: state.userInfoState })),
  );

  const router = useRouter();

  const isAdmin = !!(userInformation?.online && userInformation.role === RoleEnum.Admin);

  useEffect(() => {
    if (userInfoState !== PromiseState.Success) {
      return;
    }
    if (!userInformation || !isAdmin) {
      router.push(routePath);
    }
  }, [routePath, router, userInformation, userInfoState, isAdmin]);

  if (userInfoState === PromiseState.Loading) {
    return <FinLoader />;
  }

  if (userInfoState === PromiseState.Error) {
    return (
      <FinErrorWidget
        status={500}
        message={t('userLoadError')}
      />
    );
  }

  if (!userInformation || !isAdmin) {
    return <FinLoader />;
  }

  return children;
}
