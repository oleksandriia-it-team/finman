import { cn } from '@frontend/shared/utils/cn.util';

export function MethodBadge({ method }: { method: string | null | undefined }) {
  const m = method?.toUpperCase() || 'UNKNOWN';

  const colorMap: Record<string, string> = {
    GET: 'bg-powder-muted text-powder-muted-foreground',
    POST: 'bg-success-muted text-success-muted-foreground',
    PUT: 'bg-warning-muted text-warning-muted-foreground',
    PATCH: 'bg-purple-muted text-purple-muted-foreground',
    DELETE: 'bg-destructive/10 text-destructive',
  };

  const colorClass = colorMap[m] ?? 'bg-muted text-muted-foreground';

  return <span className={cn('px-2 py-0.5 rounded text-xs font-bold tracking-wide', colorClass)}>{m}</span>;
}
