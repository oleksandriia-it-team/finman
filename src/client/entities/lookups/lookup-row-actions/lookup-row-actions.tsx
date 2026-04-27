import { UiPopover } from '@frontend/shared/ui/ui-popover/ui-popover';
import { UiPopoverTrigger } from '@frontend/shared/ui/ui-popover/ui-popover-trigger';
import { UiPopoverContent } from '@frontend/shared/ui/ui-popover/ui-popover-content';

interface LookupRowActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export function LookupRowActions({ onEdit, onDelete }: LookupRowActionsProps) {
  return (
    <UiPopover>
      <UiPopoverTrigger
        aria-label="Row actions"
        aria-haspopup="menu"
        className="cursor-pointer px-1 text-lg text-muted-foreground transition-colors hover:text-foreground"
      >
        ···
      </UiPopoverTrigger>

      <UiPopoverContent
        align="end"
        className="w-36 p-1"
      >
        <button
          type="button"
          onClick={onEdit}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
        >
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Редагувати
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
        >
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
          Видалити
        </button>
      </UiPopoverContent>
    </UiPopover>
  );
}
