import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';

export function UserMobileNavigationBar() {
  return (
    <div className="w-full bg-background flex items-center justify-center">
      <UiButton
        size="lg"
        variant="primary"
        title="Головна"
        isOutlined
        bgNone
        className="flex items-center justify-center flex-col"
      >
        <UiSvgIcon
          size="xl"
          name="house-door"
        />
        <p className="text-sm">Головна</p>
      </UiButton>{' '}
    </div>
  );
}
