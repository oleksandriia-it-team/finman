import { UiPopover } from '@frontend/shared/ui/ui-popover/ui-popover';
import { UiPopoverTrigger } from '@frontend/shared/ui/ui-popover/ui-popover-trigger';
import { UiPopoverContent } from '@frontend/shared/ui/ui-popover/ui-popover-content';
import { UiButton } from '@frontend/shared/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/shared/ui/ui-svg-icon/ui-svg-icon';
import { UiConfirmModal } from '@frontend/shared/components/confirm-modal/fin-confirm-modal';

interface LookupRowActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export function LookupRowActions({ onEdit, onDelete }: LookupRowActionsProps) {
  return (
    <UiPopover>
      <UiPopoverTrigger asChild>
        <UiButton
          aria-label="Row actions"
          aria-haspopup="menu"
          variant="default"
          size="sm"
          bgNone
        >
          <UiSvgIcon
            name="three-dots-vertical"
            size="sm"
          />
        </UiButton>
      </UiPopoverTrigger>

      <UiPopoverContent
        align="end"
        className="!w-36 p-1"
      >
        <UiButton
          variant="default"
          size="sm"
          opacity
          className="w-full justify-start gap-2"
          onClick={onEdit}
        >
          <UiSvgIcon
            name="pencil"
            size="sm"
          />
          Редагувати
        </UiButton>

        <UiConfirmModal
          trigger={
            <UiButton
              variant="destructive"
              size="sm"
              opacity
              className="w-full justify-start gap-2"
            >
              <UiSvgIcon
                name="trash"
                size="sm"
              />
              Видалити
            </UiButton>
          }
          onConfirm={onDelete ?? (() => {})}
          title="Видалити запис?"
          description="Цю дію неможливо скасувати."
          confirmLabel="Видалити"
        />
      </UiPopoverContent>
    </UiPopover>
  );
}
