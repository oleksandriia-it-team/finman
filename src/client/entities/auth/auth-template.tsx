'use client';
import { UiGraphic } from '@frontend/ui/ui-graphic/ui-graphic';
import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import './shared/svg-icon-container.scss';

export const AuthTemplate = ({ children }: ChildrenComponentProps) => {
  return (
    <div className="min-h-screen w-full flex flex-row bg-primary-foreground">
      <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[22rem] flex flex-col gap-6">{children}</div>
      </div>

      <div className="svg-icon-container flex flex-1 items-center justify-center bg-aqua-muted p-12">
        <div className="size-full max-w-lg flex items-center justify-center">
          <UiGraphic
            src="/pictures/login-picture.png"
            width="100%"
            height="37.5rem"
          />
        </div>
      </div>
    </div>
  );
};
