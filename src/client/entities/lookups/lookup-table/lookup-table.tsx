import { type DefaultTableColumns } from '@common/models/default-table-columns.model';
import { type PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { type ReactNode } from 'react';
import { UiTable } from '@frontend/shared/ui/ui-table/ui-table';
import { UiTableHeader } from '@frontend/shared/ui/ui-table/ui-table-header';
import { UiTableBody } from '@frontend/shared/ui/ui-table/ui-table-body';
import { UiTableRow } from '@frontend/shared/ui/ui-table/ui-table-row';
import { FinPagination } from '@frontend/components/pagination/fin-pagination';
import { LookupTableHead } from './lookup-table-head';
import { type LookupColumnDef } from '@frontend/entities/lookups/lookup-column/lookup-column.model';
import { FinTableScreenHandler } from '@frontend/components/screen-handlers/fin-table-screen-handler';
import { FinPageHeader } from '@frontend/components/page-header/fin-page-header';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';

interface LookupTableProps<T extends DefaultTableColumns> {
  title: string;
  hasSelection: boolean;
  onAdd: () => void;
  onDelete: () => void;
  columns: LookupColumnDef<T>[];
  state: PromiseState;
  errorMessage: string | null | undefined;
  hasData: boolean;
  skeletonItems: number;
  children: ReactNode;
  selectedPage: number;
  setPage: (page: number) => void;
  pageSize: number;
  totalCount: number;
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
  children,
  selectedPage,
  setPage,
  errorMessage,
  pageSize,
  totalCount,
}: LookupTableProps<T>) {
  return (
    <div className="flex flex-col h-full">
      <FinPageHeader
        breadcrumbs={[{ label: 'Lookups', href: '/admin/lookups' }, { label: title }]}
        actions={
          <>
            {hasSelection && (
              <UiIconButton
                icon="trash"
                variant="destructive"
                bgNone={false}
                isOutlined={false}
                onClick={onDelete}
                aria-label="Delete selected"
              />
            )}
            <UiIconButton
              icon="plus-lg"
              variant="primary"
              bgNone={false}
              isOutlined={false}
              onClick={onAdd}
              aria-label="Add new"
            />
          </>
        }
      />

      <div className="flex-1 overflow-auto bg-background custom-scrollbar">
        <div className="flex flex-col h-max">
          <UiTable
            className="h-full"
            containerClassName="h-full"
          >
            <UiTableHeader>
              <UiTableRow className="border-b border-border/70 hover:bg-transparent">
                <LookupTableHead columns={columns} />
              </UiTableRow>
            </UiTableHeader>

            <UiTableBody>
              <FinTableScreenHandler
                state={state}
                hasData={hasData}
                errorMessage={errorMessage}
                skeletonItems={skeletonItems}
                skeletonClassName="h-4"
                totalColumns={columns.length + 6}
              >
                {children}
              </FinTableScreenHandler>
            </UiTableBody>
          </UiTable>
        </div>
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
