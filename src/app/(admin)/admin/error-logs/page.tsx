'use client';

import { ErrorLogsFeature } from '@frontend/features/admin/error-log/ui/error-log.feature';
import { ErrorLogPageLayout } from '@frontend/features/admin/error-log/ui/error-log-layout';

export default function ErrorLogsPage() {
  return (
    <ErrorLogPageLayout breadcrumbs={[{ label: 'Логер помилок' }]}>
      <ErrorLogsFeature />
    </ErrorLogPageLayout>
  );
}
