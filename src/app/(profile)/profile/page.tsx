'use client';

import { useAuthorizedUser } from '@frontend/entities/profile/authorized-user.hook';
import { TrackingOperationScreen } from '@frontend/features/tracking-operation/tracking-operation-screen';
import { useSetCenterButton } from '@frontend/widgets/profile-mobile-navbar/center-button-nav/use-set-center-button';

export default function UserProfilePage() {
  const user = useAuthorizedUser();
  useSetCenterButton('/profile/tracking-operations/add');
  return <TrackingOperationScreen />;
}
