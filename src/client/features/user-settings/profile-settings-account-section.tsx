'use client';

import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { ProfileSection } from './profile-section';
import { LatinUsernamePattern } from '@common/constants/latin-pattern.constant';
import { useTranslations } from 'next-intl';

export function ProfileSettingsAccountSection() {
  const t = useTranslations('userSettings.account');

  return (
    <ProfileSection title={t('title')}>
      <FinControlledInput
        name="name"
        label={t('nameLabel')}
        placeholder={t('namePlaceholder')}
        pattern={LatinUsernamePattern}
      />
    </ProfileSection>
  );
}
