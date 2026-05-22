import { CheckWithCircleSvg } from '@frontend/shared/svg/check-with-circle-svg';
import { UiTitle } from '@frontend/ui/ui-text/ui-title';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';

export function ShowSuccessTwoFactorSetup() {
  return (
    <div className="flex flex-col gap-4">
      <CheckWithCircleSvg />

      <div className="flex flex-col gap-1 text-center">
        <UiTitle>2FA увімкнено</UiTitle>
        <UiDescription>
          Двофакторна автентифікація активна. Наступного разу під час входу попросимо код з вашого автентифікатора.
        </UiDescription>
      </div>
    </div>
  );
}
