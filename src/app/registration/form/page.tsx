'use client';

import { RegistrationForm } from '@frontend/features/auth/registration/registration-form';

export default function RegistrationPage() {
  return (
    <div className="w-full h-full px-35 flex items-center justify-center bg-card">
      <RegistrationForm />
    </div>
  );
}
