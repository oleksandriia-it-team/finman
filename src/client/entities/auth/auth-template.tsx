'use client';
import { UiGraphic } from '@frontend/ui/ui-graphic/ui-graphic';
import '@frontend/shared/styles/auth-image-container.scss';
import type { AuthLayoutProps } from '@frontend/shared/models/auth-loyaut-component.model';

export const AuthLayout = ({ children, imageSrc, rightSideTitle, rightSideDescription }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex flex-row bg-primary-foreground">
      <div className="flex flex-1 items-center justify-center p-6 md:p-9">
        <div className="justify-center size-full max-w-[22rem] flex flex-col gap-6 overflow-auto no-scrollbar p-1">
          {children}
        </div>
      </div>

      <div className="auth-image-container hidden lg:flex flex-1 flex-col items-center justify-center bg-aqua-muted p-12">
        <div className="flex flex-col items-center justify-center w-full max-w-lg h-full max-h-screen">
          <div className="w-full flex-1 min-h-0 flex items-center justify-center mb-10">
            <UiGraphic
              src={imageSrc}
              size="100%"
              className="max-h-full max-w-full object-contain drop-shadow-2xl"
            />
          </div>

          {(rightSideTitle || rightSideDescription) && (
            <div className="flex flex-col gap-4 text-center pb-6">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{rightSideTitle}</h2>
              <p className="text-slate-500 text-base max-w-xs mx-auto leading-relaxed">{rightSideDescription}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
