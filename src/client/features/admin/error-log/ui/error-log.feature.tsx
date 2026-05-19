import { ErrorLogStatus } from '@common/constants/error-log-status.constant';
import { useErrorLogs } from '@frontend/features/admin/error-log/hooks/use-error-log.hook';
import type { FilterTabConfig } from '@frontend/components/filter-tabs/model/filter-tabs.model';
import { UiFilterTabs } from '@frontend/components/filter-tabs/ui-filter-tabs';
import { FinTableScreenHandler } from '@frontend/components/screen-handlers/fin-table-screen-handler';
import { UiTable } from '@frontend/ui/ui-table/ui-table';
import { UiTableRow } from '@frontend/ui/ui-table/ui-table-row';
import { UiTableBody } from '@frontend/ui/ui-table/ui-table-body';
import { UiTableCell } from '@frontend/ui/ui-table/ui-table-cell';
import { FinPagination } from '@frontend/components/pagination/fin-pagination';
import { FinTransformDate } from '@frontend/components/transform-date/fin-transform-date';
import { DateFormatType } from '@frontend/shared/enums/date-type.enum';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiTableHeader } from '@frontend/ui/ui-table/ui-table-header';
import { UiTableHead } from '@frontend/ui/ui-table/ui-table-head';
import { ErrorLogModal } from '@frontend/features/admin/error-log/ui/error-log-modal';
import { ErrorLogsFilters } from '@frontend/features/admin/error-log/filters/error-log-filters';

