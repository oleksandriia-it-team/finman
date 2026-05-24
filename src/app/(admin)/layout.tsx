import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { AuthGuard } from '@frontend/entities/auth/auth-guard';
import { RoleGuard } from '@frontend/entities/auth/role-guard';
import { AdminSidebar } from '@frontend/widgets/admin-sidebar/admin-sidebar';
import { AuthorizedUserProvider } from '@frontend/entities/auth/authorized-user.hook';

export default function AdminLayout({ children }: ChildrenComponentProps) {
  return (
    <AuthGuard>
      <RoleGuard>
        <AuthorizedUserProvider>
          <div className="flex h-full w-full overflow-hidden">
            <AdminSidebar />
            <main className="flex-1 overflow-auto bg-background">{children}</main>
          </div>
        </AuthorizedUserProvider>
      </RoleGuard>
    </AuthGuard>
  );
}
