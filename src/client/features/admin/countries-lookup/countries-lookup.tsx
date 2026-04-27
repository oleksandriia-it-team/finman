'use client';

import type { CountryAndLocale } from '@common/records/countries.record';
import { LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import { lookupsService } from '@frontend/entities/lookups/lookups.service';
import { usePaginationResource } from '@frontend/shared/hooks/pagination-resource/pagination-resource.hook';
import { FinPagination } from '@frontend/components/pagination/fin-pagination';
import { UiTable } from '@frontend/shared/ui/ui-table/ui-table';
import { UiTableHeader } from '@frontend/shared/ui/ui-table/ui-table-header';
import { UiTableBody } from '@frontend/shared/ui/ui-table/ui-table-body';
import { UiTableRow } from '@frontend/shared/ui/ui-table/ui-table-row';
import { UiTableHead } from '@frontend/shared/ui/ui-table/ui-table-head';
import { UiTableCell } from '@frontend/shared/ui/ui-table/ui-table-cell';
import { cn } from '@frontend/shared/utils/cn.util';
import { LookupStatusBadge } from '@frontend/entities/lookups/lookup-status-badge/lookup-status-badge';
import { LookupPageHeader } from '@frontend/entities/lookups/lookup-page-header/lookup-page-header';
import { LookupRowActions } from '@frontend/entities/lookups/lookup-row-actions/lookup-row-actions';
import { formatLookupDate } from '@frontend/shared/utils/lookup-date.util';
import { useLookupSelection } from '../hooks/use-lookup-selection.hook';
import { UiGraphic } from '@frontend/ui/ui-graphic/ui-graphic';
import { useRouter } from 'next/navigation';
import { FinListScreenHandler } from '@frontend/components/list-screen-handler/fin-list-screen-handler';
import { UiSkeleton } from '@frontend/ui/ui-skeleton/ui-skeleton';

const PAGE_SIZE = 20;

type LookupCreatedByFields = {
  createdByName?: string | null;
  createdByAvatar?: string | null;
  createdBy?: { name?: string | null; avatar?: string | null } | string | null;
  userName?: string | null;
  userAvatar?: string | null;
};

function getCreatedBy(item: CountryAndLocale) {
  const source = item as CountryAndLocale & LookupCreatedByFields;
  const nameFromObject = typeof source.createdBy === 'object' && source.createdBy ? source.createdBy.name : undefined;
  const avatarFromObject =
    typeof source.createdBy === 'object' && source.createdBy ? source.createdBy.avatar : undefined;

  const name = source.createdByName ?? source.userName ?? nameFromObject ?? undefined;
  const avatar = source.createdByAvatar ?? source.userAvatar ?? avatarFromObject ?? undefined;

  return { name, avatar };
}

function CountryRowSkeleton() {
  return (
    <UiTableRow>
      <UiTableCell className="w-10 py-2 pl-4">
        <UiSkeleton className="h-4 w-4" />
      </UiTableCell>
      <UiTableCell className="w-16 py-2">
        <UiSkeleton className="h-4 w-12" />
      </UiTableCell>
      <UiTableCell className="py-2">
        <UiSkeleton className="h-4 w-32" />
      </UiTableCell>
      <UiTableCell className="py-2">
        <UiSkeleton className="h-4 w-24" />
      </UiTableCell>
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

export function CountriesLookup() {
  const router = useRouter();
  const { hasSelection, isSelected, toggleRow, clearSelection } = useLookupSelection();

  const { options, state, selectedPage, setPage, totalCount } = usePaginationResource<CountryAndLocale, object>({
    queryKey: ['admin', 'lookups', 'countries'],
    pageSize: PAGE_SIZE,
    getOptionsFn: (page) =>
      lookupsService.getItems(LookupsTypeEnum.CountriesAndLocales, (page - 1) * PAGE_SIZE + 1, page * PAGE_SIZE, {}),
    getTotalCountFn: () => lookupsService.getTotalCount(LookupsTypeEnum.CountriesAndLocales, {}),
  });

  function handleAdd() {
    console.warn('TODO: add country');
  }

  function handleDelete() {
    console.warn('TODO: delete selected countries');
    clearSelection();
  }

  return (
    <div className="flex flex-col h-full">
      <LookupPageHeader
        title="Countries and locales"
        hasSelection={hasSelection}
        onAdd={handleAdd}
        onDelete={handleDelete}
      />

      <div className="flex-1 overflow-auto bg-background">
        <UiTable>
          <UiTableHeader>
            <UiTableRow className="border-b border-border/70 hover:bg-transparent">
              <UiTableHead className="w-10 pl-4" />
              <UiTableHead className="h-9 w-16 py-1 text-[11px] font-medium uppercase text-muted-foreground">
                ID
              </UiTableHead>
              <UiTableHead className="h-9 py-1 text-[11px] font-medium uppercase text-muted-foreground">
                Country
              </UiTableHead>
              <UiTableHead className="h-9 py-1 text-[11px] font-medium uppercase text-muted-foreground">
                Locale
              </UiTableHead>
              <UiTableHead className="h-9 py-1 text-[11px] font-medium uppercase text-muted-foreground">
                Status
              </UiTableHead>
              <UiTableHead className="h-9 py-1 text-[11px] font-medium uppercase text-muted-foreground">
                Created at
              </UiTableHead>
              <UiTableHead className="h-9 py-1 text-[11px] font-medium uppercase text-muted-foreground">
                Created by
              </UiTableHead>
              <UiTableHead className="h-9 py-1 text-[11px] font-medium uppercase text-muted-foreground">
                Updated at
              </UiTableHead>
              <UiTableHead className="w-10" />
            </UiTableRow>
          </UiTableHeader>

          <UiTableBody>
            <FinListScreenHandler
              state={state}
              hasData={!!options.length}
              skeletonItems={PAGE_SIZE}
              skeleton={CountryRowSkeleton}
            >
              {options.map((item: CountryAndLocale) => {
                const createdBy = getCreatedBy(item);

                return (
                  <UiTableRow
                    key={item.id}
                    className={cn('border-b border-border/60', isSelected(item.id) && 'bg-primary/10')}
                  >
                    <UiTableCell className="w-10 py-2 pl-4">
                      <input
                        type="checkbox"
                        aria-label={`Select ${item.country}`}
                        checked={isSelected(item.id)}
                        onChange={() => toggleRow(item.id)}
                        className="w-4 h-4 cursor-pointer rounded border-border accent-primary"
                      />
                    </UiTableCell>
                    <UiTableCell className="w-16 py-2 text-sm text-muted-foreground">{item.id}</UiTableCell>
                    <UiTableCell className="py-2 text-sm font-medium text-foreground">{item.country}</UiTableCell>
                    <UiTableCell className="py-2 text-sm text-muted-foreground">{item.locale}</UiTableCell>
                    <UiTableCell className="py-2">
                      <LookupStatusBadge softDeleted={item.softDeleted} />
                    </UiTableCell>
                    <UiTableCell className="py-2 text-sm text-primary">{formatLookupDate(item.createdAt)}</UiTableCell>
                    <UiTableCell className="py-2">
                      {createdBy.name ? (
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
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </UiTableCell>
                    <UiTableCell className="py-2 text-sm text-primary">{formatLookupDate(item.updatedAt)}</UiTableCell>
                    <UiTableCell className="w-10 py-2">
                      <LookupRowActions
                        onEdit={() => router.push(`/admin/lookups/countries/edit/${item.id}`)}
                        onDelete={() => console.warn('TODO: delete country', item.id)}
                      />
                    </UiTableCell>
                  </UiTableRow>
                );
              })}
            </FinListScreenHandler>
          </UiTableBody>
        </UiTable>
      </div>

      <div className="border-t border-border bg-background px-6 py-3">
        <FinPagination
          selectedPage={selectedPage}
          setPage={setPage}
          pageSize={PAGE_SIZE}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
}
