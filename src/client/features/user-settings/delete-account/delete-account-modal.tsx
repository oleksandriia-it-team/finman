'use client';

import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { UiConfirmModal } from '@frontend/components/confirm-modal/fin-confirm-modal';
import { useDeleteAccount } from '@frontend/features/user-settings/delete-account/delete-account.hook';
import { useTranslations } from 'next-intl';

export function DeleteAccountModal() {
  const { mutate, isPending } = useDeleteAccount();
  const t = useTranslations('userSettings.actions');
  const tModal = useTranslations('userSettings.actions.deleteAccountConfirm');

  return (
    <UiConfirmModal
      onConfirm={() => mutate()}
      title={tModal('title')}
      description={tModal('description')}
      confirmLabel={tModal('confirm')}
      cancelLabel={tModal('cancel')}
      confirmVariant="destructive"
      trigger={
        <UiButton
          type="button"
          variant="destructive"
          isOutlined
          className="gap-2"
          disabled={isPending}
        >
          <UiSvgIcon name="trash" />
          {t('deleteAccount')}
        </UiButton>
      }
    />
  );
}
