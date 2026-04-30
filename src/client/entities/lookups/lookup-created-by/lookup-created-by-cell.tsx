import { UiGraphic } from '@frontend/ui/ui-graphic/ui-graphic';
import { type LookupCreatedBy } from './lookup-created-by.model';

export function LookupCreatedByCell({ name, avatar }: LookupCreatedBy) {
  if (!name) {
    return <span className="text-sm text-muted-foreground">—</span>;
  }

  return (
    <div className="flex items-center gap-2">
      {avatar ? (
        <UiGraphic
          src={avatar}
          alt={name}
          size={20}
          className="rounded-full"
        />
      ) : (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground" />
      )}
      <span className="text-sm text-muted-foreground">{name}</span>
    </div>
  );
}
