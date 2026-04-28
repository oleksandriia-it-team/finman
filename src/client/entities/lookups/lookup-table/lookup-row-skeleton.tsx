import { UiTableCell } from '@frontend/shared/ui/ui-table/ui-table-cell';
import { UiTableRow } from '@frontend/shared/ui/ui-table/ui-table-row';
import { UiSkeleton } from '@frontend/ui/ui-skeleton/ui-skeleton';

interface LookupRowSkeletonProps {
  /** Ширини доменних (унікальних) колонок між ID і Status, напр. ['w-32', 'w-24'] */
  columnWidths: string[];
}

export function LookupRowSkeleton({ columnWidths }: LookupRowSkeletonProps) {
  return (
    <UiTableRow>
      {/* Checkbox */}
      <UiTableCell className="w-10 py-2 pl-4">
        <UiSkeleton className="h-4 w-4" />
      </UiTableCell>

      {/* ID */}
      <UiTableCell className="w-16 py-2">
        <UiSkeleton className="h-4 w-12" />
      </UiTableCell>

      {/* Domain columns */}
      {columnWidths.map((width, index) => (
        <UiTableCell
          key={index}
          className="py-2"
        >
          <UiSkeleton className={`h-4 ${width}`} />
        </UiTableCell>
      ))}

      {/* Status */}
      <UiTableCell className="py-2">
        <UiSkeleton className="h-4 w-16" />
      </UiTableCell>

      {/* Created at */}
      <UiTableCell className="py-2">
        <UiSkeleton className="h-4 w-28" />
      </UiTableCell>

      {/* Created by */}
      <UiTableCell className="py-2">
        <UiSkeleton className="h-8 w-8 rounded-full" />
      </UiTableCell>

      {/* Updated at */}
      <UiTableCell className="py-2">
        <UiSkeleton className="h-4 w-28" />
      </UiTableCell>

      {/* Actions */}
      <UiTableCell className="w-10 py-2">
        <UiSkeleton className="h-8 w-8" />
      </UiTableCell>
    </UiTableRow>
  );
}
