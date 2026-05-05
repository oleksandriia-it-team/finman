'use client';

import { TrackingOperationScreen } from '@frontend/features/tracking-operation/tracking-operation-screen';
import { useSetCenterButton } from '@frontend/widgets/profile-mobile-navbar/center-button-nav/use-set-center-button';

export default function UserProfilePage() {
  useSetCenterButton('/profile/tracking-operations/add');
  return <TrackingOperationScreen />;
}
