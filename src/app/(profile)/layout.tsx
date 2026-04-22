import { AuthGuard } from '@frontend/entities/user-information/auth-guard';
import { type ChildrenComponentProps } from '../../client/shared/models/component-with-chilren.model';
import { AuthorizedUserProvider } from '@frontend/entities/user-information/authorized-user.hook';

export default function UserProfilePage({ children }: ChildrenComponentProps) {
  return (
    <AuthGuard>
      <AuthorizedUserProvider>{children}</AuthorizedUserProvider>
    </AuthGuard>
  );
}
