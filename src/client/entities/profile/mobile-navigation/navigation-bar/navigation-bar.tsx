import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import './navigation-bar.scss';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';

export function UserMobileNavigationBar() {
  return (
    <nav className=" fixed bottom-0 left-0 w-full bg-background flex items-center">
      <UiButton
        size="xxl"
        variant="primary"
        title="Головна"
        isOutlined
        bgNone
        className="nav-btn"
        borderNone
      >
        <UiSvgIcon
          size="xxl"
          name="house-door"
        />
        <p className="text-sm">Головна</p>
      </UiButton>

      <UiButton
        size="xxl"
        variant="primary"
        title="Головна"
        isOutlined
        bgNone
        className="nav-btn"
        borderNone
      >
        <UiSvgIcon
          size="xxl"
          name="pie-chart"
        />
        <p className="text-sm">Головна</p>
      </UiButton>

      <UiIconButton
        bgNone={false}
        isOutlined={false}
        className="relative -top-6"
        size="4xl"
        variant="primary"
        icon="plus"
      />

      <UiButton
        size="xxl"
        variant="primary"
        title="Головна"
        isOutlined
        bgNone
        className="nav-btn"
        borderNone
      >
        <UiSvgIcon
          size="xxl"
          name="graph-up-arrow"
        />
        <p className="text-sm">Головна</p>
      </UiButton>

      <UiButton
        size="xxl"
        variant="primary"
        title="Головна"
        isOutlined
        bgNone
        className="nav-btn"
        borderNone
      >
        <UiSvgIcon
          size="xxl"
          name="person"
        />
        <p className="text-sm">Головна</p>
      </UiButton>
    </nav>
  );
}
