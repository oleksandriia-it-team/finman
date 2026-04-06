import { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { UserMobileNavigationBar } from '@frontend/entities/profile/mobile-navigation/navigation-bar/navigation-bar';

export default function MainPage({ children }: ChildrenComponentProps) {
  return (
    <div className="w-full h-full">
      <UserMobileNavigationBar />
      <div className="flex flex-1">{children}</div>
    </div>
  );
}
