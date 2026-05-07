'use client';

import { TrackingOperationScreen } from '@frontend/features/tracking-operation/tracking-operation-screen';
import { useSetCenterButton } from '@frontend/widgets/profile-mobile-navbar/center-button-nav/use-set-center-button';
import { TrackingOperationFiltersProvider } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-hooks/tracking-operation-filters.hook';
import { GetBasicTrackingInformationProvider } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-hooks/get-tracking-op-information.hook';

export default function UserProfilePage() {
  useSetCenterButton('/profile/tracking-operations/add');
  return (
    <TrackingOperationFiltersProvider>
      <GetBasicTrackingInformationProvider>
        <TrackingOperationScreen />
      </GetBasicTrackingInformationProvider>
    </TrackingOperationFiltersProvider>
  );
}
