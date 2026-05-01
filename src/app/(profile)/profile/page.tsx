'use client';

import { useAuthorizedUser } from '@frontend/entities/profile/authorized-user.hook';
import { FiltersSheet } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-sheet';
import { TrackingOperationScreen } from '@frontend/features/tracking-operation/tracking-operation-screen';

export default function UserProfilePage() {
  const user = useAuthorizedUser();

  return <TrackingOperationScreen />;
}
