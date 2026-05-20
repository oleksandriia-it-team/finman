import { FinPageHeader } from '@frontend/components/page-header/fin-page-header';
import type { ErrorLogPageLayoutProps } from '@frontend/features/admin/error-log/props/error-log-layout.props';
import { UiLayoutContent } from '@frontend/ui/ui-layout-content/ui-layout-content';

export function ErrorLogPageLayout({ breadcrumbs, actions, children }: ErrorLogPageLayoutProps) {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-background">
      <FinPageHeader
        breadcrumbs={breadcrumbs}
        actions={actions}
      />
      <UiLayoutContent className="overflow-hidden">{children}</UiLayoutContent>
    </div>
  );
}
