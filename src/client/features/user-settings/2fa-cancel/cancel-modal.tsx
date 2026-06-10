'use client';

import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { UiConfirmModal } from '@frontend/components/confirm-modal/fin-confirm-modal';
import { useCancel2FA } from '@frontend/features/user-settings/2fa-cancel/cancel-2fa.hook';
import { useTranslations } from 'next-intl';

export function TwoFactorCancelModal() {
  const { mutate } = useCancel2FA();
  const t = useTranslations('userSettings.twoFactor');
  const tModal = useTranslations('userSettings.twoFactor.cancelModal');

  return (
    <UiConfirmModal
      trigger={
        <UiButton
          isOutlined
          variant="destructive"
        >
          <UiSvgIcon name="arrow-repeat" />
          {t('resetButton')}
        </UiButton>
      }
      title={tModal('title')}
      description={tModal('description')}
      confirmLabel={tModal('confirm')}
      cancelLabel={tModal('cancel')}
      onConfirm={mutate}
    />
  );
}
