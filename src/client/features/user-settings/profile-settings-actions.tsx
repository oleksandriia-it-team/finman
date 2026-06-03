'use client';

import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { UiConfirmModal } from '@frontend/components/confirm-modal/fin-confirm-modal';
import type { ProfileSettingsActionsProps } from '@frontend/features/user-settings/props/profile-settings-actions.props';
import { useTranslations } from 'next-intl';

export function ProfileSettingsActions({ isOnline, isPending, isDirty, onLogout }: ProfileSettingsActionsProps) {
  const t = useTranslations('userSettings.actions');

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      {isOnline && (
        <UiConfirmModal
          onConfirm={onLogout}
          title={t('logoutConfirm.title')}
          description={t('logoutConfirm.description')}
          confirmLabel={t('logoutConfirm.confirm')}
          confirmVariant="destructive"
          trigger={
            <UiButton
              type="button"
              variant="destructive"
              isOutlined
              className="gap-2"
            >
              <UiSvgIcon name="box-arrow-right" />
              {t('logout')}
            </UiButton>
          }
        />
      )}

      <UiButton
        type="submit"
        variant="primary"
        disabled={isPending || !isDirty}
      >
        {t('save')}
      </UiButton>
    </div>
  );
}
