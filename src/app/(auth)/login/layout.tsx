import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { LoginStoreProvider } from '@frontend/features/login/hooks/login-store-hook';
import { SetupLoginProvider } from '@frontend/features/login/hooks/login-hook';

export default function LoginLayout({ children }: ChildrenComponentProps) {
  return (
    <LoginStoreProvider>
      <SetupLoginProvider>{children}</SetupLoginProvider>
    </LoginStoreProvider>
  );
}
