import { FinPageHeader } from '@frontend/components/page-header/fin-page-header';
import type { ErrorLogPageLayoutProps } from '@frontend/features/admin/error-log/props/error-log-layout.props';

export function ErrorLogPageLayout({ breadcrumbs, actions, children }: ErrorLogPageLayoutProps) {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-background">
      <FinPageHeader
        breadcrumbs={breadcrumbs}
        actions={actions}
      />

      <div className="flex-1 min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}
