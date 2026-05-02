import type { ErrorWidgetProps } from '@frontend/components/error/props/error-widget.props';
import { ErrorIconSvg } from '@frontend/shared/svg/error-icon-svg';

export function FinErrorTableWidget({ status, message }: ErrorWidgetProps) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <ErrorIconSvg />

      <div className="flex flex-col gap-3 text-center">
        <span className="text-foreground text-lg">
          Код помилки: <b className="font-bold">{status}</b>
        </span>
        <span className="text-muted-foreground text-base">{message}</span>
        <span className="text-muted-foreground text-sm">
          Якщо проблема повторюється, зверніться до служби підтримки.
        </span>
      </div>
    </div>
  );
}
