import { Controller, useFormContext } from 'react-hook-form';
import type { FinControlledOtpProps } from '@frontend/components/controlled-fields/props/controlled-otp.props';
import { UiInputOTP, UiInputOTPGroup, UiInputOTPSeparator, UiInputOTPSlot } from '@frontend/ui/ui-otp-input/input-otp';

export const FinControlledOtp = ({ name, label, description }: FinControlledOtpProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <div className="flex flex-col gap-2.5">
      {label && <label className="text-sm font-semibold text-foreground ml-0.5">{label}</label>}

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <UiInputOTP
            maxLength={6}
            value={field.value}
            onChange={field.onChange}
            disabled={field.disabled}
            aria-invalid={!!error}
          >
            <UiInputOTPGroup className="gap-0 justify-center">
              <UiInputOTPSlot
                index={0}
                className="size-12 text-lg"
              />
              <UiInputOTPSlot
                index={1}
                className="size-12 text-lg"
              />
              <UiInputOTPSlot
                index={2}
                className="size-12 text-lg"
              />
              <UiInputOTPSeparator className="mx-1" />
              <UiInputOTPSlot
                index={3}
                className="size-12 text-lg"
              />
              <UiInputOTPSlot
                index={4}
                className="size-12 text-lg"
              />
              <UiInputOTPSlot
                index={5}
                className="size-12 text-lg"
              />
            </UiInputOTPGroup>
          </UiInputOTP>
        )}
      />
      <div className="min-h-[1.25rem] ml-0.5">
        {error ? (
          <span className="text-[11px] text-destructive font-medium">{error.message as string}</span>
        ) : (
          description && (
            <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">{description}</span>
          )
        )}
      </div>
    </div>
  );
};
