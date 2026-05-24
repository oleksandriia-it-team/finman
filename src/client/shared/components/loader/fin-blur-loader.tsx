import { FinLoader } from '@frontend/components/loader/fin-loader';

export function FinBlurLoader() {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
      <FinLoader />
    </div>
  );
}
