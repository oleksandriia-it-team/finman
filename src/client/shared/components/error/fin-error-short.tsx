import type { ErrorWidgetProps } from '@frontend/components/error/props/error-widget.props';
import { ErrorIconSvg } from '@frontend/shared/svg/error-icon-svg';

export function FinErrorShort({ message, status }: ErrorWidgetProps) {
  return (
    <div className="size-full flex flex-col items-center justify-center gap-6 px-4 ">
      <ErrorIconSvg />

      <div className="flex flex-col items-center">
        <h3 className="text-foreground text-xl font-bold">Щось пішло не так</h3>
        <span className="text-foreground text-lg">
          Код помилки: <b className="font-bold">{status}</b>
        </span>
        <span className="text-muted-foreground text-sm">{message}</span>
      </div>
    </div>
  );
}
