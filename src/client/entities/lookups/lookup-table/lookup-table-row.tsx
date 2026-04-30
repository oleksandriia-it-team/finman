import { type DefaultTableColumns } from '@common/models/default-table-columns.model';
import { UiTableCell } from '@frontend/shared/ui/ui-table/ui-table-cell';
import { UiTableRow } from '@frontend/shared/ui/ui-table/ui-table-row';
import { LookupStatusBadge } from '@frontend/entities/lookups/lookup-status-badge/lookup-status-badge';
import { LookupRowActions } from '@frontend/entities/lookups/lookup-row-actions/lookup-row-actions';
import { LookupCreatedByCell } from '@frontend/entities/lookups/lookup-created-by/lookup-created-by-cell';
import { formatLookupDate } from '@frontend/shared/utils/lookup-date.util';
import { cn } from '@frontend/shared/utils/cn.util';
import { type LookupColumnDef } from '@frontend/entities/lookups/lookup-column/lookup-column.model';
import { useAuthorizedUser } from '@frontend/entities/profile/authorized-user.hook';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { ApiResultOperation, ApiResultOperationError } from '@common/models/api-result-operation.model';
import type { CountryAndLocale } from '@common/records/countries.record';

interface UserNameResponse {
  name: string;
}

interface LookupTableRowProps extends DefaultTableColumns {
  item: CountryAndLocale;
  columns: LookupColumnDef<CountryAndLocale>[];
  ariaLabel: string;
  isSelected: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function LookupTableRow({
  item,
  columns,
  ariaLabel,
  isSelected,
  onToggle,
  onEdit,
  onDelete,
}: LookupTableRowProps) {
  // async function userName(id: number) {
  //   const result = await fetchClient.get<ApiResultOperation<UserNameResponse>>(`/lookups/user/get-by-id/${id}`);
  //   if (result.status === 200) {
  //     return result.data.name;
  //   }
  //   return null;
  // }
  return (
    <UiTableRow className={cn('border-b border-border/60', isSelected && 'bg-primary/10')}>
      <UiTableCell className="w-10 py-2 pl-4">
        <input
          type="checkbox"
          aria-label={ariaLabel}
          checked={isSelected}
          onChange={onToggle}
          className="w-4 h-4 cursor-pointer rounded border-border accent-primary"
        />
      </UiTableCell>

      {columns.map((col, index) => (
        <UiTableCell
          key={index}
          className={col.cellClassName}
        >
          {col.cell(item)}
        </UiTableCell>
      ))}

      <UiTableCell className="py-2">
        <LookupStatusBadge softDeleted={item.softDeleted} />
      </UiTableCell>

      <UiTableCell className="py-2 text-sm text-primary">{formatLookupDate(item.createdAt)}</UiTableCell>

      <UiTableCell className="py-2">{/*<LookupCreatedByCell name={userName(1) ?? null} />*/}</UiTableCell>

      <UiTableCell className="py-2 text-sm text-primary">{formatLookupDate(item.updatedAt)}</UiTableCell>

      <UiTableCell className="w-10 py-2">
        <LookupRowActions
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </UiTableCell>
    </UiTableRow>
  );
}