function MethodBadge({ method }: { method: string | null | undefined }) {
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

function StatusBadge({ status }: { status: ErrorLogStatus }) {
  let dotColor = 'bg-muted-foreground';
  let label: string = status;

  switch (status) {
    case ErrorLogStatus.Active:
      dotColor = 'bg-destructive-foreground';
      label = 'Активна';
      break;
    case ErrorLogStatus.IsResolving:
      dotColor = 'bg-warning';
      label = 'В обробці';
      break;
    case ErrorLogStatus.Resolved:
      dotColor = 'bg-success';
      label = 'Вирішена';
      break;
    case ErrorLogStatus.Ignored:
      dotColor = 'bg-muted-foreground';
      label = 'Ігнорована';
      break;
  }

  return (
    <div className="flex items-center gap-2 text-sm text-foreground font-medium">
      <span className={cn('s-1.5 rounded-full flex-shrink-0', dotColor)} />
      {label}
    </div>
  );
}

export function ErrorLogsFeature() {
  const {
    options,
    state,
    errorMessage,
    selectedPage,
    setPage,
    totalCount,
    filters,
    setFilters,
    setSelectedLog,
    selectedLog,
    updateStatus,
    isUpdating,
    statusesCount,
  } = useErrorLogs();

  const errorLogTabs: FilterTabConfig<ErrorLogStatus | undefined>[] = [
    { value: undefined, label: 'Усі', count: statusesCount['total'] || 0 },
    {
      value: ErrorLogStatus.Active,
      label: 'Активні',
      dotColor: 'bg-destructive-foreground',
      count: statusesCount[ErrorLogStatus.Active] || 0,
    },
    {
      value: ErrorLogStatus.IsResolving,
      label: 'В обробці',
      dotColor: 'bg-warning',
      count: statusesCount[ErrorLogStatus.IsResolving] || 0,
    },
    {
      value: ErrorLogStatus.Resolved,
      label: 'Вирішені',
      dotColor: 'bg-success',
      count: statusesCount[ErrorLogStatus.Resolved] || 0,
    },
    {
      value: ErrorLogStatus.Ignored,
      label: 'Ігноровані',
      dotColor: 'bg-muted-foreground',
      count: statusesCount[ErrorLogStatus.Ignored] || 0,
    },
  ];

  return (
    <div className="flex flex-col gap-6 h-full w-full p-6">
      <UiFilterTabs
        tabs={errorLogTabs}
        activeValue={filters.status}
        onChange={(newValue) => {
          if (newValue === undefined) {
            const restFilters = { ...filters };
            delete restFilters.status;
            setFilters(restFilters);
          } else {
            setFilters({ ...filters, status: newValue });
          }
        }}
        withDot={true}
        withCount={true}
      />

      <ErrorLogsFilters
        filters={filters}
        onChange={setFilters}
      />

      <div className="flex-1 min-h-0 rounded-md overflow-auto border border-border bg-background custom-scrollbar">
        <UiTable>
          <UiTableHeader className="bg-background border-b-0 sticky top-0 z-10">
            <UiTableRow className="border-b border-border hover:bg-transparent">
              <UiTableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide h-9">
                Ендпоінт / Помилка
              </UiTableHead>
              <UiTableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide h-9">
                Метод
              </UiTableHead>
              <UiTableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide h-9">
                Статус
              </UiTableHead>
              <UiTableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide h-9">
                Створено
              </UiTableHead>
              <UiTableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide h-9">
                Користувач
              </UiTableHead>
              <UiTableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide h-9">
                Оновлено
              </UiTableHead>
              <UiTableHead className="w-[52px] text-xs font-medium text-muted-foreground uppercase tracking-wide h-9" />
            </UiTableRow>
          </UiTableHeader>

          <UiTableBody>
            <FinTableScreenHandler
              state={state}
              errorMessage={errorMessage}
              hasData={options.length > 0}
              totalColumns={7}
              skeletonItems={20}
            >
              {options.map((log) => (
                <UiTableRow
                  key={log.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <UiTableCell className="max-w-[300px]">
                    <div
                      className="font-medium text-foreground truncate"
                      title={log.endpoint || 'Невідомо'}
                    >
                      {log.endpoint || 'Невідомо'}
                    </div>
                    <div
                      className="text-muted-foreground text-xs mt-1 truncate font-mono"
                      title={log.message}
                    >
                      {log.message}
                    </div>
                  </UiTableCell>

                  <UiTableCell>
                    <MethodBadge method={log.method} />
                  </UiTableCell>

                  <UiTableCell>
                    <StatusBadge status={log.status} />
                  </UiTableCell>

                  <UiTableCell className="text-primary text-sm font-medium">
                    <FinTransformDate
                      date={log.createdAt}
                      type={DateFormatType.ShortWithYear}
                    />
                  </UiTableCell>

                  <UiTableCell>
                    {log.user ? (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
                          {log.user.name?.[0]?.toUpperCase() || log.user.email?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-foreground">{log.user.name || 'Невідомо'}</span>
                          <span className="text-xs text-muted-foreground">{log.user.email}</span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">—</span>
                    )}
                  </UiTableCell>

                  <UiTableCell className="text-primary text-sm font-medium">
                    <FinTransformDate
                      date={log.updatedAt}
                      type={DateFormatType.ShortWithYear}
                    />
                  </UiTableCell>

                  <UiTableCell className="w-[52px]">
                    <div className="flex items-center justify-center">
                      <UiIconButton
                        icon="eye"
                        size="sm"
                        isOutlined={false}
                        bgNone
                        onClick={() => setSelectedLog(log)}
                        title="Переглянути деталі"
                      />
                    </div>
                  </UiTableCell>
                </UiTableRow>
              ))}
            </FinTableScreenHandler>
          </UiTableBody>
        </UiTable>
      </div>

      <div className="mt-auto shrink-0 flex justify-end pt-2">
        <FinPagination
          selectedPage={selectedPage}
          setPage={setPage}
          pageSize={20}
          totalCount={totalCount}
        />
      </div>

      <ErrorLogModal
        isOpen={!!selectedLog}
        log={selectedLog}
        onClose={() => setSelectedLog(null)}
        onUpdateStatus={(status) => {
          if (selectedLog) {
            updateStatus({ id: selectedLog.id, status });
          }
        }}
        isUpdating={isUpdating}
      />
    </div>
  );
}
