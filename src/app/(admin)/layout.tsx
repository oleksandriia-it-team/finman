import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { AuthGuard } from '@frontend/entities/user-information/auth-guard';
import { RoleGuard } from '@frontend/entities/user-information/role-guard';
import { AdminSidebar } from '@frontend/features/admin/admin-sidebar';

export default function AdminLayout({ children }: ChildrenComponentProps) {
  return (
    <AuthGuard>
      <RoleGuard>
        <div className="flex h-full w-full overflow-hidden">
          <AdminSidebar />
          <main className="flex-1 overflow-auto bg-background">{children}</main>
        </div>
      </RoleGuard>
    </AuthGuard>
  );
}
