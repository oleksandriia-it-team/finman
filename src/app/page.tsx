'use client';

import { UiStepper } from '@frontend/ui/ui-stepper/ui-stepper';
import { UiStepperItem } from '@frontend/ui/ui-stepper/ui-stepper-item';
import { UiStepperContent } from '@frontend/ui/ui-stepper/ui-stepper-content';
import { UiStepperPrev } from '@frontend/ui/ui-stepper/ui-stepper-prev';
import { UiStepperNext } from '@frontend/ui/ui-stepper/ui-stepper-next';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';

export default function MainPage() {
  const showToast = useGlobalToast((v) => v.showToast);

  return (
    <UiStepper
      fullSize
      orientation="vertical"
    >
      <UiStepperContent>
        <UiStepperItem key={1}>
          <UiButton
            onClick={() =>
              showToast({ title: 'warning', description: 'warning', variant: 'warning', duration: 300000 })
            }
          >
            show warning toast
          </UiButton>
          <UiButton
            onClick={() =>
              showToast({ title: 'danger', description: 'danger', variant: 'destructive', duration: 3000 })
            }
          >
            show danger toast
          </UiButton>
        </UiStepperItem>
        <UiStepperItem key={2}>
          <div className="bg-blue-100 size-full">2</div>
        </UiStepperItem>
        <UiStepperItem key={3}>
          <div className="bg-green-100 size-full">3</div>
        </UiStepperItem>
        <UiStepperItem key={4}>
          <div className="bg-purple-100 size-full">4</div>
        </UiStepperItem>
      </UiStepperContent>

      <UiStepperPrev size="default" />
      <UiStepperNext size="default" />
    </UiStepper>
  );
}
