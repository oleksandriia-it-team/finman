'use client';

import { ErrorLogsFeature } from '@frontend/features/admin/error-log/ui/error-log.feature';
import { ErrorLogPageLayout } from './error-log-layout';
import { useTranslations } from 'next-intl';

export default function ErrorLogsPage() {
  const t = useTranslations('admin.errorLogPage');
  return (
    <ErrorLogPageLayout breadcrumbs={[{ label: t('breadcrumb') }]}>
      <ErrorLogsFeature />
    </ErrorLogPageLayout>
  );
}
