import { FinTransformDate } from '@frontend/components/transform-date/fin-transform-date';
import { DateFormatType } from '@frontend/shared/enums/date-type.enum';
import { ErrorLogStatus } from '@common/constants/error-log-status.constant';
import type { ErrorLogModalProps } from '@frontend/features/admin/error-log/props/error-log-modal.props';
import { UiAdminModal } from '@frontend/components/admin-modal/fin-admin-modal';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FinControlledDropdown } from '@frontend/components/controlled-fields/fin-controlled-dropdown';

interface ErrorLogFormValues {
  status: ErrorLogStatus;
}

export function ErrorLogModal({ isOpen, log, onClose, onUpdateStatus, isUpdating }: ErrorLogModalProps) {
  const formId = `update-error-log-form-${log?.id || 'new'}`;
  const methods = useForm<ErrorLogFormValues>({
    defaultValues: {
      status: log?.status || ErrorLogStatus.Active,
    },
  });

  useEffect(() => {
    if (log) {
      methods.reset({ status: log.status });
    }
  }, [log, methods]);

  if (!log) return null;

  const statusOptions = [
    { label: 'Активна', value: ErrorLogStatus.Active },
    { label: 'В обробці', value: ErrorLogStatus.IsResolving },
    { label: 'Вирішена', value: ErrorLogStatus.Resolved },
    { label: 'Ігнорована', value: ErrorLogStatus.Ignored },
  ];

  const onSubmit = (data: ErrorLogFormValues) => {
    if (data.status !== log.status) {
      onUpdateStatus(data.status);
    } else {
      onClose();
    }
  };

  return (
    <UiAdminModal
      isOpen={isOpen}
      onClose={onClose}
      title="Деталі помилки"
      formId={formId}
      isLoading={isUpdating}
      className="!max-w-[56rem] !w-[56rem]"
    >
      <FormProvider {...methods}>
        <form
          id={formId}
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-6 w-full min-w-0"
        >
          <div className="flex flex-col gap-2 bg-muted/30 p-4 rounded-md border border-border">
            <div className="flex items-center gap-3">
              <span className="bg-foreground text-background px-2 py-0.5 rounded text-xs font-bold uppercase">
                {log.method || 'UNKNOWN'}
              </span>
              <span className="font-mono text-sm font-semibold break-all">{log.endpoint || 'Немає ендпоінту'}</span>
            </div>
            <p className="text-destructive-foreground font-bold text-sm mt-1">{log.message}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm w-full">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-xs uppercase tracking-wide">Користувач</span>
              <span className="font-medium">{log.user?.email || log.user?.name || 'Система'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-xs uppercase tracking-wide">Створено</span>
              <span className="font-medium">
                <FinTransformDate
                  date={log.createdAt}
                  type={DateFormatType.LongWithYear}
                />
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 max-w-[250px]">
            <FinControlledDropdown
              name="status"
              id="status-dropdown"
              label="Статус обробки"
              options={statusOptions}
              disabled={isUpdating}
            />
          </div>
          {log.stack && (
            <div className="flex flex-col gap-2 w-full min-w-0">
              <span className="text-muted-foreground text-xs uppercase tracking-wide">Stack Trace</span>
              <div className="bg-zinc-950 rounded-md w-full max-h-[300px] overflow-auto custom-scrollbar border border-border/50">
                <pre className="text-zinc-300 font-mono text-[11px] leading-relaxed p-4 w-max min-w-full">
                  <code>{log.stack}</code>
                </pre>
              </div>
            </div>
          )}
        </form>
      </FormProvider>
    </UiAdminModal>
  );
}
