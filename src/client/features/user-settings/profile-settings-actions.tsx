import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { UiConfirmModal } from '@frontend/components/confirm-modal/fin-confirm-modal';
import type { ProfileSettingsActionsProps } from '@frontend/features/user-settings/props/profile-settings-actions.props';

export function ProfileSettingsActions({ isOnline, isPending, isDirty, onLogout }: ProfileSettingsActionsProps) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      {isOnline && (
        <UiConfirmModal
          onConfirm={onLogout}
          title="Вийти з акаунту?"
          description="Після виходу вам потрібно буде знову увійти, щоб продовжити роботу."
          confirmLabel="Вийти"
          confirmVariant="destructive"
          trigger={
            <UiButton
              type="button"
              variant="destructive"
              isOutlined
              className="gap-2"
            >
              <UiSvgIcon name="box-arrow-right" />
              Вийти з акаунту
            </UiButton>
          }
        />
      )}

      <UiButton
        type="submit"
        variant="primary"
        disabled={isPending || !isDirty}
      >
        Зберегти зміни
      </UiButton>
    </div>
  );
}
