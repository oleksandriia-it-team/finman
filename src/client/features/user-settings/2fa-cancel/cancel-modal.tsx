import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { UiConfirmModal } from '@frontend/components/confirm-modal/fin-confirm-modal';
import { useCancel2FA } from '@frontend/features/user-settings/2fa-cancel/cancel-2fa.hook';

export function TwoFactorCancelModal() {
  const { mutate } = useCancel2FA();

  return (
    <UiConfirmModal
      trigger={
        <UiButton
          isOutlined
          variant="destructive"
        >
          <UiSvgIcon name="arrow-repeat" />
          Скинути
        </UiButton>
      }
      title="Скинути двофакторну автентифікацію"
      description="Ви впевнені, що хочете скинути налаштування двофакторної автентифікації? Вам потрібно буде налаштувати її знову, щоб використовувати."
      confirmLabel="Так, скинути"
      cancelLabel="Ні, залишити"
      onConfirm={mutate}
    />
  );
}
