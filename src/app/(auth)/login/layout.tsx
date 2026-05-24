import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { LoginStoreProvider } from '@frontend/features/login/hooks/login-store-hook';

export default function LoginLayout({ children }: ChildrenComponentProps) {
  return <LoginStoreProvider>{children}</LoginStoreProvider>;
}
