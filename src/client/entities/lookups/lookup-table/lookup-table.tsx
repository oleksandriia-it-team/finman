import { type DefaultTableColumns } from '@common/models/default-table-columns.model';
import { type PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { type ReactNode } from 'react';
import { UiTable } from '@frontend/shared/ui/ui-table/ui-table';
import { UiTableHeader } from '@frontend/shared/ui/ui-table/ui-table-header';
import { UiTableBody } from '@frontend/shared/ui/ui-table/ui-table-body';
import { UiTableRow } from '@frontend/shared/ui/ui-table/ui-table-row';
import { FinListScreenHandler } from '@frontend/components/list-screen-handler/fin-list-screen-handler';
import { FinPagination } from '@frontend/components/pagination/fin-pagination';
import { LookupPageHeader } from '@frontend/entities/lookups/lookup-page-header/lookup-page-header';
import { LookupTableHead } from './lookup-table-head';
import { type LookupColumnDef } from '@frontend/entities/lookups/lookup-column/lookup-column.model';

interface LookupTableProps<T extends DefaultTableColumns> {
  title: string;
  hasSelection: boolean;
  onAdd: () => void;
  onDelete: () => void;

  columns: LookupColumnDef<T>[];

  state: PromiseState;
  hasData: boolean;
  skeletonItems: number;
  skeleton: () => ReactNode;

  children: ReactNode;

  selectedPage: number;
  setPage: (page: number) => void;
  pageSize: number;
  totalCount: number;

  withSelection?: boolean; // вимикає колонку з чекбоксами
  withAuditColumns?: boolean; // вимикає Status, Created, Updated
  withActions?: boolean; // вимикає три крапки в кінці
}

export function LookupTable<T extends DefaultTableColumns>({
  title,
  hasSelection,
  onAdd,
  onDelete,
  columns,
  state,
  hasData,
  skeletonItems,
  skeleton,
  children,
  selectedPage,
  setPage,
  pageSize,
  totalCount,
}: LookupTableProps<T>) {
  return (
    <div className="flex flex-col h-full">
      <LookupPageHeader
        title={title}
        hasSelection={hasSelection}
        onAdd={onAdd}
        onDelete={onDelete}
      />

      <div className="flex-1 overflow-auto bg-background">
        <UiTable>
          <UiTableHeader>
            <UiTableRow className="border-b border-border/70 hover:bg-transparent">
              <LookupTableHead columns={columns} />
            </UiTableRow>
          </UiTableHeader>

          <UiTableBody>
            <FinListScreenHandler
              state={state}
              hasData={hasData}
              skeletonItems={skeletonItems}
              skeleton={skeleton}
            >
              {children}
            </FinListScreenHandler>
          </UiTableBody>
        </UiTable>
      </div>

      <div className="border-t border-border bg-background px-6 py-3">
        <FinPagination
          selectedPage={selectedPage}
          setPage={setPage}
          pageSize={pageSize}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
}
