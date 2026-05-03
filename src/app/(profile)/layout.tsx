'use client';

import { type ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import { cn } from '@frontend/shared/utils/cn.util';
import { ProfileMobileNavbar } from '@frontend/widgets/profile-mobile-navbar/profile-mobile-navbar';
import { ProfileSidebar } from '@frontend/widgets/profile-sidebar/profile-sidebar';
import { AuthGuard } from '@frontend/entities/profile/auth-guard';
import { AuthorizedUserProvider } from '@frontend/entities/profile/authorized-user.hook';
import { TrackingOperationsProvider } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-hooks/tracking-operations.hook';

export default function UserLayoutPage({ children }: ChildrenComponentProps) {
  const isMobile = useIsMobile();

  return (
    <AuthGuard>
      <AuthorizedUserProvider>
        <TrackingOperationsProvider>
          <div className={cn('size-full flex', isMobile && 'h-dvh overflow-hidden flex-col')}>
            {!isMobile && <ProfileSidebar />}

            <div className="flex-1 min-h-0">{children}</div>

            {isMobile && <ProfileMobileNavbar />}
          </div>
        </TrackingOperationsProvider>
      </AuthorizedUserProvider>
    </AuthGuard>
  );
}
