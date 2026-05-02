import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';

interface ProfileSettingsActionsProps {
  isOnline: boolean;
  isPending: boolean;
  onLogout: () => void;
}

export function ProfileSettingsActions({ isOnline, isPending, onLogout }: ProfileSettingsActionsProps) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      {isOnline && (
        <UiButton
          type="button"
          variant="destructive"
          isOutlined
          className="gap-2 !border-destructive-foreground !bg-transparent !text-destructive-foreground  hover:!bg-destructive-foreground/10"
          onClick={onLogout}
        >
          <UiSvgIcon name="box-arrow-right" />
          Вийти
        </UiButton>
      )}

      <UiButton
        type="submit"
        variant="primary"
        disabled={isPending}
      >
        Зберегти зміни
      </UiButton>
    </div>
  );
}
