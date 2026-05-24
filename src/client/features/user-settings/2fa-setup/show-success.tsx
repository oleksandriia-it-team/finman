import { CheckWithCircleSvg } from '@frontend/shared/svg/check-with-circle-svg';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';

export function ShowSuccessTwoFactorSetup() {
  return (
    <div className="flex flex-col items-center gap-4">
      <CheckWithCircleSvg />

      <UiDescription className="text-center">
        Двофакторна автентифікація активна. Наступного разу під час входу попросимо код з вашого автентифікатора.
      </UiDescription>
    </div>
  );
}
