import { ErrorLogStatus } from '@common/constants/error-log-status.constant';
import { useErrorLogs } from '@frontend/features/admin/error-log/hooks/use-error-log.hook';
import type { FilterTabConfig } from '@frontend/components/filter-tabs/model/filter-tabs.model';
import { UiFilterTabs } from '@frontend/components/filter-tabs/ui-filter-tabs';
import { FinTableScreenHandler } from '@frontend/components/screen-handlers/fin-table-screen-handler';
import { UiTable } from '@frontend/ui/ui-table/ui-table';
import { UiTableHeader } from '@frontend/ui/ui-table/ui-table-header';
import { UiTableRow } from '@frontend/ui/ui-table/ui-table-row';
import { UiTableHead } from '@frontend/ui/ui-table/ui-table-head';
import { UiTableBody } from '@frontend/ui/ui-table/ui-table-body';
import { UiTableCell } from '@frontend/ui/ui-table/ui-table-cell';
import { FinPagination } from '@frontend/components/pagination/fin-pagination';
import { FinTransformDate } from '@frontend/components/transform-date/fin-transform-date';
import { DateFormatType } from '@frontend/shared/enums/date-type.enum';

function MethodBadge({ method }: { method: string | null | undefined }) {
  const m = method?.toUpperCase() || 'UNKNOWN';
  let colors = 'bg-muted text-muted-foreground';

  if (m === 'GET') colors = 'bg-blue-100 text-blue-600';
  else if (m === 'POST') colors = 'bg-green-100 text-green-600';
  else if (m === 'PUT') colors = 'bg-yellow-100 text-yellow-600';
  else if (m === 'PATCH') colors = 'bg-purple-100 text-purple-600';
  else if (m === 'DELETE') colors = 'bg-red-100 text-red-600';

  return <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide ${colors}`}>{m}</span>;
}

function StatusBadge({ status }: { status: ErrorLogStatus }) {
  let dotColor = 'bg-muted-foreground';
  let label: string = status;

  switch (status) {
    case ErrorLogStatus.Active:
      dotColor = 'bg-destructive';
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
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {label}
    </div>
  );
}

// --- ГОЛОВНИЙ КОМПОНЕНТ ---

export function ErrorLogsFeature() {
  const { options, state, errorMessage, selectedPage, setPage, totalCount, filters, setFilters, setSelectedLog } =
    useErrorLogs();

  // Моки лічильників (поки не підв'язали бекенд)
  const errorLogTabs: FilterTabConfig<ErrorLogStatus | undefined>[] = [
    { value: undefined, label: 'Усі', dotColor: 'bg-muted-foreground', count: 150 },
    { value: ErrorLogStatus.Active, label: 'Активні', dotColor: 'bg-destructive', count: 38 },
    { value: ErrorLogStatus.IsResolving, label: 'В обробці', dotColor: 'bg-warning', count: 7 },
    { value: ErrorLogStatus.Resolved, label: 'Вирішені', dotColor: 'bg-success', count: 142 },
    { value: ErrorLogStatus.Ignored, label: 'Ігноровані', dotColor: 'bg-muted-foreground', count: 23 },
  ];

  return (
    <div className="flex flex-col gap-6 h-full w-full">
      {/* 1. Фільтрація */}
      <UiFilterTabs
        tabs={errorLogTabs}
        activeValue={filters.status}
        onChange={(newValue) => {
          if (newValue === undefined) {
            const { status, ...restFilters } = filters;
            setFilters(restFilters);
          } else {
            setFilters({ ...filters, status: newValue });
          }
        }}
        withDot={true}
        withCount={true}
      />

      {/* 2. Таблиця */}
      <div className="border border-border rounded-md overflow-hidden bg-background">
        <UiTable>
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead>ЕНДПОІНТ / ПОМИЛКА</UiTableHead>
              <UiTableHead>МЕТОД</UiTableHead>
              <UiTableHead>СТАТУС</UiTableHead>
              <UiTableHead>СТВОРЕНО</UiTableHead>
              <UiTableHead>КОРИСТУВАЧ</UiTableHead>
              <UiTableHead>ОНОВЛЕНО</UiTableHead>
              <UiTableHead className="text-right" />
            </UiTableRow>
          </UiTableHeader>

          <UiTableBody>
            <FinTableScreenHandler
              state={state}
              errorMessage={errorMessage}
              hasData={options.length > 0}
              totalColumns={7} // Оновлено на 7 колонок
              skeletonItems={20}
            >
              {options.map((log) => (
                <UiTableRow
                  key={log.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  {/* Ендпоінт */}
                  <UiTableCell className="max-w-[300px]">
                    <div
                      className="font-medium text-foreground truncate"
                      title={log.endpoint || 'Невідомо'}
                    >
                      {log.endpoint || 'Невідомо'}
                    </div>
                    <div
                      className="text-foreground/70 text-xs mt-1 truncate font-mono"
                      title={log.message}
                    >
                      {log.message}
                    </div>
                  </UiTableCell>

                  {/* Метод */}
                  <UiTableCell>
                    <MethodBadge method={log.method} />
                  </UiTableCell>

                  {/* Статус */}
                  <UiTableCell>
                    <StatusBadge status={log.status} />
                  </UiTableCell>

                  {/* Створено (Використовуємо твій компонент) */}
                  <UiTableCell className="text-primary text-sm font-medium">
                    <FinTransformDate
                      date={log.createdAt}
                      type={DateFormatType.ShortWithYear}
                    />
                  </UiTableCell>

                  {/* Користувач */}
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

                  {/* Оновлено (Використовуємо твій компонент) */}
                  <UiTableCell className="text-primary text-sm font-medium">
                    <FinTransformDate
                      date={log.updatedAt}
                      type={DateFormatType.ShortWithYear}
                    />
                  </UiTableCell>

                  {/* Дії */}
                  <UiTableCell className="text-right">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted"
                      title="Переглянути деталі"
                    >
                      1
                    </button>
                  </UiTableCell>
                </UiTableRow>
              ))}
            </FinTableScreenHandler>
          </UiTableBody>
        </UiTable>
      </div>

      {/* 3. Пагінація */}
      <div className="mt-4 flex justify-end">
        <FinPagination
          selectedPage={selectedPage}
          setPage={setPage}
          pageSize={20}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
}
