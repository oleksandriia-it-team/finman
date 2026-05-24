'use client';

import { NotAuthGuard } from '@frontend/entities/auth/not-auth-guard';
import { WelcomeScreen } from '@frontend/features/welcome/welcome-screen';

export default function MainPage() {
  return (
    <NotAuthGuard>
      <WelcomeScreen />
    </NotAuthGuard>
  );
}
