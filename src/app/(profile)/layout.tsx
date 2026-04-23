import { AuthGuard } from '@frontend/entities/user-information/auth-guard';
import { AuthorizedUserProvider } from '@frontend/entities/user-information/authorized-user.hook';
import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';

export default function UserProfilePage({ children }: ChildrenComponentProps) {
  return (
    <AuthGuard>
      <AuthorizedUserProvider>{children}</AuthorizedUserProvider>
    </AuthGuard>
  );
}
