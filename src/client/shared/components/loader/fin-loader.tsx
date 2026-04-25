import AnimatedWalletLogo from '@frontend/shared/svg/animated-loader-svg';
import { UiBouncingDots } from '@frontend/ui/ui-bouncing-dots/ui-bouncing-dots';

export function FinLoader() {
  return (
    <div className="size-full flex flex-col items-center justify-center">
      <div className="flex gap-6 flex-col  max-w-96 px-4 items-center justify-center">
        <AnimatedWalletLogo />

        <div className="flex gap-1">
          <span className="text-foreground text-xl font-bold items-center">Завантаження</span>

          <UiBouncingDots dotClassName="size-2" />
        </div>
      </div>
    </div>
  );
}
