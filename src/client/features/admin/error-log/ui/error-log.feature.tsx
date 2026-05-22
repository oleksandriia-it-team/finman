import { type ErrorLogStatus } from '@common/constants/error-log-status.constant';
import { useErrorLogs } from '@frontend/features/admin/error-log/hooks/use-error-log.hook';
import { FinTableScreenHandler } from '@frontend/components/screen-handlers/fin-table-screen-handler';
import { UiTable } from '@frontend/ui/ui-table/ui-table';
import { UiTableRow } from '@frontend/ui/ui-table/ui-table-row';
import { UiTableBody } from '@frontend/ui/ui-table/ui-table-body';
import { UiTableCell } from '@frontend/ui/ui-table/ui-table-cell';
import { FinPagination } from '@frontend/components/pagination/fin-pagination';
import { FinTransformDate } from '@frontend/components/transform-date/fin-transform-date';
import { DateFormatType } from '@frontend/shared/enums/date-type.enum';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { UiTableHeader } from '@frontend/ui/ui-table/ui-table-header';
import { ErrorLogModal } from '@frontend/features/admin/error-log/ui/error-log-modal';
import { ErrorLogsFilters } from '@frontend/features/admin/error-log/filters/error-log-filters';
import { FinDataTableHead } from '@frontend/components/data-table-head/fin-data-table-head';
import { StatusBadge } from '@frontend/features/admin/error-log/ui/status-badge';
import { MethodBadge } from '@frontend/features/admin/error-log/ui/method-badge';
import { ErrorLogTabs } from '@frontend/features/admin/error-log/ui/error-logs-tabs';

export function ErrorLogsFeature() {
  const {
    options,
    state,
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
  const typedStatusesCount = (statusesCount || {}) as Record<ErrorLogStatus | 'total', number>;

  return (
    <div className="flex flex-col gap-6 h-full w-full p-6">
      <ErrorLogTabs
        filters={filters}
        setFilters={setFilters}
        statusesCount={typedStatusesCount}
      />

      <ErrorLogsFilters
        filters={filters}
        onChange={setFilters}
      />

      <div className="flex-1 min-h-0 rounded-md overflow-auto border border-border bg-background custom-scrollbar">
        <UiTable>
          <UiTableHeader className="bg-background border-b-0 sticky top-0 z-10">
            <UiTableRow className="border-b border-border hover:bg-transparent">
              <FinDataTableHead>Ендпоінт / Помилка</FinDataTableHead>
              <FinDataTableHead>Метод</FinDataTableHead>
              <FinDataTableHead>Статус</FinDataTableHead>
              <FinDataTableHead>Створено</FinDataTableHead>
              <FinDataTableHead>Користувач</FinDataTableHead>
              <FinDataTableHead>Оновлено</FinDataTableHead>
              <FinDataTableHead className="w-[3.25rem]" />
            </UiTableRow>
          </UiTableHeader>

          <UiTableBody>
            <FinTableScreenHandler
              state={state}
              hasData={options.length > 0}
              totalColumns={7}
              skeletonItems={20}
            >
              {options.map((log) => (
                <UiTableRow
                  key={log.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <UiTableCell className="max-w-[18.75rem]">
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

                  <UiTableCell className="w-[3.25rem]">
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
