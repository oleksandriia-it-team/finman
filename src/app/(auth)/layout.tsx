import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { NotAuthGuard } from '@frontend/entities/user-information/not-auth-guard';

export default function AuthLayout({ children }: ChildrenComponentProps) {
  return <NotAuthGuard>{children}</NotAuthGuard>;
}
