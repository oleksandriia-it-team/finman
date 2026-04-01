'use client';

import { FormProvider } from 'react-hook-form';
import ControlledInput from '@frontend/components/controlled-fields/controlled-input/controled-input-component';
import Button from '@frontend/components/button/button';
import { useSetupLogin } from './shared/login-form';
import { useRouter } from 'next/navigation';
import './shared/styles.scss';

export default function LoginPage() {
  const router = useRouter();
  const { methods, submit } = useSetupLogin(() => {
    router.push('/profile');
  });

  return (
    <div className="login-container">
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="login-form-layout"
        >
          <h1 className="myh">Admin Login</h1>

          <ControlledInput
            name="login"
            placeholder="Email or Username"
          />

          <ControlledInput
            name="password"
            placeholder="Password"
          />

          <Button
            type="submit"
            variant="default"
          >
            Sign In
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
