import { UiGraphic } from '@frontend/ui/ui-graphic/ui-graphic';
import { type LookupCreatedBy } from '@frontend/entities/lookups/lookup-created-by/lookup-created-by.util';

export function LookupCreatedByCell({ name, avatar }: LookupCreatedBy) {
  if (!name) {
    return <span className="text-sm text-muted-foreground">—</span>;
  }

  return (
    <div className="flex items-center gap-2">
      {avatar ? (
        <UiGraphic
          src={avatar}
          alt=""
          aria-hidden="true"
          size={20}
          className="rounded-full"
        />
      ) : (
        <span
          aria-hidden="true"
          className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground"
        >
          {name.charAt(0).toUpperCase()}
        </span>
      )}
      <span className="text-sm text-muted-foreground">{name}</span>
    </div>
  );
}
