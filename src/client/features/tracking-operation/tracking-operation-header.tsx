import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { FiltersSheet } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-sheet';

export function TrackingOperationHeader() {
  return (
    <div className=" w-full h-16 flex justify-between p-3">
      <p className="w-full text-2xl text-left ">
        <b>Операції</b>
      </p>
      <div className="flex gap-4">
        <UiIconButton
          isRoundedFull
          icon="search"
          bgNone={true}
          variant="muted"
          size="xl"
          borderNone={true}
        />
        <FiltersSheet>
          <UiIconButton
            isRoundedFull
            icon="sliders2"
            bgNone={true}
            variant="muted"
            size="xl"
            borderNone={true}
          />
        </FiltersSheet>
      </div>
    </div>
  );
}
