'use client';

import { AnalyticsScreen } from '@frontend/features/analytics/analytics-screen';
import { useHidePlusButton } from '@frontend/widgets/profile-mobile-navbar/use-hide-plus-button';

export default function UserProfilePage() {
  useHidePlusButton();
  return <AnalyticsScreen />;
}
