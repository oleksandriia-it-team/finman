'use client';

import { FinErrorShort } from '@frontend/components/error/fin-error-short';
import { useTranslations } from 'next-intl';
import { ErrorTexts } from '@common/constants/error-texts.constant';

export default function NotFoundPage() {
  const t = useTranslations();

  return (
    <FinErrorShort
      status={404}
      message={t(ErrorTexts.PageNotFound)}
    />
  );
}
