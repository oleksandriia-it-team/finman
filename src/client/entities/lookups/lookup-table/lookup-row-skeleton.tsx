import { UiTableCell } from '@frontend/shared/ui/ui-table/ui-table-cell';
import { UiTableRow } from '@frontend/shared/ui/ui-table/ui-table-row';
import { UiSkeleton } from '@frontend/ui/ui-skeleton/ui-skeleton';

interface LookupRowSkeletonProps {
  columnWidths: string[];
}

export function LookupRowSkeleton({ columnWidths }: LookupRowSkeletonProps) {
  return (
    <UiTableRow>
      <UiTableCell className="w-10 py-2 pl-4">
        <UiSkeleton className="h-4 w-4" />
      </UiTableCell>

      <UiTableCell className="w-16 py-2">
        <UiSkeleton className="h-4 w-12" />
      </UiTableCell>

      {columnWidths.map((width, index) => (
        <UiTableCell
          key={index}
          className="py-2"
        >
          <UiSkeleton className={`h-4 ${width}`} />
        </UiTableCell>
      ))}

      <UiTableCell className="py-2">
        <UiSkeleton className="h-4 w-16" />
      </UiTableCell>

      <UiTableCell className="py-2">
        <UiSkeleton className="h-4 w-28" />
      </UiTableCell>

      <UiTableCell className="py-2">
        <UiSkeleton className="h-8 w-8 rounded-full" />
      </UiTableCell>

      <UiTableCell className="py-2">
        <UiSkeleton className="h-4 w-28" />
      </UiTableCell>

      <UiTableCell className="w-10 py-2">
        <UiSkeleton className="h-8 w-8" />
      </UiTableCell>
    </UiTableRow>
  );
}
