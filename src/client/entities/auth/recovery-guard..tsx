import type { RecoveryFlowGuardProps } from '@frontend/entities/auth/props/recovery-guard.props';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoveryStore } from '@frontend/entities/auth/recovery.store';
import { useEffect } from 'react';

export function RecoveryFlowGuard({ children, routePath = '/recovery' }: RecoveryFlowGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const email = useRecoveryStore((state) => state.email);
  const code = useRecoveryStore((state) => state.code);

  useEffect(() => {
    if (pathname === '/auth/confirm-code' && !email) {
      router.replace(routePath);
    }

    if (pathname === '/auth/reset-password' && (!email || !code)) {
      router.replace(routePath);
    }
  }, [pathname, email, code, router, routePath]);

  return children;
}
