import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';

interface ProfileSettingsActionsProps {
  isOnline: boolean;
  isPending: boolean;
  isDirty: boolean;
  onLogout: () => void;
}

export function ProfileSettingsActions({ isOnline, isPending, isDirty, onLogout }: ProfileSettingsActionsProps) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      {isOnline && (
        <UiButton
          type="button"
          variant="destructive"
          isOutlined
          className="gap-2"
          onClick={onLogout}
        >
          <UiSvgIcon name="box-arrow-right" />
          Вийти
        </UiButton>
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
