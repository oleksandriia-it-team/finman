import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { AdminSidebar } from '@frontend/features/admin/admin-sidebar';

export default function AdminLayout({ children }: ChildrenComponentProps) {
  return (
    <div className="flex h-full w-full overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-6 bg-background">{children}</main>
    </div>
  );
}
