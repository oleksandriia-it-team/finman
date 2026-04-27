import Link from 'next/link';

interface LookupPageHeaderProps {
  title: string;
  hasSelection: boolean;
  onAdd?: () => void;
  onDelete?: () => void;
}

export function LookupPageHeader({ title, hasSelection, onAdd, onDelete }: LookupPageHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link
              href="/admin/lookups"
              className="transition-colors hover:text-foreground"
            >
              Lookups
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-semibold text-foreground">{title}</li>
        </ol>
      </nav>

      <div className="flex items-center gap-2">
        {hasSelection && (
          <button
            type="button"
            aria-label="Delete selected"
            onClick={onDelete}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-destructive text-primary-foreground transition-colors hover:bg-destructive/90"
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
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
          </button>
        )}
        <button
          type="button"
          aria-label="Add new"
          onClick={onAdd}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line
              x1="12"
              y1="5"
              x2="12"
              y2="19"
            />
            <line
              x1="5"
              y1="12"
              x2="19"
              y2="12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
