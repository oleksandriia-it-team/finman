import { ErrorLogPageHeader } from '@frontend/entities/error-log/error-log-page-header/error-log-header';
import type { ErrorLogPageLayoutProps } from '@frontend/features/admin/error-log/props/error-log-layout.props';

export function ErrorLogPageLayout({ breadcrumbs, actions, children }: ErrorLogPageLayoutProps) {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-background">
      <ErrorLogPageHeader
        breadcrumbs={breadcrumbs}
        actions={actions}
      />

      <main className="flex-1 min-h-0 overflow-hidden">{children}</main>
    </div>
  );
}
