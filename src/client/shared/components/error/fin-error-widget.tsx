import type { ErrorWidgetProps } from '@frontend/components/error/props/error-widget.props';
import { ErrorIconSvg } from '@frontend/shared/svg/error-icon-svg';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function FinErrorWidget({ message, status }: ErrorWidgetProps) {
  const router = useRouter();

  return (
    <div className="size-full flex flex-col items-center justify-center">
      <div className="flex gap-6 flex-col  max-w-96 px-4 items-center justify-center flex-1">
        <ErrorIconSvg />

        <div className="flex flex-col">
          <h3 className="text-foreground text-xl font-bold">Щось пішло не так</h3>
          <span className="text-muted-foreground text-center text-base">{message}</span>
        </div>

        <div className="flex gap-3 bg-primary/10 rounded-xl p-4 text-primary-foreground">
          <UiSvgIcon
            name="info-circle"
            className="rounded-full p-2 bg-primary size-8"
          />
          <div className="flex flex-col gap-3">
            <span className="text-foreground text-lg">
              Код помилки: <b className="font-bold">{status}</b>
            </span>
            <span className="text-muted-foreground text-sm">
              Якщо проблема повторюється, зверніться до служби підтримки.
            </span>
          </div>
        </div>

        <UiButton
          variant="primary"
          size="lg"
          onClick={() => router.push('/')}
        >
          <UiSvgIcon name="house" />
          Повернутися на головну
        </UiButton>
      </div>

      <div className="pb-8 flex gap-1 text-muted-foreground text-sm">
        <span>Потрібна допомога?</span>

        <Link
          href="#"
          className="text-primary"
        >
          Звʼяжіться з нами
        </Link>
      </div>
    </div>
  );
}
