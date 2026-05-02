import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { NotAuthGuard } from '@frontend/entities/profile/not-auth-guard';
import { RecoveryFlowGuard } from '@frontend/entities/auth/recovery-guard';

export default function AuthLayout({ children }: ChildrenComponentProps) {
  return (
    <NotAuthGuard>
      <RecoveryFlowGuard>{children}</RecoveryFlowGuard>
    </NotAuthGuard>
  );
}
