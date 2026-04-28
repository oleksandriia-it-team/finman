import { UiGraphic } from '@frontend/ui/ui-graphic/ui-graphic';
import { type LookupCreatedBy } from './lookup-created-by.model';

interface LookupCreatedByCellProps {
  createdBy: LookupCreatedBy;
}

export function LookupCreatedByCell({ createdBy }: LookupCreatedByCellProps) {
  if (!createdBy.name) {
    return <span className="text-sm text-muted-foreground">—</span>;
  }

  return (
    <div className="flex items-center gap-2">
      {createdBy.avatar ? (
        <UiGraphic
          src={createdBy.avatar}
          alt={createdBy.name}
          size={20}
          className="rounded-full"
        />
      ) : (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
          {createdBy.name.charAt(0).toUpperCase()}
        </span>
      )}
      <span className="text-sm text-muted-foreground">{createdBy.name}</span>
    </div>
  );
}
