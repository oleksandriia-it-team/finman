import { UiBouncingDots } from '@frontend/ui/ui-bouncing-dots/ui-bouncing-dots';

export function FinLoaderShort() {
  return (
    <div className="size-full flex flex-col items-center justify-center">
      <div className="flex gap-6 flex-col  max-w-96 px-4 items-center justify-center">
        <div className="flex gap-1">
          <span className="text-foreground text-xl font-bold items-center">Завантаження</span>

          <UiBouncingDots dotClassName="size-2" />
        </div>
      </div>
    </div>
  );
}
